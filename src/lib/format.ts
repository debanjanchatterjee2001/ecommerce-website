export function formatPrice(price: bigint) {
  return (Number(price) * 1000).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatPriceCartDropdown(price: number) {
  return (price * 1000).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  });
}
