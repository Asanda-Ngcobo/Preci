'use client'

import Link from "next/link";
import { useState, useTransition } from "react"
import SignInButton from "./_auth_components/SignInButton";
import { signUpUser } from "../_lib/actions";
import { Check, Eye, EyeOff, X } from "@deemlol/next-icons";
//  
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

function SignUpClient({setSignUp, SetSignUpSuccess, }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
     const [name, setName] = useState('')
     const [showPassword, setShowPassword] = useState(false);
    //  const router = useRouter();
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
      await signUpUser(formData);
    } catch (error) {
      redirect(`/auth/error`);
      return;
    }
    // ✅ Only reached if no error was thrown
    redirect(`/auth/signup-success`);
  });
};
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
             <h2 className="font-sans text-(--accent-primary) 
             font-bold text-center text-3xl
             ">
                <Link href='/auth/login'>
                Préci
                </Link>
                    
                </h2>
                <p className="text-sm text-center">
                    Register With Email & Password</p>
              
                <form
                action={handleSubmit} className="space-y-3 md:w-[50%] w-[90%] mx-auto">

                            <input type="name" placeholder="Fullname*"
                            name="name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                required
                className="rounded-sm
                px-4 border w-[80%] my-2 mx-[10%] py-3 border-gray-400
                focus focus:outline-2 focus:outline-(--accent-secondary) 
                focus:border-0 "
                />
                     <input type="email" placeholder="Email Address*"
                     name="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                className="rounded-sm
                px-4 border w-[80%] my-2 mx-[10%] py-3 border-gray-400
                focus focus:outline-2 focus:outline-(--accent-secondary) 
                focus:border-0 "
                />
               
               <div className="relative">
                 <input 
                 type={showPassword ? 'text' : 'password'}
                 placeholder="Password*"
                 name="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                className="rounded-sm
                px-4 border my-2 w-[80%] mx-[10%] py-3 border-gray-400
                focus focus:outline-2 focus:outline-(--accent-secondary) 
                focus:border-0"
                />
                  <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          </div>
            {/* Password rules */}
              {password.length > 0 && 
                <ul className="mt-2 w-[80%] mx-auto text-sm space-y-1">
        {rules.map((rule, i) => (
          <li
            key={i}
            className={`flex items-center gap-2 ${
              rule.valid ? "text-green-600" : "text-gray-500"
            }`}
          >
            {rule.valid ? (
              <Check size={16} />
            ) : (
              <X size={16} className="text-red-500" />
            )}
            {rule.label}
          </li>
        ))}
      </ul> }
                  <SignInButton
                  isPending={isPending}>Sign Up</SignInButton>
              
                    
                    
                </form>
                    <p className="text-center text-xs py-2 text-gray-300">By continuing,
             you acknowledge    Préci’s <Link href='privacy'
             className="underline">
             Privacy Policy.
             </Link> </p>
                    <div className="w-[70%] text-center mx-auto my-3
                    text-[14px] ">
                        <h2>Have an account already? <button 
                        className="text-blue-500 cursor-pointer"
                        onClick={()=> setSignUp(prev => !prev)}>
                    Sign In</button></h2>
                    </div>

            
        </div>
    )
}

export default SignUpClient
