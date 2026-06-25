import Preview from "./Preview";
import FullSummary from "./FullSummary";

export default function SummaryPreview({
  summary,
  profile,
  mysummaries,
  user,
  token,
}) {
  const {
    contract_type,
    summary_preview,
    full_summary,
    paid,
    price_zar,
    id,
  } = summary;

  return (
    <main className="flex flex-col">
      <div className="sticky top-4 z-10 mb-8">
        <h1 className="text-lg font-semibold text-center">
          {contract_type} Summary
        </h1>

        <p className="text-center text-xs">
          Powered by{" "}
          <span className="font-bold text-(--accent-primary)">
            Préci AI
          </span>
        </p>
      </div>

      <div className="w-full md:w-[70%] mx-auto p-6 rounded-2xl">

        {paid ? (
          <FullSummary
            full_summary={full_summary}
            contract_type={contract_type}
            profile={profile}
            mysummaries={mysummaries}
            summaryId={id}
            user={user}
            token={token}
          />
        ) : (
          <Preview
            summary_preview={summary_preview}
            summaryId={id}
            user={user}
            profile={profile}
            token={token}
            price_zar={price_zar}
          />
        )}

      </div>
    </main>
  );
}