import ReviewsClient from "@/app/_components/ReviewsClient"
import { getReviews } from "@/app/_lib/supabase/apis"




const metadata = {
  metadataBase: new URL("https://preci.co.za/reviews"),

  title: {
    default:
      "Preci | Reviews",
      
    template: "%s | Preci",
  },
}


export default async function ReviewsPage() {
    const reviews = await getReviews()
    // console.log(reviews)

    return (
        <div className="w-screen h-full">
            <ReviewsClient data={reviews}/>

        </div>
    )
 
}
