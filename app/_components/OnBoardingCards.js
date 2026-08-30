"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IPhone from '@/public/Phone (2).png'
import Gym from '@/public/gym (3).png'
import Apartment from '@/public/housing.png'
import Router from '@/public/Route.png'
import Insurance from '@/public/insurance.jpg'
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@deemlol/next-icons";
import ReviewsClient from "./ReviewsClient";
import { useMenu } from "../providers/MenuProvider";
import UploadOptions from "./UploadOptions";
import MeetPreci from "./_auth_components/MeetPreci";



const onboardingCards = [
  {
    title: "Gym Membership Contract",
    emoji: "🏋🏻‍♀️",
    description: "Your summer body gym membership can cost you more than what you signed up for.",
    subheading: `Upload your contract to find out if that can happen to you & how you can prevent it.`,
     image: Gym,
     buttontext: 'Upload Contract'
  },
  {
    title: "Phone Contract",
    emoji: "📱",
    description: "Your 24/36 months IPhone contract may be longer than that.",
    subheading: `Upload your contract to find out if that can happen to you & how you can prevent it.`,
    image: IPhone,
    buttontext: 'Upload Contract'
  },
  {
    title: "WiFi",
    emoji: "🛜",
    description: "You might be charged R550 instead of R350/month you agreed on",
    subheading: `Upload your contract to find out if that can happen to you & how you can prevent it.`,
    image: Router,
    buttontext: 'Upload Contract'
  },
  {
    title: "Lease Agreement",
    emoji: "🧴",
    description: "You may be denied your deposit when you leave.",
     subheading: `Upload your lease to find out if that can happen to you & how you can prevent it.`,
    
    image: Apartment,
    buttontext: 'Upload Lease'
  },
  {
    title: "Insurance",
    emoji: "📜",
    description: "You might be denied your claim right when you need it",
     subheading: `Upload your policy to find out if that can happen to you & how you can prevent it.`,
        image: Insurance,
        buttontext: 'Upload Policy'
  },

];

export default function OnboardingCards({ reviews, data }) {

const user = data;
 const [loadingCard, setLoadingCard] = useState(null);
const [isLoading, setIsLoading] = useState(false);


  const { full_name, name } = user?.user_metadata ?? {};

  const Name = full_name
    ? full_name.trim().split(" ")[0]
    : name
      ? name
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
          .split(" ")[0]
      : "";

 const {file} = useMenu();
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState("idle");

    function handleUpload (){
  setOpen(prev => !prev)
    }
    const router = useRouter();


async function handleProcess() {
  if (!file) return;


  setStatus("reading");

  const formData = new FormData();
  formData.append("file", file);

  try {
    // Slight delay so UI feels responsive
    await new Promise(res => setTimeout(res, 600));

    setStatus("summarizing");

    const res = await fetch("/api/process-contract", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

   if (!res.ok) {
  router.push(
    `/summary/no-summary?message=${encodeURIComponent(data.error)}`
  );
  return;
}

    setStatus("saving");

    // Small delay before redirect (feels intentional)
    setTimeout(() => {
    if(user){

router.push(`/users/${data.summaryId}`)

}else{

router.push(
`/summary/${data.summaryId}?token=${data.guestToken}`
)

}


    }, 700);

  } catch (err) {
  console.error(err);

  router.push(
    "/summary/no-summary?message=Something%20went%20wrong"
  );
}
}

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#F8F8F8] px-4 py-10">
            {open && <UploadOptions remove={handleUpload}
            handleProcess={handleProcess}/>
                handleUpload={handleUpload}/>}
      <div className="md:w-[70%] mx-auto mb-10 ">

        {/* Greeting */}
        <div className="w-full h-20 flex items-center font-bold">
          <h1 className="text-2xl">
            Hello, {data &&<span className="text-(--accent-primary)">{Name}</span>}
          </h1>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-light text-black">
            Which contract are we analyzing today?
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Choose from the options below.
          </p>
        </div>
{/* Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 w-full gap-5">
  {onboardingCards.map((card) => {
    const isLoading = loadingCard === card.title;

    return (
      <button
        key={card.title}
        onClick={handleUpload}
        disabled={!!loadingCard || isLoading}
        className={`
          group relative overflow-hidden
          min-h-80
          rounded-3xl
          text-left
          border
          transition-all duration-300
          active:scale-[0.98]
          shadow-2xl
          hover:shadow-xl
          hover:border-black
          border-(--accent-secondary)
          cursor-pointer
          bg-(--accent-primary)

          ${
            loadingCard || isLoading
              ? "opacity-60 cursor-not-allowed"
              : ""
          }
        `}
      >

        {/* Image */}
        {card.image && (
          <Image
            src={card.image}
            alt={card.title}
            fill
           
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Stronger image overlay */}
        <div className="
          absolute inset-0
          bg-linear-to-t
          from-black
          via-black/60
          to-black/10
        " />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5">

          {/* Content background */}
          <div className="
            rounded-2xl
           
            p-4
          ">

            {/* Title */}
            <h2 className="
              font-extrabold
              text-2xl
              text-white
              leading-tight
              tracking-tight
            ">
              {card.title}
            </h2>

            {/* Description */}
            <p className="
              text-white
              mt-2
              text-sm
              font-medium
              leading-relaxed
            ">
              {card.description}
            </p>

            {/* Subheading */}
            {card.subheading && (
              <p className="
                inline-block
                text-(--accent-secondary)
                bg-(--accent-secondary)/10
                border border-(--accent-secondary)/20
                rounded-lg
                px-2.5
                py-1
                mt-3
                text-xs
                font-semibold
                leading-relaxed
              ">
                {card.subheading}
              </p>
            )}

            {/* Upload */}
            <div className="mt-4">
              <span className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-4
                py-2.5
                text-md
                font-bold
                text-black
                transition-all
                group-hover:bg-(--accent-secondary)
              ">
              
                {card.buttontext}<span><ChevronRight/></span>
                  
              </span>
            </div>

          </div>
        </div>

      </button>
    );
  })}
</div>
      </div>

     {!data && <ReviewsClient data={reviews}/>}
      {!data && <MeetPreci/>}

      {status !== "idle" && (
  <div className=" rounded-2xl w-full
  h-screen fixed top-0 bottom-0 left-0
   flex flex-col justify-center
   items-center  z-40
   bg-white p-4 text-sm text-gray-700">
    <p className={status === "reading" ? "font-medium" : ""}>
      {status !== "idle" && "1. Document uploaded"}
    </p>
    <p
  className={`
    flex items-center gap-2
    transition-colors duration-200
    ${
      status === "summarizing"
        ? "font-semibold text-(--accent-secondary)"
        : "text-gray-500"
    }
  `}
>
  <span>2. Understanding the contract</span>

  {status === "summarizing" && (
    <span
      className="
        inline-block
        w-4 h-4
        rounded-full
        border-2
        border-gray-300
        border-t-(--accent-secondary)
        animate-spin
      "
    />
  )}
</p>
<p
  className={`
    flex items-center gap-2
    transition-colors duration-200
    ${
      status === "saving"
        ? "font-semibold text-(--accent-secondary)"
        : "text-gray-500"
    }
  `}
>
  <span>3.       Preparing your summary</span>

  {status === "saving" && (
    <span
      className="
        inline-block
        w-4 h-4
        rounded-full
        border-2
        border-gray-300
        border-t-(--accent-secondary)
        animate-spin
      "
    />
  )}
</p>
    
  </div>
)}
    </main>
  );
}
