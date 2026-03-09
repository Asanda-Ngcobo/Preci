"use client";

export function payWithPaystack() {
  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: "customer@email.com",
    amount: 5000 * 100, // kobo
    currency: "ZAR",
    ref: crypto.randomUUID(),

    callback: function (response) {
      console.log("Payment success:", response.reference);
      // call backend to verify payment
    },

    onClose: function () {
      console.log("Payment closed");
    },
  });

  handler.openIframe();
}