export default function RefundPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-foreground">
      <h1 className="text-3xl font-semibold mb-2">
        Refund & Cancellation Policy
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: 27 March 2026
      </p>

      <Section title="1. Overview">
        <p>
          Preci provides digital services that generate AI-powered contract
          summaries. Due to the nature of digital content, refunds are limited.
        </p>
      </Section>

      <Section title="2. When Refunds Are Available">
        <ul className="list-disc ml-6 space-y-2">
         
          <li>Clearly incomplete or unusable output</li>
          <li>Duplicate or incorrect charges</li>
        </ul>
      </Section>

      <Section title="3. When Refunds Are Not Available">
        <ul className="list-disc ml-6 space-y-2">
          
          <li>Dissatisfaction with style or tone</li>
          <li>After full summary has been accessed</li>
        </ul>
      </Section>

      <Section title="4. Cancellation">
        <p>
          You may cancel use of the service at any time. However, completed
          purchases are not reversible once the summary has been delivered.
        </p>
      </Section>

      <Section title="5. How to Request a Refund">
        <p>
          To request a refund, contact support at:
        </p>
        <p className="mt-2 font-medium">
          help@preci.co.za
        </p>
      </Section>

      <Section title="6. Processing Time">
        <p>
          Refund requests are reviewed within 2–5 business days.
        </p>
      </Section>

      <Section title="7. Chargebacks">
        <p>
          If a chargeback is filed, we may provide proof of service delivery,
          including access logs and generated summaries.
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  );
}