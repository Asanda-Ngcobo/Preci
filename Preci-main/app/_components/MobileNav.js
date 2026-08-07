'use client';
import Link from "next/link";

import { useEffect, useState } from "react";
import { useMenu } from "../providers/MenuProvider";
import { ChevronRight, Phone, PhoneOutgoing, Smile, X } from "@deemlol/next-icons";
import Discount from "./Discount";
import SocialAuth from "./_auth_components/SocialAuth";

const links = [
 
  { href: "/blog/car",       label: "Car Finance"},
    { href: "/blog/housing",       label: "Housing"},
      { href: "/blog/insurance",       label: "Insurance"},
        { href: "/blog/loan",       label: "Personal Loan"},
         { href: "/blog/phone",       label: "Phone & WiFi"},

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
    <div className="fixed top-0
    left-1/2 -translate-x-1/2 w-full h-screen 
    z-40 bg-white px-6 py-4 text-[#4B4B4B] flex flex-col">
   <Discount/>
      <div className="w-[80%] mx-auto my-3 
      flex justify-between items-center py-8">
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

      <nav className="mt-10 py-1 ">
        <ul className="flex flex-col gap-10 w-[80%] mx-auto">
          {links.map(({ href, label }) => (
            <li key={href} className="flex justify-between
             items-center
             hover:bg-gray-100  transition active:text-2xl"
              >
              <Link href={href} >
                {label}
              </Link>
              <ChevronRight/>
            </li>
          ))}
        </ul>
      </nav>
     
      <ul className="flex justify-between mt-10  w-[80%] mx-auto">
        <li className="w-1/2 "><Link href='/about' className="gap-2 flex active:text-2xl"><Smile/> About</Link> </li>
         <li className="w-1/2"><Link href='/contact-us' className="gap-2 flex active:text-2xl"> <PhoneOutgoing/> Contact us</Link></li>
      </ul>

     <SocialAuth/>
    </div>
  );
}

export default MobileMenu;