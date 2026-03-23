import { redirect } from "next/navigation";
import Main from "@/app/_components/Main";
import { createClient } from "@/app/_lib/supabase/server";
import SideBar from "@/app/_components/SideBar";
import SearchView from "@/app/_components/SearchView";
import { getSummaries } from "@/app/_lib/supabase/apis";




export default async function Home() {
const supabase = await createClient()

// const { data: {user}, error } = await supabase.auth.getClaims()
//  if (error || !user?.claims) {
//   redirect('/auth/login')
//  }

 const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    redirect('/')
  }

  console.log({user})
console.log('User ID:', user.id)
const mysummaries = await getSummaries(user.id)



  return (
   <div className="flex">
    <SideBar data={user}
    userSummaries={mysummaries}/>
    <Main data={user}/>
    <SearchView/>
    
   </div>
  );
}
