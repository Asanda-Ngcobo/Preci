'use client'

import { use, useState } from "react"

export default function ReferralPage({ sender, id }) {

  
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)

  async function sendInvite() {

    const res = await fetch("/api/send-referral", {
      method: "POST",
      body: JSON.stringify({
        summaryId,
        email
      })
    })

    const data = await res.json()

    if (data.success) {
      setSuccess(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-100 flex flex-col gap-5">

        <h1 className="text-xl font-semibold text-center">
          Unlock 50% Discount
        </h1>

        {!success ? (
          <>
            <p className="text-sm text-gray-600 text-center">
              Invite a friend to Preci and unlock
              **50% off your summary.**
            </p>

            <input
              type="email"
              placeholder="Friend's email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="border rounded-lg p-2"
            />

            <button
              onClick={sendInvite}
              className="bg-(--accent-primary) text-white p-2 rounded-lg"
            >
              Send Invite
            </button>
          </>
        ) : (
          <>
            <h2 className="text-green-600 text-center font-medium">
              🎉 Discount Activated
            </h2>

            <a
              href={`/users/${summaryId}`}
              className="bg-(--accent-primary) text-white text-center p-2 rounded-lg"
            >
              Return to Payment
            </a>
          </>
        )}

      </div>

    </div>
  )
}