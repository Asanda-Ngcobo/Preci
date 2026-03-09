
import { getBlogs } from "@/app/_lib/supabase/apis";
import Link from "next/link";


export default async function Page() {
  const blogs = await getBlogs();

  return (
    <div className="w-[80%] mx-auto mt-10">
      <h1 className="text-4xl mb-8">Blogs</h1>

      <div className="flex flex-col gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold">{blog.title}</h2>

            <p className="text-gray-500 mt-2">
              {blog.seo_description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}