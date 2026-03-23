import Blogs from "@/app/_components/Blogs";
import { getBlogs } from "@/app/_lib/supabase/apis";

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <div className="w-[80%] mx-auto mt-10">
      <Blogs blogs={blogs ?? []} />
    </div>
  );
}