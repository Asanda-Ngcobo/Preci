'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMenu } from "../providers/MenuProvider";
import { X } from "@deemlol/next-icons";

const links = [
  { href: "/about",      label: "About"      },
  { href: "/blog/car",       label: "Car Finance"},
    { href: "/blog/housing",       label: "Housing"},
      { href: "/blog/insurance",       label: "Insurance"},
        { href: "/blog/loan",       label: "Personal Loan"},
  { href: "/contact-us", label: "Contact us" },
];

function MobileMenu() {
  const { toggleMenu, menuOpen } = useMenu();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.classList.toggle("overflow-hidden", menuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen, mounted]);

  if (!mounted || !menuOpen) return null;

  return (
    <div className="absolute top-25 
    left-1/2 -translate-x-1/2 w-full h-screen z-40 bg-white px-6 py-4 text-[#4B4B4B] flex flex-col">

      <div className="w-[80%] mx-auto my-3 flex justify-between items-center py-8">
        <Link href="/" onClick={toggleMenu}>
          <h2 className="font-sans text-(--accent-primary) font-bold text-3xl">
            Préci
          </h2>
        </Link>
        <button
          onClick={toggleMenu}
          aria-label="Close menu"
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <X />
        </button>
      </div>

      <nav>
        <ul className="flex flex-col gap-10 w-[80%] mx-auto">
          {links.map(({ href, label }) => (
            <li key={href} className="p-3 hover:bg-gray-100  transition border-b border-gray-300">
              <Link href={href} >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}

export default MobileMenu;