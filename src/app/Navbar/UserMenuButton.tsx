import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import Image from "next/image";
import ProfilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

interface UserMenuButtonProps {
  user: KindeUser | null;
}

export default function UserMenuButton({ user }: UserMenuButtonProps) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm btn-ghost btn-circle avatar"
      >
        {user ? (
          <Image
            src={user.picture || ProfilePicPlaceholder}
            alt={user.id}
            width={50}
            height={50}
            className="w-4 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        )}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href={"/profile"} className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          {user ? (
            <LogoutLink className="justify-between">Log out</LogoutLink>
          ) : (
            <LoginLink className="justify-between">Log in</LoginLink>
          )}
        </li>
      </ul>
    </div>
  );
}
