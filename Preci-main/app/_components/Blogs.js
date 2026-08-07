import BlogCard from "./BlogCard";
import BlogNavLinksMobile from "./BlogNavLinksMobile";


function Blogs({ blogs}) {

  

  return (
    <div>
      <h1 className="text-4xl capitalize mb-8">
        Understand Your Commitments With Preci
      </h1>
   {/* <Filter/> */}
     <BlogNavLinksMobile/>

      {blogs.length > 0 ? <BlogCard blogs={blogs}/> : <div className="flex w-full
       h-[80vh] justify-center items-center">
        <h1>NOTHING YET</h1></div>} 
    </div>
  );
}

export default Blogs;