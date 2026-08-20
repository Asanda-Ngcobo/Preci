import ContractTypeRotator from "./ContractTypes";
import HighlightText from "./HighligtText";

// ✅ Not async — params is already a plain object after page.js awaits it
export default function Heading({ data, params }) {
  // ✅ No await needed; slug is already a string
  const slug = params?.slug;

  const highlightMap = {
    phone: "Phone Contract",
    housing: "Lease Agreement",
    insurance: "Insurance Policy",
    gym: "Gym Membership Contract",
    car: "Car Finance Agreement",
    "credit-score": "Credit Report",
  };

  const highlight = highlightMap?.[slug];

  const { full_name, name } = data?.user_metadata ?? {};

  const Name = full_name
    ? full_name.trim().split(" ")[0]
    : name
      ? name
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
          .split(" ")[0]
      : "";

  return (
    <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center gap-6 text-center">
      {Name && (
        <h2 className="text-2xl font-semibold text-(--text-secondary)">
          Hi <span className="text-(--accent-primary)">{Name}</span> 👋
        </h2>
      )}

      {!data && (
        <h1 className="text-4xl font-bold leading-tight text-(--text-secondary)">
       
         
           <HighlightText slug={slug} /> <br />
        
        </h1>
      )}

      <p className="max-w-2xl text-lg text-gray-600">
        Upload your{" "}
        {highlight ? (
          <span className="font-medium">{highlight}</span>
        ) : (
          <ContractTypeRotator slug={slug} />
        )}{" "}
        to find out if that can happen to you & how you can prevent it.
      </p>

      <p className="text-sm text-gray-500">
        🔒 Your contract is encrypted during processing and only you can access your summary.
      </p>
    </div>
  );
}
