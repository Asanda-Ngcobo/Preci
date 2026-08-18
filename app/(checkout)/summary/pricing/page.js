export default function PricingPage() {

const metadata = {
  metadataBase: new URL("https://preci.co.za"),

  title: {
    default:
      "Preci | Pricing",
      
    template: "%s | Preci",
  },
}
  const pricing = [
    { words: "~ 1,000 words", price: "R8" },
    { words: "~ 2,500 words", price: "R20" },
    { words: "~ 5,000 words", price: "R40" },
    { words: "~10,000 words", price: "R80" },
    { words: "~20,000 words", price: "R120" },
  
  ];

  const features = [
    {
      title: "Full Contract Summary",
      description:
        "Get a clear, easy-to-understand summary of your entire contract.",
      icon: "📄",
    },
    {
      title: "Important Clauses",
      description:
        "Identify important terms that may affect your rights, responsibilities and payments.",
      icon: "🔍",
    },
    {
      title: "Fees & Financial Obligations",
      description:
        "Understand recurring charges, penalties and other financial obligations.",
      icon: "💰",
    },
    {
      title: "Cancellation & Termination",
      description:
        "See what your contract says about cancelling, terminating or ending the agreement.",
      icon: "🚪",
    },
    {
      title: "Contract Duration",
      description:
        "Understand the contract period, renewal terms and important dates.",
      icon: "📅",
    },
    {
      title: "Potential Red Flags",
      description:
        "Identify clauses and terms that may deserve your attention.",
      icon: "⚠️",
    },
  ];

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

  const faqs = [
    {
      question: "Why is pricing based on word count?",
      answer:
        "Longer contracts require more processing and analysis. Pricing based on word count allows Preci to charge according to the amount of content being analysed rather than charging everyone the same price.",
    },
    {
      question: "Will I know the price before paying?",
      answer:
        "Yes. Preci calculates your contract's word count and shows you the applicable processing fee before you make a payment.",
    },
    {
      question: "Do I have to pay to upload my contract?",
      answer:
        "No. You can upload your contract and receive a preview before deciding whether to unlock the full summary.",
    },
    {
      question: "Is this a subscription?",
      answer:
        "No. Preci uses a one-time payment per contract. There are no recurring monthly charges.",
    },
    {
      question: "Can I use Preci for different types of contracts?",
      answer:
        "Yes. Preci can help you understand consumer contracts such as mobile phone contracts, insurance policies, service agreements and other documents.",
    },
    {
      question: "Is Preci a lawyer?",
      answer:
        "No. Preci provides AI-generated explanations and summaries to help you better understand contractual documents. It does not provide legal advice or replace a qualified legal professional.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="mx-auto max-w-5xl text-center">

          <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-(--accent-primary)">
            Simple, transparent pricing
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Understand Your Contract
            <span className="block text-(--accent-primary)">
              Before You Pay For It
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Preci turns complicated contracts into clear, easy-to-understand
            summaries so you can better understand what you're agreeing to.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="rounded-xl bg-(--accent-primary) px-7 py-3.5 font-semibold text-white transition hover:bg-(--accent-secondary)"
            >
              Analyse My Contract
            </a>

            <a
              href="#pricing"
              className="rounded-xl border border-gray-200 px-7 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              View Pricing
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span>✓ No subscription</span>
            <span>✓ One-time payment</span>
            <span>✓ Free preview</span>
            <span>✓ Know your price before paying</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="bg-gray-50 px-6 py-20 md:py-24"
      >
        <div className="mx-auto max-w-4xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pricing Based on Your Contract
            </h2>

            <p className="mt-4 text-gray-600">
              Every contract is different. That's why Preci's pricing is based
              on the number of words in your contract.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-2 bg-(--accent-primary) px-6 py-4 text-sm font-semibold text-white">
              <span>Contract Length</span>
              <span className="text-right">Processing Fee</span>
            </div>

            {pricing.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 border-t border-gray-100 px-6 py-5 text-sm sm:text-base"
              >
                <span className="font-medium text-gray-700">
                  {item.words}
                </span>

                <span className="text-right font-semibold text-gray-900">
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-blue-50 p-5 text-center">
            <p className="text-sm leading-6 text-(--accent-secondary)">
              <strong>Your exact price is calculated automatically</strong>{" "}
              after you upload your contract. Most consumer contracts are under 2500 words
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What You Get
            </h2>

            <p className="mt-4 text-gray-600">
              Every paid contract summary gives you a clearer picture of what
              you're agreeing to.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 text-3xl">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>

            <p className="mt-4 text-gray-600">
              From upload to understanding your contract in just a few steps.
            </p>
          </div>

          <div className="space-y-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--accent-primary) text-sm font-bold text-white">
                  {step.number}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No subscription */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-(--accent-primary) px-6 py-12 text-center text-white md:px-12 md:py-16">

          <h2 className="text-3xl font-bold sm:text-4xl">
            No Subscription Required
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
            You don't need another monthly subscription just to understand a
            contract. Upload your document, preview your summary and pay only
            when you want to unlock the full version.
          </p>

          <div className="mt-8 text-lg font-semibold">
            Upload → Preview → See Your Price → Pay → Full Summary
          </div>

          <a
            href="/"
            className="mt-9 inline-block rounded-xl bg-white px-7 py-3.5 font-semibold text-(--accent-primary) transition hover:bg-gray-100"
          >
            Analyse My Contract
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-6"
              >
                <summary className="cursor-pointer list-none font-semibold text-gray-900">
                  <div className="flex items-center justify-between gap-5">
                    <span>{faq.question}</span>

                    <span className="text-xl text-gray-400 transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center md:py-28">
        <div className="mx-auto max-w-3xl">

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Know What You're Agreeing To
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Contracts shouldn't be difficult to understand simply because
            they're written in legal language.
          </p>

          <p className="mt-4 text-lg font-medium text-gray-900">
            Upload your contract and see how much it costs to unlock your full
            summary.
          </p>

          <a
            href="/"
            className="mt-8 inline-block rounded-xl bg-(--accent-primary) px-8 py-4 font-semibold text-white transition hover:bg-(--accent-secondary)"
          >
            Analyse My Contract
          </a>

          <p className="mx-auto mt-6 max-w-2xl text-xs leading-5 text-gray-500">
            Preci provides AI-generated information to help you understand
            documents. It is not a substitute for professional legal advice.
          </p>
        </div>
      </section>

    </main>
  );
}
