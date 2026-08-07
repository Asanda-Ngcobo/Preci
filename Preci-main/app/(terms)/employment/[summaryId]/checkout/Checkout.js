'use client';

import CheckoutCard from "./CheckoutCard";

export default function Checkout({
  summary,
  profile,
  user,
  token,
}) {

  return (

    <div className="min-h-screen flex justify-center items-center bg-background">

      <CheckoutCard
        summary={summary}
        profile={profile}
        user={user}
        token={token}
      />

    </div>

  );

}