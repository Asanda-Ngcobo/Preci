import ForgotPasswordClient from "@/app/_components/_auth_components/ForgotPasswordClient";



export const metadata = {
  title: 'Forgot Password'
  
};

function page() {
    return (
        <div className="flex min-h-screen items-center justify-center">
           <ForgotPasswordClient/>
            
        </div>
    )
}

export default page
