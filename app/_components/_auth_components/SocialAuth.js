'use client'

import { createClient } from "@/app/_lib/supabase/client"
import Image from "next/image"
import { useState } from "react"
import GoogleIcon from '@/public/icons8-google-48.png'

function SocialAuth() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

 const handleSocialLogin = async (e) => {
 
 const supabase = createClient()
setIsLoading(true)
 setError(null)
 try {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
       redirectTo: `${window.location.origin}/auth/oauth?next=/users`,
     },
  })

 if (error) throw error
 } catch (error) {
setError(error instanceof Error ? error.message : 'An error occurred')
 setIsLoading(false)
  }
}

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSocialLogin()
      }}
    >
      <div className="flex flex-col gap-6">
        {error && <p className="text-sm text-destructive-500">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-[80%] mx-[10%] border border-gray-400 hover:bg-gray-200 cursor-pointer flex justify-center items-center rounded-sm py-3 my-2"
        >
          {isLoading ? (
            'Logging in...'
          ) : (
            <p className="flex gap-2">
              <span>
                <Image src={GoogleIcon} alt="google icon" width={20} />
              </span>
              Continue with Google
            </p>
          )}
        </button>
      </div>
    </form>
  )
}

export default SocialAuth
