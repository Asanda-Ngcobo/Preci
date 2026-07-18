'use client'

import Link from "next/link";
import { ArrowLeft, Upload } from "@deemlol/next-icons";

export default function NoSummaryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-lg text-center">

        <div className="text-6xl mb-4">📄</div>

        <h1 className="text-3xl font-bold text-gray-900">
          We couldn't read your document
        </h1>

        <p className="mt-4 text-gray-600">
          This usually happens when the PDF is a scanned document or contains
          only images instead of selectable text.
        </p>

        <div className="mt-8 rounded-xl border bg-gray-50 p-5 text-left">
          <h2 className="font-semibold mb-2">
            Try one of these:
          </h2>

          <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
            <li>Download the original PDF instead of a scanned copy.</li>
            <li>Export the document as PDF from Word or Google Docs.</li>
            <li>Use a clearer, higher-quality copy.</li>
            <li>Ensure the document contains selectable text.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

          {/* <Link
            href="/"
            className="px-5 py-3 rounded-xl bg-(--accent-primary) text-white font-semibold flex items-center justify-center gap-2"
          >
            <Upload />
            Upload another contract
          </Link> */}

          <button
            onClick={() => window.history.back()}
            className="px-5 py-3 rounded-xl border flex items-center justify-center gap-2"
          >
            <ArrowLeft />
            Go back
          </button>

        </div>

      </div>
    </div>
  );
}