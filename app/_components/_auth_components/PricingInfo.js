function PricingInfo() {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
      <h3 className="mb-1 text-sm font-semibold">
        Simple, usage-based pricing
      </h3>

      <p className="text-xs text-gray-600">
        We charge based on document length — not subscriptions.
      </p>

      <p className="mt-2 text-sm font-medium">
        <span className="font-bold">R5</span> per{" "}
        <span className="font-bold">1,000 words</span>
      </p>

      <p className="mt-1 text-xs text-gray-500">
        You’ll always see the price before you pay.
      </p>
    </div>
  )
}

export default PricingInfo
