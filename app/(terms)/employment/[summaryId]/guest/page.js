'use client';

import Link from "next/link";
import { useState } from "react";
import { Copy, Check } from "@deemlol/next-icons";

export default function GuestBanner({
  summaryId,
  token,
}) {
  const [copied, setCopied] = useState(false);

  const guestLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/${summaryId}?token=${token}`
      : "";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(guestLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full rounded-2xl border border-yellow-200 bg-yellow-50 p-5 mb-6">

      <div className="flex flex-col gap-3">

        <div>
          <h2 className="font-semibold text-yellow-900">
            You're viewing this summary as a guest
          </h2>

          <p className="text-sm text-yellow-800 mt-1">
            Your summary hasn't been saved to an account yet.
            Create a free account to keep it permanently and access it
            from any device.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">

          <Link
            href={`/${summaryId}/login?token=${token}`}
            className="flex-1"
          >
            <button
              className="
              w-full
              rounded-xl
              bg-(--accent-primary)
              text-white
              py-3
              font-medium
              hover:opacity-90
              cursor-pointer"
            >
              Save to my account
            </button>
          </Link>

          <button
            onClick={copyLink}
            className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            bg-white
            px-5
            py-3
            hover:bg-gray-50
            cursor-pointer"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}

            {copied ? "Copied" : "Copy private link"}
          </button>

        </div>

        <p className="text-xs text-yellow-700">
          This private link is the only way to access this summary until you
          create an account. Keep it somewhere safe.
        </p>

      </div>

    </div>
  );
}