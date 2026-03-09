import BlogBody from "@/app/_components/BlogBody";
import { getBlogBySlug } from "@/app/_lib/supabase/apis";
import Link from "next/link";



export async function generateMetadata({ params }) {
  // Unwrap slug if params is a Promise
  const resolvedParams = await params;  // ✅ unwrap
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: blog.seo_title || blog.title,
    description: blog.seo_description,
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description,
      type: "article",
      url: `https://yourdomain.com/blog/${blog.slug}`,
    },
  };
}

export default async function Page({ params }) {
   const resolvedParams = await params; // ✅ unwrap the promise
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return <p>Blog not found</p>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.seo_description,
    datePublished: blog.created_at,
    author: {
      "@type": "Person",
      name: "Preci AI",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/blog/${blog.slug}`,
    },
  };

  return (
    <article className="w-[50%] ml-[15%] mt-10">
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <h1 className="text-4xl font-bold mb-4 ">
        {blog.title}
      </h1>

      <p className="text-gray-400 mb-10 text-2xl">
        {new Date(blog.created_at).toDateString()}
      </p>

      <div className="prose max-w-none text-2xl">
        <BlogBody 
        body={blog.body}/>
      </div>

      <div className="w-[30%]
      fixed right-5
      z-10 bottom-4 h-fit p-6 rounded-2xl text-xl shadow-2xl flex flex-col gap-3 ">
        {blog.cta}
        <div className="w-full flex gap-3">
<button className="p-2 rounded-lg w-1/2 h-fit
        text-white bg-(--accent-primary)">
          <Link href='/auth/login'>
           Upload
          </Link>
         
        </button>
         <button className="p-2 rounded-lg w-1/2 h-fit
        text-white bg-black">
         <Link href='/auth/login#meet-preci'>
           Learn More
          </Link>
        </button>
        </div>
        

      </div>

    </article>
  );
}