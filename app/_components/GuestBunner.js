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
      ? `${window.location.origin}/summary/${summaryId}?token=${token}`
      : "";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(guestLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 60000);
    } catch (err) {
      console.error(err);
    }
  }

  return (

    <main  className="w-full left-0 top-0 h-screen z-20 absolute bg-white
     flex flex-col justify-center items-center gap-4">

        <div className="w-[90%]
        mx-auto rounded-2xl border border-yellow-200 bg-yellow-50 p-5 mb-6">

      <div className="flex flex-col gap-3">

        <div>
          <h2 className="font-semibold text-yellow-900">
            You're viewing this summary as a guest
          </h2>

          <p className="text-sm text-yellow-800 mt-1">
            Your summary hasn't been saved to an account yet.
            <span className="text-(--accent-secondary)">{" "}Create a free account</span>{" "}
             to keep it permanently and access it
            from any device, anytime.
            {/* & <span className="text-(--accent-secondary)">claim your 50% discount</span>. */}
          </p>
        </div>

        <div className="flex flex-col  gap-3">

          <Link
            href={`/summary/${summaryId}/login?token=${token}&summaryId=${summaryId}`}
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
             <div className="w-full my-3 flex justify-center items-center">OR</div>
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
    
      {copied && <Link href='/'>    <button className=" w-[60%] cursor-pointer
    hover:opacity-85 py-2 text-(--text-secondary) underline"
  >
            Leave
          </button></Link>}
  
    </main>
    
  );
}