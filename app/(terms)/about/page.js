export default function AboutPage() {
  return (
    <main className="bg-white text-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-50 via-white to-zinc-100" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm">
              About Preci
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              Understand Before
              <span className="block text-zinc-500">You Agree.</span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-600 sm:text-xl">
              Preci helps people instantly understand agreements,
              contracts, policies, and legal documents in plain language
              before they click “Accept” or sign.
            </p>

            <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-500">
              Whether it’s a rental agreement, freelance contract,
              employment contract, subscription policy, or terms &
              conditions, Preci breaks down complex legal wording into
              clear, easy-to-understand summaries.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700">
                Try Preci
              </button>

              <button className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Our Mission
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
              Making agreements understandable for everyone.
            </h2>

            <p className="mt-8 text-lg leading-8 text-zinc-600">
              Every day, millions of people agree to documents they never
              fully read or understand because the language is too
              technical, too long, or too intimidating.
            </p>

            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Preci exists to close that gap by simplifying complex legal
              language into clear, actionable insights that anyone can
              understand.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-zinc-900">
              We believe people deserve to know:
            </h3>

            <div className="mt-8 grid gap-4">
              {[
                "What they are agreeing to",
                "What risks exist inside a document",
                "What responsibilities they are accepting",
                "What rights they may be giving away",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-zinc-900" />
                  <p className="text-zinc-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built Preci */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Why We Built Preci
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
              Most people accept agreements without understanding them.
            </h2>

            <p className="mt-8 text-lg leading-8 text-zinc-600">
              Agreements are often filled with legal jargon, hidden terms,
              confusing clauses, and pages of information that people do
              not have the time or expertise to fully understand.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Too long",
              "Difficult to understand",
              "Filled with legal terminology",
              "Time-consuming to review",
            ].map((problem) => (
              <div
                key={problem}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
              >
                <p className="text-lg font-semibold text-zinc-900">
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            What Preci Does
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
            AI-powered agreement understanding.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[
            {
              title: "AI-Powered Summaries",
              description:
                "Upload or paste agreements and receive simplified summaries in seconds.",
            },
            {
              title: "Risk Detection",
              description:
                "Highlight hidden fees, auto-renewals, cancellation terms, and unusual obligations.",
            },
            {
              title: "Plain Language Explanations",
              description:
                "Complex legal wording translated into simple, human-friendly explanations.",
            },
            {
              title: "Faster Decision Making",
              description:
                "Focus on the information that matters most without reading pages of legal text.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold text-zinc-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Audience Section */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Who Preci Is For
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
              Built for everyday people and modern professionals.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Students",
                text: "Understand accommodation agreements, bursary terms, and subscriptions.",
              },
              {
                title: "Freelancers & Creators",
                text: "Review client contracts, NDAs, and payment terms with confidence.",
              },
              {
                title: "Employees & Job Seekers",
                text: "Break down employment contracts and workplace policies.",
              },
              {
                title: "Entrepreneurs",
                text: "Review vendor agreements, SaaS terms, and partnerships faster.",
              },
              {
                title: "Consumers",
                text: "Understand subscriptions, mobile contracts, and online policies.",
              },
              {
                title: "Anyone Seeking Clarity",
                text: "Because understanding agreements should be simple and accessible.",
              },
            ].map((user) => (
              <div
                key={user.title}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-zinc-900">
                  {user.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-600">{user.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Our Vision
        </p>

        <h2 className="mt-4 text-5xl font-bold tracking-tight text-zinc-900">
          A future where everyone understands what they agree to.
        </h2>

        <p className="mt-10 text-xl leading-9 text-zinc-600">
          As digital services continue to grow, people are being asked to
          accept more terms, contracts, and policies than ever before.
        </p>

        <p className="mt-6 text-xl leading-9 text-zinc-600">
          Preci aims to become the everyday layer of clarity between people
          and the agreements they interact with online and offline.
        </p>
      </section>

      {/* Trust Section */}
      <section className="border-t border-zinc-200 bg-zinc-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Privacy & Trust
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Built responsibly.
              </h2>

              <p className="mt-8 text-lg leading-8 text-zinc-300">
                Trust is central to everything we build. Preci is designed
                to help users understand documents securely,
                transparently, and responsibly.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "User privacy",
                "Secure document handling",
                "Transparent AI-generated summaries",
                "Clear communication about limitations",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-800/60 p-5"
                >
                  <p className="font-medium text-zinc-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-28 text-center lg:px-8">
          <h2 className="text-5xl font-bold tracking-tight text-zinc-900">
            Read Less. Understand More.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-zinc-600">
            Preci helps people understand agreements faster, identify
            important risks, and make more informed decisions before
            accepting terms.
          </p>

          <div className="mt-12 flex justify-center gap-4">
            <button className="rounded-2xl bg-zinc-900 
            px-8 py-4 text-sm font-semibold text-white transition hover:bg-zinc-700">
              Start Using Preci
            </button>

            <button className="rounded-2xl border border-zinc-300 bg-white px-8 py-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
