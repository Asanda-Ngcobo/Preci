'use client'

import Link from "next/link";
import { useState, useTransition } from "react"
import SignInButton from "./_auth_components/SignInButton";
import { signUpUser } from "../_lib/actions";
import { Check, Eye, EyeOff, X } from "@deemlol/next-icons";
import { redirect } from "next/navigation";

function SignUpClient({ setSignUp, SetSignUpSuccess }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const rules = [
    {
      label: "At least 1 uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least 1 number",
      valid: /[0-9]/.test(password),
    },
    {
      label: "Minimum 8 characters",
      valid: password.length >= 8,
    },
  ];

  const handleSubmit = (formData) => {
    startTransition(async () => {
      try {
        await signUpUser(formData)
      } catch (error) {
        redirect(`/auth/error`)
        return
      }
      redirect(`/users`)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">

      {/* CARD */}
      <div className="relative w-[92%] max-w-md rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-6">

        {/* Header */}
        <h2 className="font-sans text-(--accent-primary) font-bold text-center text-2xl">
          <Link href='/auth/login'>Préci</Link>
        </h2>

        <p className="text-sm text-center mb-4">
          Register with email & password
        </p>

        {/* FORM */}
        <form
          action={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Full name*"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-(--accent-secondary)"
            required
          />

          <input
            type="email"
            placeholder="Email address*"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-(--accent-secondary)"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-(--accent-secondary)"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* PASSWORD RULES */}
          {password.length > 0 && (
            <ul className="text-xs space-y-1">
              {rules.map((rule, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-2 ${
                    rule.valid ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {rule.valid ? (
                    <Check size={14} />
                  ) : (
                    <X size={14} className="text-red-500" />
                  )}
                  {rule.label}
                </li>
              ))}
            </ul>
          )}

          <SignInButton isPending={isPending}>
            Sign Up
          </SignInButton>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs mt-4 text-gray-500">
          By continuing, you acknowledge Préci’s{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>

        <div className="text-center mt-3 text-sm">
          <span>Have an account already?</span>{" "}
          <button
            className="text-blue-500 cursor-pointer"
            onClick={() => setSignUp(prev => !prev)}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUpClient
