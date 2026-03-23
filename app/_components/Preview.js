'use client'

import { X } from "@deemlol/next-icons";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Disclaimer from "./Disclaimer";

function Preview({ summary_preview, summaryId, user }) {
  const [priceData, setPriceData]           = useState(null);
  const [loadingPrice, setLoadingPrice]     = useState(true);
  const [paying, setPaying]                 = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const discountClaimed = user?.referral_discount_used === true;

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
        body:    JSON.stringify({ summaryId }),
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

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">

      <button
        className="h-8 w-8 flex justify-center items-center top-3
         left-3 rounded-full text-(--text-secondary) absolute "
        onClick={() => setShowDisclaimer(prev => !prev)}
      >
        <X />
      </button>

      <p className="text-sm text-gray-700 text-center">
        {summary_preview}
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

      {showDisclaimer && (
        <Disclaimer summaryId={summaryId}
        displayPrice={displayPrice}
        loadingPrice={loadingPrice}
        discountActive={discountActive}
        paying={paying}
        payWithPaystack={payWithPaystack}
        discountClaimed={discountClaimed} />
      )}
    </div>
  );
}

export default Preview;