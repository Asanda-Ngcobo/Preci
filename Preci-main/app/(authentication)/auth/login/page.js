import LoginClient from "@/app/_components/_auth_components/LoginClient"
import Testimonials from "@/app/_components/_auth_components/Testimonials";
export const metadata = {
  title: 'Preci | Login'
  
};


function Page() {
  return (
    <div className="flex md:flex-col
    gap-6 md:gap-2 flex-col-reverse max-h-fit mt-15
     items-center justify-center text-black ">
       <h1 className="text-foreground">Sign In to access your summaries</h1>
      <LoginClient />
  
    </div>
  )
}

export default Page
