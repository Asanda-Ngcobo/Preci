

export const metadata = {
  title: "Forgot Password Success | Preci",
  description: "Preci - Make Informed Decisions",
};

export default function Page() {
  return (
    <main className="grid items-center h-[70vh] ">
           <div className=" py-6 px-4 rounded-md w-[90%] mt-[40%]
     ml-[5%] md:w-[40%] md:ml-[30%] md:mt-[5%] text-center bg-white shadow">
      <h1 className={` text-[20px] font-semibold mb-2`}>
       Check your emails to complete your password rest.
      </h1>

      <h2 className="text-lg mb-4">We have sent you an email link. 
        Click the link to create a new password.
       </h2>

      
    </div>
    {/* <p className="flex justify-center mt-[10%] underline text-blue-600">  <Link href='/'> Go To Home Page</Link></p> */}
  
    </main>
 
  )
}
