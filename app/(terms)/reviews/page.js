import ReviewsClient from "@/app/_components/ReviewsClient"
import { getReviews } from "@/app/_lib/supabase/apis"







export default async function ReviewsPage() {
    const reviews = await getReviews()
    // console.log(reviews)

    return (
        <div className="w-screen h-full">
            <ReviewsClient data={reviews}/>

        </div>
    )
 
}