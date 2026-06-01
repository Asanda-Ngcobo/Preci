import BlogBody from "@/app/_components/BlogBody";
import CallToAction from "@/app/_components/CallToAction";
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

   const ctaConfig = {
  insurance: {
    href: "/insurance",
    label: "Check Insurance Policy",
  },
  employment: {
    href: "/employment",
    label: "Check Employment Contract",
  },
  Housing: {
    href: "/housing",
    label: "Check Lease Agreement",
  },
}

const cta = ctaConfig[blog.type] || {
  href: "/auth/login",
  label: "Upload Agreement",
}
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
    <article className="w-[90%]
     mx-auto mt-10">
      
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
     <CallToAction blog={blog}/>
      <div className="fixed bg-black text-white
     flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
    
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-full h-full
          md:h-auto md:max-w-3xl
         
          md:rounded-3xl
          shadow-2xl
          overflow-hidden
          animate-in fade-in zoom-in duration-300
        "
      >
  

        <div className="flex flex-col  h-full">
          
          

          {/* Content */}
          <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
         
            
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">
              Stop Guessing What Your Contract Says
            </h2>

            <div className="mt-4 text-gray-600 text-lg md:text-xl">
              {blog.cta}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
           <Link
  href={cta.href}
  className="
    flex-1 text-center
    px-6 py-5 rounded-xl
    bg-(--accent-primary)
    text-white font-medium
    hover:opacity-90 transition
  "
>
  {cta.label}
</Link>

              <Link
                href="/#meet-preci"
                className="
                  flex-1 text-center
                  px-6 py-4 rounded-xl
                  bg-black
                  text-white font-medium
                  border-white
                  hover:opacity-90 transition
                "
              >
                Learn More
              </Link>
            </div>

            <p className="mt-4 text-sm text-center text-gray-500">
              Join thousands of South Africans making sense of
               their agreements before the lack of understanding costs the thousands of rands.
            </p>
          
          </div>
         
        </div>
      </div>
    </div>
    </article>
  );
}