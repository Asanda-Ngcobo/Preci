"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Upload your contract",
    description:
      "Upload your PDF or supported contract document.",
  },
  {
    number: "02",
    title: "Get your free preview",
    description:
      "Preci analyses your document and generates a preview of your summary.",
  },
  {
    number: "03",
    title: "See your price",
    description:
      "Your contract's word count determines the applicable processing fee.",
  },
  {
    number: "04",
    title: "Unlock the full summary",
    description:
      "Pay the one-time processing fee to access your complete summary.",
  },
  {
    number: "05",
    title: "Understand before you agree",
    description:
      "Read your contract in plain language and make a more informed decision.",
  },
];

export default function Accordion() {
  const [curOpen, setCurOpen] = useState(null);

  const handleToggle = (number) => {
    setCurOpen(curOpen === number ? null : number);
  };

  return (
    <section className="bg-gray-50 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>

          <p className="mt-4 text-gray-600">
            From upload to understanding your contract in just a few steps.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {steps.map((step) => {
            const isOpen = curOpen === step.number;

            return (
              <div
                key={step.number}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  transition-all duration-300
                  ${
                    isOpen
                      ? "border-(--accent-primary) shadow-md"
                      : "border-gray-200"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(step.number)}
                  className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <div
                    className={`
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-full
                      text-sm font-bold
                      transition-colors
                      ${
                        isOpen
                          ? "bg-(--accent-primary) text-white"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="flex-1 font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  {/* Chevron */}
                  <span
                    className={`
                      text-xl text-gray-400
                      transition-transform duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  >
                    ↓
                  </span>
                </button>

                {/* Content */}
                <div
                  className={`
                    grid transition-all duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-100 px-5 pb-6 pt-4 pl-[76px] sm:px-6 sm:pl-[82px]">
                      <p className="text-sm leading-6 text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
