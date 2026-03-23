'use client'

import { X } from "@deemlol/next-icons";
import Link from "next/link";


function Disclaimer({ loadingPrice, summaryId,
  payWithPaystack, displayPrice, discountActive, discountClaimed, paying }) {

  


  return (
    <div className="w-screen top-0 h-screen z-20 absolute bg-white
     flex flex-col justify-center items-center gap-4">
      <div>
        <Link href={`/users`}>
      <button className="h-8 w-8 flex justify-center items-center
       top-3 left-3 rounded-full 
       text-(--text-secondary) absolute"><X/></button></Link>

        </div>
 <p className="text-md text-gray-700 text-center max-w-md">
Every year, South Africans lose thousands of rands by signing agreements without fully understanding their obligations or spotting hidden red flags in the terms.
</p>

<p className="text-md text-gray-700 text-center max-w-md">
Unlock the full summary for <span className="font-semibold">{displayPrice}</span> to clearly see your obligations, key risks, and important red flags before you sign.
</p>


      

     <div className="mt-4 flex justify-between w-[60%]">
        <span className="text-gray-500">Full Summary</span>
        <span className="font-medium">
          {displayPrice}
          {discountActive && (
            <span className="ml-2 text-xs text-green-600 font-normal">50% off</span>
          )}
        </span>
      </div>

      <button
        className="mt-4 w-[60%] cursor-pointer rounded-xl bg-(--accent-primary) hover:opacity-85 py-2 text-white disabled:opacity-50"
        onClick={payWithPaystack}
        disabled={loadingPrice || paying}
      >
        {paying ? "Redirecting..." : "Unlock Full Summary"}
      </button>

      {!loadingPrice && !discountActive && !discountClaimed && (
        <Link href={`/users/${summaryId}/referral`} className="w-[60%]">
          <button className="w-full cursor-pointer rounded-xl bg-white hover:opacity-85 py-2 text-black border-2">
            Claim 50% Off
          </button>
        </Link>
      )}

    </div>
  );
}

export default Disclaimer;