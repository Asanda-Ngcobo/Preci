export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-foreground">
      <h1 className="text-3xl font-semibold mb-2">
        Preci – Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: 31 March 2026
      </p>

      <Section title="1. Our Commitment to Your Privacy">
        <p>
          Preci complies with the Protection of Personal Information Act
          (POPIA) of South Africa.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <ul className="list-disc ml-6 space-y-2">
          <li>Email and account data</li>
          <li>Uploaded documents (temporary)</li>
          <li>Generated summaries</li>
          <li>Usage data</li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Information">
        <ul className="list-disc ml-6 space-y-2">
          <li>Provide and improve the service</li>
          <li>Generate summaries</li>
          <li>Process payments</li>
          <li>Ensure security</li>
        </ul>
      </Section>

      <Section title="4. Document Handling">
        <ul className="list-disc ml-6 space-y-2">
          <li>Documents processed temporarily</li>
          <li>Not stored permanently</li>
          <li>Deleted after processing</li>
        </ul>
      </Section>

      <Section title="5. Use of Artificial Intelligence">
        <p>
          We use third-party AI providers to generate summaries securely.
        </p>
      </Section>

      <Section title="6. Data Sharing">
        <p>
          Data is shared only with essential service providers or when required
          by law.
        </p>
      </Section>

      <Section title="7. Data Security">
        <p>
          We implement encryption, authentication, and access controls to
          protect your data.
        </p>
      </Section>

      <Section title="8. Data Retention">
        <p>
          Data is retained only as long as necessary to provide the service.
        </p>
      </Section>

      <Section title="9. Your Rights Under POPIA">
        <ul className="list-disc ml-6 space-y-2">
          <li>Access your data</li>
          <li>Request correction or deletion</li>
          <li>Object to processing</li>
        </ul>
      </Section>

      <Section title="10. Children’s Privacy">
        <p>Preci is not intended for users under 18.</p>
      </Section>

      <Section title="11. Changes to This Policy">
        <p>We may update this policy and will notify users of changes.</p>
      </Section>

      <Section title="12. Contact Us">
        <p>Email: help@preci.co.za</p>
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