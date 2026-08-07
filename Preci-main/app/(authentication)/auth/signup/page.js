import SignUpClient from "@/app/_components/SignUpClient";


export const metadata = {
  title: 'Sign Up'
  
};

function page() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <SignUpClient/>
            
        </div>
    )
}

export default page
