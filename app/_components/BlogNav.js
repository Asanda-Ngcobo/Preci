import Link from "next/link"
import BlogNavLinks from "./BlogNavLinks"

function BlogNav() {
      return (
    <div className="sticky bg-white 
     z-10 flex justify-center items-center  top-0 w-screen 
     h-20 
     ">
        <div className="flex flex-row
        w-[90%] mx-auto justify-between items-center ">
              <h2 className="font-sans text-(--accent-primary) font-semibold
                text-3xl cursor-pointer">
                    <Link href='/'>Préci</Link>
                   
                </h2>
 <BlogNavLinks/>
        </div>


    </div>
   
  )
}

export default BlogNav
