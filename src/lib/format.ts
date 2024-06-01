export function formatPrice(price: bigint) {
  return (Number(price) * 1000).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
