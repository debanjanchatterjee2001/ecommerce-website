import { formatPrice } from "@/lib/format";

interface PriceTagProps {
  price: bigint;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return (
    <span className={`badge badge-accent shadow-md ${className}`}>
      {formatPrice(price)}
    </span>
  );
}
