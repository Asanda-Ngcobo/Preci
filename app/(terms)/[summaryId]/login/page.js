import GuestLoginClient from "@/app/_components/_auth_components/GuestLoginClient";

export const metadata = {
  title: "Preci | Login",
};

export default async function Page({ params, searchParams }) {
  const { summaryId } = await params;
  const { token } = await searchParams;

  return (
    <div className="flex md:flex-row gap-6 md:gap-2 max-h-fit mt-15 items-center justify-center">
      <h1>Sign In to access your summaries</h1>

      <GuestLoginClient
        summaryId={summaryId}
        token={token}
      />
    </div>
  );
}
