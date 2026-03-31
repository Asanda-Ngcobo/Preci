import BlogCard from "./BlogCard";
import BlogNavLinksMobile from "./BlogNavLinksMobile";
// import Filter from "./Filter";

function Blogs({ blogs, filter }) {

  // const displayBlogs =
  //   filter === "All"
  //     ? blogs
  //     : blogs.filter((blog) => blog.type === filter);

  return (
    <div>
      <h1 className="text-4xl capitalize mb-8">
        Sign Confidently With Preci
      </h1>
   {/* <Filter/> */}
     <BlogNavLinksMobile/>

      <BlogCard blogs={blogs} />
    </div>
  );
}

export default Blogs;