'use client'

import Link from "next/link"
import { useState } from "react"
import SocialAuth from "./SocialAuth"
import ContractTypeRotator from "../ContractTypes"
import EmailLogin from "./EmailLogin"
import { Video } from "../Video"
import GuestSocialAuth from "./GuestSocialAuth"

function GuestLoginClient({summaryId, token}) {
  const [isEmail, setIsEmail] = useState(false)

  console.log({
  summaryId,
  token,
});
  return (
    <main className="mx-auto w-screen  h-screen flex justify-center
     items-center z-10 top-0 fixed bg-white">
      
    
      <div className="rounded-2xl  p-5 w-[85%] md:w-[30%]">
        {/* <p className="mb-4 text-center text-sm text-gray-600">
          Please log in and start uploading
        </p> */}

        <GuestSocialAuth  summaryId={summaryId}
        token={token}/>

        <div className="my-4 flex items-center justify-center text-sm text-gray-500">
          <span className="px-2">OR</span>
        </div>

        <form className="space-y-3" onClick={() => setIsEmail(prev => !prev)}>
          <input
            type="email"
            placeholder="Email address"
            className="rounded-md border w-[80%] mx-[10%] border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-(--accent-secondary)"
          />
        </form>

        <p className="text-center text-xs py-2 text-gray-300">
          By continuing, you acknowledge Préci's{" "}
          <Link href='/privacy' className="underline">Privacy Policy.</Link>{" "}
          and{" "}
          <Link href='/terms' className="underline">Terms Of Use.</Link>
        </p>

        {isEmail && <EmailLogin setIsEmail={setIsEmail} />}
      </div>
    </main>
  )
}

export default GuestLoginClient