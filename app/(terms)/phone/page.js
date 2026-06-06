import LoginPhone from "@/app/_components/_auth_components/LoginPhone"
import MeetPreci from "@/app/_components/_auth_components/MeetPreci"
import MeetPreciPhone from "@/app/_components/_auth_components/MeetPreciPhone"
import PhoneImage from "@/app/_components/PhoneImage"









function Page() {
  return (
    <>
      <div className="flex md:flex-row
    gap-6 md:gap-2 flex-col-reverse max-h-fit mt-15
     items-center justify-center ">
      <LoginPhone />
      {/* <Testimonials/> */}
      <PhoneImage/>
    </div>
    <MeetPreciPhone/>
    </>
  
  )
}

export default Page

