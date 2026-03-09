'use client'

import Link from "next/link"
import { useState } from "react"
import SocialAuth from "./SocialAuth"
import ContractTypeRotator from "../ContractTypes"
import EmailLogin from "./EmailLogin"

function LoginClient() {
  
 const [isEmail, setIsEmail] = useState(false)

  return (
    <main className="mx-auto w-[85%] md:w-[30%]">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-lg md:text-3xl font-bold">
          Whether You Are Taking a
        </h1>
        <ContractTypeRotator />
         <h3 className="text-(--text-secondary)
            md:text-xs text-[10px]">Before you sign & commit, upload your contract document and get a clear,
             calm explanation of
              what you committing to.</h3>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-gray-300 p-5">
        <p className="mb-4 text-center text-sm text-gray-600">
          Please log in and start uploading
        </p>

        <SocialAuth />

        {/* Divider */}
        <div className="my-4 flex items-center justify-center text-sm text-gray-500">
          <span className="px-2">OR</span>
        </div>

        {/* Email login */}
        <form className="space-y-3"
        onClick={()=> setIsEmail(prev => !prev)}>
          <input
            type="email"
            placeholder="Email address"
            className=" rounded-md border
            w-[80%] mx-[10%] border-gray-300 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-(--accent-secondary)"
          />

      

         
        </form>
        <p className="text-center text-xs py-2 text-gray-300">By continuing,
             you acknowledge    Préci’s <Link href='privacy'
             className="underline">
             Privacy Policy.
             </Link> </p>

        {/* Footer */}
       
        {isEmail && <EmailLogin
        setIsEmail={setIsEmail}/>}
      </div>
    </main>
  )
}

export default LoginClient
