import ContractTypeRotator from "./ContractTypes";
import HighlightText from "./HighligtText";

export default async function Heading({ data, params }) {
  const slug = await params?.slug;

  const highlightMap = {
    phone: "MTN or Vodacom Contract",
    housing: "Rental Agreement",
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
          Before Your Next Debit Order,
<br />
Find Out If Your{" "}
<HighlightText slug={params?.slug} />{" "}
Could Cost You More.
        </h1>
      )}

      <p className="max-w-2xl text-lg text-gray-600">
        Upload your{" "}
        {highlight ? (
          <span className="font-medium">{highlight}</span>
        ) : (
        <ContractTypeRotator slug={params?.slug} />
        )}{" "}
        and Preci will explain the important clauses in plain English in under a minute.
      </p>

      <p className="text-sm text-gray-500">
        🔒 Your contract is encrypted during processing and only you can access your summary.
      </p>
    </div>
  );
}