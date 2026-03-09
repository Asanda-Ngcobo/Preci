import { getSummary } from "@/app/_lib/supabase/apis";
import SummaryPreview from "@/app/_components/summaryPreview";
import { createClient } from "@/app/_lib/supabase/server";

export default async function UserSummaryPage({params}) {
    const supabase = await createClient()
        const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  const {email} = user;
    const {summaryId} = await params;
    const summary = await getSummary(summaryId)
    if(!summary) return <div>Summary not found</div>
    return (
        <div className="w-screen h-screen flex flex-col justify-center
        items-center">
       
            
            <SummaryPreview 
            summary={summary}
            email={email}/>
            
        </div>
    )
}


