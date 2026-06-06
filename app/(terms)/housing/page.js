import LoginHousing from "@/app/_components/_auth_components/LoginHousing"
import MeetPreci from "@/app/_components/_auth_components/MeetPreci"

import HousingImage from "@/app/_components/HousingImage"










function Page() {
  return (
    <>
      <div className="flex md:flex-row
    gap-6 md:gap-2 flex-col-reverse max-h-fit mt-15
     items-center justify-center ">
      <LoginHousing />
   
      <HousingImage/>
    </div>
    <MeetPreci/>
 
    </>
   )
}

export default Page

