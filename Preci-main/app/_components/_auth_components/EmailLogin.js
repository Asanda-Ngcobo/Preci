'use client'

import Link from "next/link"
import SignInButton from "./SignInButton"
import { useState, useTransition } from "react"
import { ChevronLeft } from "@deemlol/next-icons"
import SignUpClient from "../SignUpClient"
import { loginUser } from "@/app/_lib/actions"
import toast from "react-hot-toast"
import SignUpSucess from "./SignUpSucess"
import { useRouter } from "next/navigation"

function EmailLogin({ setIsEmail }) {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [signup, setSignUp] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [signupSuccess, SetSignupSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = (formData) => {
    startTransition(async () => {
      try {
        await loginUser(formData)

        toast.success('Signin successful! Redirecting...', {
          duration: 4000,
          style: {
            background: '#2F8F83',
            color: '#fff',
          },
        })

        setTimeout(() => {
          router.push('/users')
        }, 500)

      } catch (error) {
        toast.error('Something went wrong', {
          duration: 4000,
          style: {
            background: '#2F8F83',
            color: '#fff',
          },
        })
      }
    })
  }

  function showSignUp() {
    setSignUp(prev => !prev)
  }

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md flex items-center justify-center">

        {/* CARD */}
        <div className="relative w-[92%] max-w-md rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-6">

          {/* Back button */}
          <button
            className="absolute top-4 left-4 bg-(--accent-primary)
            rounded-full h-9 w-9 flex justify-center items-center cursor-pointer"
            onClick={() => setIsEmail(false)}
          >
            <ChevronLeft />
          </button>

          {/* CONTENT */}
          {signup ? (
            <SignUpClient
              setSignUp={setSignUp}
              SetSignupSuccess={SetSignupSuccess}
            />
          ) : (
            <div className="mt-10">
              <form
                className="space-y-4"
                action={handleSubmit}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-(--accent-secondary)"
                />

                <div className="text-right text-xs">
                  <Link
                    href="/auth/forgot-password"
                    className="text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-(--accent-secondary)"
                />

                <SignInButton isPending={isPending}>
                  Sign In
                </SignInButton>
              </form>

              <div className="mt-4 text-center text-sm">
                <span>Don’t have an account?</span>{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={showSignUp}
                >
                  Sign up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {signupSuccess && <SignUpSucess />}
    </>
  )
}

export default EmailLogin