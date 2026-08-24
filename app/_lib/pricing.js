export function calculatePrice(tokens, contractType) {
  const baseCost = tokens * 0.002; //ZAR rate

  const highRisk =
    contractType.includes("car") || contractType.includes("home");

  const markup = highRisk ? 2.0 : 1.0;

  return Number((baseCost * (1 + markup)).toFixed(2));
}
