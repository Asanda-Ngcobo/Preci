"use client";

import { useRouter } from "next/navigation";


export function PayButton({ summaryId, email, price }) {
const router = useRouter()
  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: price * 100,
      currency: "ZAR",
      ref: crypto.randomUUID(),

      callback: async function (response) {
        // 1️⃣ Paystack success
        const reference = response.reference;

        // 2️⃣ Call backend verification
        await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference,
            summaryId,
          }),
        });

        // 3️⃣ Optional UX
        router.refresh();
        // toast.success("Payment successful!");
      },

      onClose: function () {
        console.log("Payment popup closed");
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={payWithPaystack}
      className="mt-4 w-[60%] mx-[20%]
      cursor-pointer rounded-xl bg-(--accent-primary)
      hover:opacity-85 py-2 text-white"
    >
      Unlock Now
    </button>
  );
}
