'use client'

import Link from "next/link"
import { useState } from "react"
import SocialAuth from "./SocialAuth"
import ContractTypeRotator from "../ContractTypes"
import EmailLogin from "./EmailLogin"
import { Video } from "../Video"

function LoginInsurance() {
  const [isEmail, setIsEmail] = useState(false)

  return (
    <main className="mx-auto w-[85%] md:w-[30%]">
      <div className="mb-6 text-center">
        <h1 className="text-xl md:text-3xl font-bold">
          Whether You Have or Is Taking An
        </h1>
         <h2 className="md:text-3xl 
    text-xl font-sans font-bold text-(--accent-primary)">Insurance Policy</h2>
        <h3 className="text-(--text-secondary) md:text-xs text-[12px]">
          Upload the policy and get a clear, precise summary of what you committing or have committed to.
        </h3>
      </div>

      <div className="rounded-3xl border border-gray-300 p-5">
        <p className="mb-4 text-center text-sm text-gray-600">
          Please log in and start uploading
        </p>

        <SocialAuth />

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

export default LoginInsurance