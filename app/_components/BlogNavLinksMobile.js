'use client';


import Link from "next/link";
import { usePathname } from "next/navigation";


const navLinks = [
  {
    name: 'All',
    href: '/blog',
    exact: true,
   
  },
  {
    name: 'Car',
    href: '/blog/car',
    exact: false,
   
  },
    {
    name: 'Housing',
    href: '/blog/housing',
    exact: false,
  
  },
  {
    name: 'Phone',
    href: '/blog/phone',
    exact: false,
  
  },
  {
    name: 'Credit',
    href: '/blog/credit',
    exact: false,
  
  },

    {
    name: 'Gym',
    href: '/blog/gym',
    exact: false,
  
  },
]

export default function BlogNavLinksMobile() {
  const pathname = usePathname()

  return (
    <div>
      <nav className=" w-full flex overflow-x-auto no-scrollbar m-2
      items-center justify-center font-(--font-sans) lg:hidden">
        <ul className="flex text-center w-full ">
          {navLinks.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href)

            return (
              <li
                key={link.name}
                className="px-4 cursor-pointer py-2 rounded-3xl transition"
              >
                <Link
                  href={link.href}
                  className={`px-4 cursor-pointer py-2 transition rounded-2xl 
                    ${isActive ? ' bg-(--accent-primary) ' : 'bg-(--accent-secondary)'}`}
                >
             
                  <span>{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

     
    </div>
  )
}

