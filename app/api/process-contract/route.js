import { NextResponse } from "next/server";
import { extractText } from "@/app/_lib/pdfExtractor";
import { openai } from "@/app/_lib/openai";
import { createClient } from "@/app/_lib/supabase/server";
import { calculatePrice } from "@/app/_lib/pricing";


export async function POST(req) {
  try {
    const supabase = await createClient();

    // 1. Validate User
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
const file = formData.get("file");
console.log("📄 File received:", file?.name, file?.type, file?.size); // ADD THIS

if (!file) {
  return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
}
//2. Read file into memory
const buffer = Buffer.from(await file.arrayBuffer());
console.log("📦 Buffer size:", buffer.length); // ADD THIS

//3.Extract text
let contractText;

try {
  contractText = await extractText(buffer, file.type);
  console.log("✅ Text extracted successfully"); // ADD THIS
} catch (err) {
  console.log("❌ Extract error:", err.message); // ADD THIS
  return NextResponse.json(
    {
      error: "We couldn't read this document. It may be a scanned or image-based PDF.",
    },
    { status: 400 }
  );
}

//4. Contract Type Detection
  const typeResponse = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content: `
You are a contract classification engine.

Your task is to identify the SINGLE best contract type from the list below.

Return ONLY the contract type name.
Do NOT explain your answer.
Do NOT include extra words, punctuation, or formatting.

Valid contract types:
- Phone Contract
- Car Finance
- Home Loan
- Rental Lease Agreement
- Insurance Policy
- Employment Contract
- Unknown

If the contract does not clearly match one of the above, return "Unknown".
`
    },
    {
      role: "user",
      content: contractText.slice(0, 8000)
    }
  ],
});

  const contractType =
    typeResponse.choices[0].message.content || "Unknown";

    //5. Summary
    const summaryResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content:
          `
Role
You are Preci, an AI assistant that summarizes consumer contracts in plain English.
You explain agreements clearly and simply, avoiding legal jargon.

Your goal is to help ordinary consumers understand what they are signing before committing.


//General Rules

Do not give legal advice

Do not use legal jargon

Use simple, everyday language

Be concise and practical

Highlight money, risk, penalties, and long-term commitments

If something is missing, unclear, or unfair-looking, say so clearly

Assume the reader has no legal knowledge


//South African Context

Contracts may be subject to:

Consumer Protection Act (CPA)

National Credit Act (NCA)

Basic Conditions of Employment Act (BCEA)

You may mention consumer protections in plain language, but:

Do not quote sections

Do not give legal advice

Do not tell the user what they “must” do legally

Example phrasing:

“South African consumer law generally limits unfair penalties.”



//What to Focus on (by Contract Type)

1.Phone Contracts

Focus on:

Contract duration

Total monthly cost

Hidden admin or service fees

Data and airtime allocation

Price increases and when they apply

Early cancellation fees

Upgrade and renewal rules

2.Car Finance Agreements

Focus on:

Interest rate (APR) — clearly state whether it is fixed or variable

Monthly repayment amount

Loan term

Balloon payment (explain what it means for the buyer)

Prepayment or early settlement penalties

Mandatory insurance

Hidden add-ons and extras

Estimated total cost of credit

3. Home Loans

Focus on:

Loan term

Interest rate (APR) — fixed or variable (explain which applies)

Estimated total cost of the loan

Hidden or once-off fees

Bond registration costs

Prepayment or early settlement penalties

Access bond facility

Mandatory insurance

Suspensive conditions

72-hour clause

Occupational rent

Voetstoots clause

Non-variation clause

Default consequences

4. Rental Lease Agreements

Focus on:

Rent amount and due date

Payment method

Late payment penalties

Security deposit

Additional costs (water, electricity, refuse, sanitation, parking — clearly state if included or extra)

Rent increases

Lease term and renewal process

Notice period

Early termination penalties

Landlord vs tenant responsibilities

Repair and maintenance procedures

Pre-existing damages

Occupants and guest rules

Pet policy

Landlord’s right of access

5.Insurance Policies

Focus on:

What is covered (insuring agreement)

What is not covered (exclusions and limits)

Pre-existing conditions

High-risk activities or negligence exclusions

Premium amount and payment frequency

Excess or deductible amounts

Premium increases

Waiting periods

Claim reporting time limits

Consumer responsibilities and duties

6.Employment Contracts (South Africa)

Focus on:

Job title and main duties

Start date and contract type (permanent, fixed-term, probation)

Working hours and overtime rules

Salary or wage and pay frequency

Bonuses or commissions (if any)

Leave (annual, sick, family responsibility)

Notice period

Termination conditions

Probation rules

Deductions from salary

Restraint of trade or non-compete clauses

Confidentiality obligations


//Red Flags Section (Required for Every Summary)

After each summary, include a “Red Flags” section.

Flag things such as:

Unclear or missing costs

High penalties for cancellation or termination

Automatic renewals without clear opt-out

One-sided clauses that heavily favour the company or employer

Unreasonable notice periods

Large balloon payments or hidden fees

Salary deductions not clearly explained

Clauses that remove basic consumer or employee protections

Use language like:

“This may cost more than expected”

“This limits your ability to cancel”

“This gives the company more power than you”

//Output Structure

Plain-English Summary (short bullet points)

Key Costs & Commitments

Your Main Risks

Red Flags 🚩

//Objective

Give South African consumers and workers a clear, fast, and honest understanding of an agreement so they can decide before signing.


          `,
      },

        { role: "user", content: contractText.slice(0, 12000) },
      ],
    });

    const fullSummary = summaryResponse.choices[0].message.content;
//6. Price
    const tokens = summaryResponse.usage?.total_tokens ?? 0;

     const price = calculatePrice(tokens, contractType);
//7. Preview 
       const preview =
    fullSummary.split(" ").slice(0, 50).join(" ") + "...";
//Store Only Summary
    const { data, error: dbError } = await supabase
      .from("summaries")
      .insert({
        
  user_id: user.id,
  contract_type: contractType,
  summary_preview: preview,
  full_summary: fullSummary,
  tokens_used: tokens,
  price_zar: price,
  is_paid: true,


      })
      .select("id")
      .single();

    if (dbError) throw dbError;

   return NextResponse.json({ summaryId: data.id });

  } catch (err) {
    console.error("🔥 process-contract error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
