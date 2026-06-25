'use client';

import { X } from "@deemlol/next-icons";
import Link from "next/link";
import { use, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ReferralPage({ params }) {
  const { summaryId } = use(params);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const returnUrl = useMemo(() => {
    if (token) {
      return `/${summaryId}?token=${token}`;
    }

    return `/users/${summaryId}`;
  }, [summaryId, token]);

  async function sendInvite() {
    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch("/api/send-referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summaryId,
          email,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Something went wrong");
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        window.location.href = `${returnUrl}?discount=1`;
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Failed to send invite");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <Link href={returnUrl}>
        <button className="absolute top-5 left-5 h-9 w-9 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer">
          <X />
        </button>
      </Link>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">

        <h1 className="text-2xl font-semibold text-center">
          Get 50% Off
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Invite one friend to Preci and unlock
          <span className="font-semibold"> 50% off </span>
          your full summary.
        </p>

        {!success ? (
          <>
            <input
              type="email"
              placeholder="Friend's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl p-3 mt-8"
            />

            <button
              onClick={sendInvite}
              disabled={loading}
              className="w-full mt-5 rounded-xl bg-(--accent-primary) text-white py-3 font-medium disabled:opacity-50"
            >
              {loading ? "Sending Invite..." : "Send Invite"}
            </button>

            <p className="text-xs text-center text-gray-400 mt-4">
              Your discount will be applied automatically after the invite is sent.
            </p>
          </>
        ) : (
          <div className="text-center mt-6">

            <div className="text-5xl mb-3">
              🎉
            </div>

            <h2 className="font-semibold text-green-600">
              Discount Activated
            </h2>

            <p className="text-gray-500 mt-2">
              Taking you back to your summary...
            </p>

          </div>
        )}

      </div>

    </div>
  );
}