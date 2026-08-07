'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "@deemlol/next-icons";
import Link from "next/link";

export default function NoSummaryClient() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl text-center">

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-5xl">
          📄
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          We couldn't read your document
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Don't worry—this happens with some PDFs.
        </p>

        <p className="mt-2 text-gray-600">
          Your document appears to be a scanned PDF or contains images instead
          of selectable text, which prevents Preci from generating a summary.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left">
          <h2 className="text-lg font-semibold text-gray-900">
            You can try one of these:
          </h2>

          <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-600">
            <li>Upload the original digital PDF instead of a scanned copy.</li>
            <li>Export the document directly from Microsoft Word or Google Docs.</li>
            <li>Use a higher-quality version of the PDF.</li>
            <li>Check that you can highlight or copy text inside the PDF.</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <Upload size={18} />
            Upload another document
          </Link>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Go back
          </button>

        </div>

      </div>
    </main>
  );
}