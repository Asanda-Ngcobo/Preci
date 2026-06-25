'use client'

import { X } from "@deemlol/next-icons";
import Link from "next/link";
import { use, useState } from "react";

export default function ReferralPage({ params }) {
  const { summaryId } = use(params);

  const [email, setEmail]     = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function sendInvite() {
    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch("/api/send-referral", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ summaryId, email }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = `/users/${summaryId}?discount=1`;
        }, 1500);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send invite");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">

      <Link href={`/users/${summaryId}`}>
        <button className="h-8 w-8 flex justify-center items-center top-3 left-3 rounded-full text-(--text-secondary) absolute cursor-pointer">
          <X />
        </button>
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-100 flex flex-col gap-5">

        <h1 className="text-xl font-semibold text-center">
          Unlock 50% Discount
        </h1>

        {!success ? (
          <>
            <p className="text-sm text-gray-600 text-center">
              Invite a friend to Preci and unlock <b>50% off your summary.</b>
            </p>

            <input
              type="email"
              placeholder="Friend's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg p-2"
            />

            <button
              onClick={sendInvite}
              disabled={loading}
              className="bg-(--accent-primary) text-white p-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Invite"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-green-600 text-center font-medium">
              🎉 Discount Activated!
            </h2>
            <p className="text-center text-sm text-gray-500">
              Redirecting you back...
            </p>
          </>
        )}

      </div>
    </div>
  );
}