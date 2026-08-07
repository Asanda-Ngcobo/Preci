import NoSummaryClient from "@/app/_components/NoSummaryClient";


export const metadata = {
  metadataBase: new URL("https://preci.co.za"),
  title: "Preci | We couldn't read your document",
  description:
    "Your document couldn't be summarized because it appears to be scanned or contains no selectable text.",
};

export default function Page() {
  return <NoSummaryClient />;
}