'use client';
import React from 'react';
import Link from "next/link";
import Image from "next/image"
export default function BlogBody({ body, blog }) {
  // Split the body by double newlines (paragraphs)
  const paragraphs = body.split(/\n\s*\n/);
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
    href: "/Housing",
    label: "Check Lease Agreement",
  },
}

const cta = ctaConfig[blog.type] || {
  href: "/auth/login",
  label: "Upload Agreement",
}
  return (
    <div className="max-w-none mx-auto">
      {paragraphs.map((para, i) => {
        // Trim whitespace
        const trimmed = para.trim();

        // Check if paragraph starts with number + dot (e.g., "1. ")
        const isSubtitle = /^\d+\.\s/.test(trimmed);

        if (isSubtitle) {
          return (
            <h2
              key={i}
              className="text-2xl font-bold mt-8 mb-4"
            >
              {trimmed.replace(/^\d+\.\s/, '')} {/* remove number from display */}
            </h2>
          );
        }

        // Render normal paragraph
        return (
          <p key={i} className="mb-4 text-gray-700">
            {trimmed}
          </p>
        );
      })}

       {/* Modal */}
      <div
        className="
          
          w-full h-fit
          md:h-auto 
         bg-black
          md:rounded-3xl
          shadow-2xl
          overflow-hidden
          animate-in fade-in zoom-in duration-300
        "
      >
    

        <div className="flex flex-col  h-full">
          
          {/* Image */}
          
            <div className="flex flex-col md:flex-row h-full">
          
                  {blog.image_url && (
            <div className="relative h-72 md:h-auto md:w-1/2">
              <Image
                src={blog.image_url}
                alt={blog.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
            </div>
          

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
  );
}