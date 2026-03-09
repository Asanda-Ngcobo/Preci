'use client';
import React from 'react';

export default function BlogBody({ body }) {
  // Split the body by double newlines (paragraphs)
  const paragraphs = body.split(/\n\s*\n/);

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
    </div>
  );
}