'use client'
import Link from "next/link"
import SignInButton from "./SignInButton"
import { useState, useTransition } from "react"
import { ChevronLeft } from "@deemlol/next-icons"
import Testimonials from "./Testimonials"
import SignUpClient from "../SignUpClient"
import { loginUser } from "@/app/_lib/actions"
import toast from "react-hot-toast"
import SignUpSucess from "./SignUpSucess"

function EmailLogin({setIsEmail}) {
     const [password, setPassword] = useState("")
     const [email, setEmail] = useState("")
     const [signup, setSignUp] = useState(false)
     const [isPending, startTransition] = useTransition()
     const [signupSuccess, SetSignupSuccess] = useState(false)

     const handleSubmit = (formData) => {
    startTransition(async () => {
      try {
         await loginUser(formData);


      }
       catch (error) {
        toast.error('Something went wrong', {
  duration: 4000,
  style: {
    background: '#2F8F83',
    color: '#fff',
  },
});
      }
    });
  };

     
     

     function showSignUp(){
      setSignUp(prev => !prev)
     }
    return (
        <>
        <div className="h-full w-full fixed inset-0  transition-all
                 duration-300 z-40  
         bg-white left-0 overflow-y-scroll  no-scrollbar ">

            <button className="bg-(--accent-primary)
            rounded-full mt-10 md:ml-30 ml-10
            h-10 w-10 flex justify-center items-center
            cursor-pointer"
            onClick={()=> setIsEmail(false)}>
                <ChevronLeft/>
            </button>
               <div className="flex md:flex-row flex-col ">
 {signup ? <SignUpClient
 setSignUp={setSignUp}
 SetSignupSuccess={SetSignupSuccess}
 /> : (


                <div className="h-screen w-screen flex flex-col justify-center items-center">
    <form className="space-y-3 md:w-[50%] w-[90%] mx-auto"
    action={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" rounded-md border
            w-[80%] mx-[10%] border-gray-300 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-(--accent-secondary)"
          />

          <div className="text-right md:mr-15 mr-10 text-xs">
            <Link
              href="/auth/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" rounded-md 
            w-[80%] mx-[10%]
            border border-gray-300 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 
              focus:ring-(--accent-secondary)"
          />

          <SignInButton
          isPending={isPending}>
            Sign In
          </SignInButton>
        </form>
       

        {/* Footer */}
        <div className="mt-4 text-center text-sm">
          <span>Don’t have an account?</span>{" "}
          <button className="text-blue-500 hover:underline"
          onClick={showSignUp}>
            Sign up
          </button>
        </div>
 
</div>


            

 )}
 <Testimonials/>
        </div>   
              
            
        </div>
        {signupSuccess && <SignUpSucess/>}
        </>
        
    )
}

export default EmailLogin
