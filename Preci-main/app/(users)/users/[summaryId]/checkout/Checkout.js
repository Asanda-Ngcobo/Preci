'use client';

import CheckoutCard from "./CheckoutCard";

export default function Checkout({
    summary,
    profile,
    token
}){

    return(

        <div className="min-h-screen flex justify-center items-center bg-background">

            <CheckoutCard
                summary={summary}
                profile={profile}
                token={token}
            />

        </div>

    )

}