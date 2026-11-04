"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUserStore } from "../stores/user-store";
import { User } from "lucide-react";

const routes = [
  { name: "Portfolio & Skills", path: "/portfolio-skills" },
  { name: "Opportunities", path: "/opportunities" },
  { name: "Submitted Bids", path: "/submitted-bids" },
  { name: "Messages", path: "/messages" },
];

const Navbar = () => {
  const pathname = usePathname();

  const user = useUserStore();

  return (
    <nav className="w-full h-14 px-6 py-1 flex items-center justify-between gap-2 select-none border-b border-border-subtle">
      <div className="w-fit h-fit flex items-center justify-center gap-2">
        <span className="font-geist-mono font-semibold text-lg">
          devlopsfolio
        </span>
        <span className="text-text-dimmed">|</span>
        <span className="text-text-dimmed font-geist-mono font-medium tracking-wider text-xs">
          {user.is_client ? "CLIENT" : "DEVELOPER"}
        </span>
      </div>

      <div className="flex items-center justify-center gap-6 w-fit">
        {routes.map((route) => (
          <Link
            key={route.name}
            href={route.path}
            className={`text-sm transition-all duration-300 ${pathname == route.path ? "text-text-secondary font-medium" : "text-text-dimmed hover:text-text-secondary hover:font-medium"}`}
          >
            {route.name}
          </Link>
        ))}
      </div>

      <div className="w-fit h-full flex items-center justify-center gap-2 border border-border-subtle rounded-md bg-surface-elevated px-1 py-2 cursor-pointer hover:bg-surface-hover transition-all duration-300">
        <div className="flex flex-col gap-0.5 items-start justify-center">
          <span className="text-xs font-medium text-text-secondary">
            {user.name ?? "Name"}
          </span>
          <span className="text-xs text-text-dimmed">
            {user.is_client ? "Client" : "Developer"}
          </span>
        </div>

        {user.profile_pic ? (
          <Image
            src={user.profile_pic}
            width={1000}
            height={1000}
            alt="Profile Pic"
            className="w-9 h-9 rounded-md border border-border-subtle"
          />
        ) : (
          <User />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
