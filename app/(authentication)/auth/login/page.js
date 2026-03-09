import LoginClient from "@/app/_components/_auth_components/LoginClient"
import Testimonials from "@/app/_components/_auth_components/Testimonials";
export const metadata = {
  title: 'Login'
  
};


function Page() {
  return (
    <div className="flex md:flex-row
    gap-6 md:gap-2 flex-col-reverse max-h-fit mt-15
     items-center justify-center ">
      <LoginClient />
      <Testimonials/>
    </div>
  )
}

export default Page
