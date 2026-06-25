'use client';

import { useCallback, useEffect, useState } from "react";

export default function CheckoutCard({
    summary,
    profile,
    token

}){

const [priceData,setPriceData]=useState(null);

const [loading,setLoading]=useState(true);

const [paying,setPaying]=useState(false);

const summaryId=summary.id;

const [email, setEmail] = useState(profile?.email ?? "");

const fetchPrice=useCallback(async()=>{

try{

const res=await fetch(`/api/referral-status/${summaryId}`);

const data=await res.json();

setPriceData(data);

}

finally{

setLoading(false);

}

},[summaryId]);

useEffect(()=>{

fetchPrice();

},[fetchPrice]);

async function handleCheckout() {

  if (!profile) {

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    const valid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      alert("Please enter a valid email.");
      return;
    }
  }

  setPaying(true);

  try {

    const res = await fetch("/api/payment/initiate", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        summaryId,

        token,

        email,

      }),

    });

    const data = await res.json();

    if (data.authorization_url) {

      window.location.href = data.authorization_url;

      return;

    }

    alert(data.error);

  } catch {

    alert("Something went wrong.");

  } finally {

    setPaying(false);

  }

}

const displayPrice=loading
?"..."
:`R${Number(priceData.price_zar).toFixed(2)}`;

return(

<div className="bg-white rounded-3xl shadow-lg p-8 w-[95%] max-w-lg">

<h1 className="text-3xl font-bold">

Unlock your summary

</h1>

<p className="text-gray-500 mt-3">

You're one step away from seeing the complete AI analysis of your contract.

</p>

<div className="border rounded-2xl mt-8 p-5">

<div className="flex justify-between">

<span>

Contract

</span>

<span className="font-medium">

{summary.contract_type}

</span>

</div>

<div className="flex justify-between mt-3">

<span>

Processing Costs

</span>

<span className="font-semibold">

{displayPrice}

</span>

</div>

</div>

<div className="mt-8 space-y-4">

<div>

🗎 Plain-English summary

</div>

<div>

⚠️ Hidden clauses explained

</div>

<div>

💰 Cancellation fees

</div>


<div>

 🚩 Red flags

</div>

<div>

⚖️ Key obligations

</div>

</div>

{!profile && (
  <div className="mt-8">

    <label className="block text-sm font-medium mb-2">
      Email address
    </label>

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      className="
        w-full
        rounded-xl
        border
        border-gray-300
        px-4
        py-3
        outline-none
        focus:border-(--accent-primary)
      "
    />

    <p className="text-xs text-gray-500 mt-2">
      We'll send your payment receipt to this email.
    </p>

  </div>
)}
<button

onClick={handleCheckout}

disabled={loading||paying}

className="mt-8 w-full bg-(--accent-primary) hover:opacity-90 rounded-xl py-3 text-white font-semibold"

>

{

paying

?

"Redirecting..."

:

`Pay ${displayPrice}`

}

</button>

<p className="text-xs text-center mt-4 text-gray-500">

Secure payments powered by Paystack

</p>

</div>

)

}