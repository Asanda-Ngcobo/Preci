import Blogs from "@/app/_components/Blogs";
import { getBlogs } from "@/app/_lib/supabase/apis";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const allBlogs = await getBlogs();

  const blogs = allBlogs.filter(
    (blog) => blog.type?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="w-[80%] mx-auto mt-10">


      <Blogs blogs={blogs} />
    </div>
  );
}