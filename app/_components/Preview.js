'use client'

import { X } from "@deemlol/next-icons";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Disclaimer from "./Disclaimer";
import { useRouter } from "next/navigation";
import GuestBanner from "./GuestBunner";

function Preview({ summary_preview, summaryId, user, price_zar, token, profile, paid }) {
  const [priceData, setPriceData]           = useState(null);
  const [loadingPrice, setLoadingPrice]     = useState(true);
  const [paying, setPaying]                 = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showGuest, setShowguest] = useState(false);
      const router = useRouter();

  const discountClaimed = profile?.referral_discount_used === true;
  const notViewed = !paid;


  const fetchPrice = useCallback(async () => {
    try {
      const res  = await fetch(`/api/referral-status/${summaryId}`);
      const data = await res.json();
      setPriceData(data);
    } catch (err) {
      console.error("Failed to fetch price:", err);
    } finally {
      setLoadingPrice(false);
    }
  }, [summaryId]);

  useEffect(() => {
    fetchPrice();

    // ?discount=1 is only a UX hint to re-fetch — the backend is the source
    // of truth, so a manually typed URL param won't show a wrong price.
    if (window.location.search.includes("discount=1")) {
      fetchPrice();
    }
  }, [fetchPrice]);

  async function payWithPaystack() {
    setPaying(true);
    try {
      const res  = await fetch("/api/payment/initiate", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ summaryId, token, email }),
      });
      const data = await res.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert(data.error || "Could not initiate payment");
      }
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setPaying(false);
    }
  }


  const discountActive = priceData?.discount ?? false;
  const displayPrice   = loadingPrice || priceData?.price_zar == null
    ? "..."
    : `R${Number(priceData.price_zar).toFixed(2)}`;



function handleUnlock() {


      if(!user){
router.push(`/summary/${summaryId}/checkout?token=${token}`);
      }
        else{
          router.push(`/${summaryId}/checkout`)
        }

  

}
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 left-0">

      {profile && <button
        className="h-8 w-8 flex justify-center items-center top-3
         left-3 rounded-full text-(--text-secondary) absolute "
        onClick={() => setShowDisclaimer(prev => !prev)}
      >
        <X />
      </button>}

      <p className="text-sm text-gray-700 text-center">
        {summary_preview}
      </p>

      {/*  <div className="mt-4 flex justify-between w-[60%]">
        <span className="text-gray-500">Full Summary</span>
 <span className="font-medium">
          {displayPrice}
          {discountActive && (
            <span className="ml-2 text-xs text-green-600 font-normal">67% off</span>
          )}
        </span> 
      </div>*/}

      <button
        className="mt-4 w-[60%] cursor-pointer rounded-xl bg-(--accent-primary)
         hover:opacity-85 py-2 text-white disabled:opacity-50 active:bg-(--accent-secondary)" 
        onClick={handleUnlock}
        disabled={loadingPrice || paying}
      >
        {paying ? "Redirecting..." : "Unlock Full Summary"}
      </button>

      {!loadingPrice && !discountActive && !discountClaimed && profile && (
        <Link href={`/users/${summaryId}/referral`} className="w-[60%]">
          <button className="w-full cursor-pointer rounded-xl bg-white hover:opacity-85 py-2 text-black border-2">
            Claim Your 67% Off
          </button>
        </Link>
      )}

      {!profile &&  <button className=" w-[60%] cursor-pointer
    hover:opacity-85 py-2 text-(--text-secondary) underline"
     onClick={() => setShowguest(prev => !prev)}>
            Not Now
          </button>}
 
      {showDisclaimer && (
        <Disclaimer summaryId={summaryId}
        displayPrice={displayPrice}
        loadingPrice={loadingPrice}
        discountActive={discountActive}
        paying={paying}
        payWithPaystack={payWithPaystack}
        discountClaimed={discountClaimed}
        user={user} />
      )}

          {showGuest && (
        <GuestBanner summaryId={summaryId}
        displayPrice={displayPrice}
        loadingPrice={loadingPrice}
        discountActive={discountActive}
        price={price_zar}
        unpaid={notViewed}
        paying={paying}
        payWithPaystack={payWithPaystack}
        discountClaimed={discountClaimed}
        user={user}
        token={token} />
      )}
    </div>
  );
}

export default Preview;
