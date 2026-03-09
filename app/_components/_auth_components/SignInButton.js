'use client'




function SignInButton({children, isPending}) {
    
    return (
        <button className="w-[80%] mx-[10%] 
                    bg-(--accent-primary)
                    text-white
                    flex justify-center items-center
                    rounded-sm py-3
                    hover:opacity-90
                    hover:cursor-pointer"
                    disabled={isPending}
                    type="submit">
                       {isPending ? 'Signing in...': children} 
            
        </button>
    )
}

export default SignInButton
