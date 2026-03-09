import { ChevronLeft } from "@deemlol/next-icons";
import { revalidatePath } from "next/cache";
import Link from "next/link";

function FullSummary({ full_summary, contract_type }) {
  const addEmojiToHeading = (heading) => {
    const lower = heading.toLowerCase();

    if (lower.includes("plain-english")) return "🧾 " + heading;
    if (lower.includes("key costs") || lower.includes("commitments"))
      return "💰 " + heading;
    if (lower.includes("main risks") || lower.includes("risks"))
      return "⚠️ " + heading;
    if (lower.includes("red flags")) return "🚩 " + heading;
    if (lower.includes("insurance")) return "🛡️ " + heading;
    if (lower.includes("employment")) return "💼 " + heading;

    return heading;
  };

  const formattedLines = full_summary
    .replace(/(#+\s*[^\n]+)/g, "\n$1\n")
    .replace(/\s-\s/g, "\n- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .split("\n");

 

  return (
    <>
      <div className="w-full -mt-25 md:hidden">
        <Link href='/users'> <button className="bg-(--accent-primary)
            rounded-full  
            h-8 w-8 flex justify-center items-center
            cursor-pointer absolute"
        >
                <ChevronLeft/>
            </button></Link>

    </div>
      <div
      className="
        rounded-2xl bg-white p-5 w-full mx-auto
        max-h-[85vh] 
        overflow-y-auto
        overscroll-contain
      "
    >
     

      <div className="space-y-2 text-sm text-gray-700">
        <ul className="list-none space-y-2">
          {formattedLines.map((line, index) => {
            const trimmed = line.trim();

            // Headings
            if (/^#{1,3}\s/.test(trimmed)) {
              const headingText = trimmed.replace(/^#{1,3}\s*/, "");

              return (
                <li key={index}>
                  <h3 className="mt-5 text-base font-semibold text-gray-900">
                    {addEmojiToHeading(headingText)}
                  </h3>
                </li>
              );
            }

            // Bullet points
            if (trimmed.startsWith("-")) {
              return (
                <li key={index} className="ml-5 list-disc">
                  {trimmed.replace(/^-/, "").trim()}
                </li>
              );
            }

            // Empty line
            if (!trimmed) return null;

            // Normal text
            return (
              <li key={index}>
                <p className="leading-relaxed">{trimmed}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </>
  
  );
}

export default FullSummary;
