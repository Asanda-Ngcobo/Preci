import ContractTypeRotator from "./ContractTypes";

 export default async function Heading({ data }) {
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

      {!data && <h1 className="text-4xl font-bold leading-tight text-(--text-secondary)">
        Before Your Next Debit Order,
        <br />
        Find Out If Your Contract
        Could Cost You More.
      </h1>}

      <p className="max-w-2xl text-lg text-gray-600">
  Upload your <ContractTypeRotator /> and Preci will explain the important
  clauses in plain English in under a minute.
</p>

      {/* <div className="grid gap-3 text-left text-base font-medium md:grid-cols-2">
        <div>✅ Auto-renewal clauses</div>
        <div>✅ Cancellation notice periods</div>
        <div>✅ Hidden fees</div>
        <div>✅ Early cancellation penalties</div>
        <div>✅ Upgrade eligibility</div>
        <div>✅ Important deadlines</div>
      </div> */}

      <p className="text-sm text-gray-500">
        🔒 Your contract is encrypted during processing and only you can access
        your summary.
      </p>
    </div>
  );
}