import Image from "next/image";
import Link from "next/link";

function BlogCard({ blogs = [] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.type.toLowerCase()}/${blog.slug}`}
          className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          {blog.image_url && (
            <div className="relative w-full h-48">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>

            {blog.seo_description && (
              <p className="text-gray-500 mt-2">{blog.seo_description}</p>
            )}

            {blog.type && (
              <span className="inline-block mt-3 px-3 py-1 rounded-xl
               bg-(--text-secondary) text-white text-sm capitalize">
                {blog.type}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogCard;