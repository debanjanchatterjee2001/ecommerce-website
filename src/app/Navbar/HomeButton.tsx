import Link from "next/link";
import Image from "next/image";
import animatedLogo from "@/assets/animated-logo.gif";

export default function HomeButton() {
  return (
    <div className="join-horizontal flex-1">
      <Link href="/" className="btn btn-ghost text-2xl font-bold">
        <Image
          src={animatedLogo}
          height={50}
          width={50}
          alt="Brand logo"
          unoptimized={true}
        />
        Roadio
      </Link>
    </div>
  );
}
