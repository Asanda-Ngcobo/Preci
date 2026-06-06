import LoginClient from "@/app/_components/_auth_components/LoginClient"
import LoginInsurance from "@/app/_components/_auth_components/LoginInsurance"
import MeetPreciInsurance from "@/app/_components/_auth_components/MeetPreciInsurance"

import InsuranceImage from "@/app/_components/InsuranceImage"







function Page() {
  return (
    <>
     <div className="flex md:flex-row
    gap-6 md:gap-2 flex-col-reverse max-h-fit mt-15
     items-center justify-center ">
      <LoginInsurance />
      {/* <Testimonials/> */}
      <InsuranceImage/>
    </div>
    <MeetPreciInsurance/>
    </>
   
  )
}

export default Page

