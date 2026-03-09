'use client'

import { PayButton } from "./PaymentButton";

function Preview({summary_preview, price_zar,
  summaryId,
  email
}) {

  //Paystack payment function

  function payWithPaystack() {
  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email,
    amount: price_zar * 100, // kobo
    currency: "ZAR",
    reference: new Date().getTime().toString(),

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
    return (
        <div className="w-full h-full">

             <p className="text-sm text-gray-700">{summary_preview}</p>
              <div className="mt-4 flex justify-between">
        <span className="text-gray-500">Full explanation</span>
        <span className="font-medium">R{price_zar}</span>
      </div>
<button className="mt-4 w-[60%] mx-[20%]
      cursor-pointer rounded-xl bg-(--accent-primary)
      hover:opacity-85 py-2 text-white"
      onClick={payWithPaystack}>
        Unlock
      </button>  

            {/* <PayButton
      summaryId={summaryId}
      email={email}
      price={price_zar}/> */}

      
        </div>
    )
}

export default Preview
