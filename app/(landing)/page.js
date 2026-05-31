import LoginClient from "../_components/_auth_components/LoginClient";

import HeroImage from "../_components/HeroImage";






function Page() {
  return (
    <div className="flex md:flex-row
    gap-6 md:gap-2 flex-col-reverse max-h-fit mt-15
     items-center justify-center ">
      <LoginClient />
      {/* <Testimonials/> */}
      <HeroImage/>
    </div>
  )
}

export default Page

