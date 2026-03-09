export function calculatePrice(tokens, contractType) {
  const baseCost = tokens * 0.002; // example ZAR rate

  const highRisk =
    contractType.includes("car") || contractType.includes("home");

  const markup = highRisk ? 1.0 : 0.7;

  return Number((baseCost * (1 + markup)).toFixed(2));
}
