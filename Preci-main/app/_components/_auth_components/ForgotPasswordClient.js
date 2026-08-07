'use client'

import Link from "next/link";
import { useState, useTransition } from "react"
import AuthButton from "./AuthButton";
import { redirect } from "next/navigation";
import { ResetPasswordWithEmail } from "@/app/_lib/actions";


export default function ForgotPasswordClient() {

    const [email, setEmail] = useState('');
      const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const { success, error } = await ResetPasswordWithEmail(formData);

      if (success) {
       redirect(`/auth/forgot-password/success`)
        
      } else {
        redirect(`/auth/error`)
      }
    });
  };
  
    return (
        <div className="md:w-[30%] w-[90%] h-[80vh] mx-auto bg-gray-50
        lg:shadow-lg lg:shadow-gray-400 rounded-xl py-3">
             <h2 className="font-sans text-(--accent-primary) 
             font-bold text-center text-3xl
             ">
                <Link href='/'>
                Préci
                </Link>
                    
                </h2>
                <h3 className="text-center py-3">Forgot Your Password?</h3>
                <p className="text-sm text-center py-3 w-[80%] mx-auto">
                 Enter your email address and we will send you instructions to reset your password.</p>
                
                <form className="py-2  "
                action={handleSubmit}>
                     <input type="text" placeholder="Email Address*"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="rounded-sm
                px-4 border w-[80%] my-2 mx-[10%] py-3 border-gray-400
                focus focus:outline-2 focus:outline-(--accent-secondary) 
                focus:border-0 "
                />
               
        

                  <AuthButton>Continue</AuthButton>
                 
                    
                    
                </form>
               

            
        </div>
    )
}

