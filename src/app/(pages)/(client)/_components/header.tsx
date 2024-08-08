"use client";
import { cn } from "@/lib/utils";
// import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

function Header({}: Props) {
  const pathname = usePathname();
  // const session = useSession();
  // console.log("session", session);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Best Selling", href: "/best-selling" },
    { label: "Offers", href: "/offers" },
    { label: "Orders", href: "/account/orders" },
  ];
  return (
    <>
      <header className="">
        <div className="bg-brown-900 flex h-10 items-center justify-center text-center text-white">
          <span className="text-sm">
            Order 2 Delight Dairy Choco bars today and save ₹100 instantly!
          </span>
        </div>
        <nav className="flex h-14 items-center justify-center">
          <ul className="flex items-center justify-center gap-6">
            {navItems.map((item) => (
              <li
                key={item.href}
                className={cn(
                  "text-brown-300 hover:text-brown-900 underline-offset-4 transition-all hover:cursor-pointer hover:underline",
                  pathname === item.href &&
                    "text-brown-900 font-semibold underline",
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            {/* <li className="text-brown-300 hover:text-brown-900 underline-offset-4 transition-all hover:cursor-pointer hover:underline">
              {session.status === "authenticated" ? (
                <button onClick={() => signOut()}>Logout</button>
              ) : (
                <Link href="/api/auth/signin"> Sign in</Link>
              )}
            </li> */}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
