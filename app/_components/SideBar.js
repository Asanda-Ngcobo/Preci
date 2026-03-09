'use client'

import { Book, Search, X } from "@deemlol/next-icons"
import Link from "next/link"
import Profile from "./Profile"
import { useMenu } from "../providers/MenuProvider"

function SideBar({ data, userSummaries }) {
  const { setSearchOpen, setMenuOpen, menuOpen } = useMenu()

  function showSearch() {
    setMenuOpen(prev => !prev)
    setSearchOpen(true)
  }

  return (
    <aside
      className={`
        md:flex md:w-[15%] w-[60%]
        h-screen fixed md:static
        flex-col bg-white z-10 md:z-0
        ${menuOpen ? 'flex' : 'hidden md:flex'}
      `}
    >
      <div className="flex-1 my-4 mx-2">
        <div className="flex flex-row justify-between">
          <h2 className="font-sans text-(--accent-primary) font-bold md:text-2xl text-md">
            Préci
          </h2>
          <div className="md:hidden">
            <X onClick={() => setMenuOpen(prev => !prev)} />
          </div>
        </div>

        <ul className="mt-10 flex flex-col gap-2">
          <li>
            <button
              type="button"
              onClick={showSearch}
              className="flex gap-1 py-2 text-xs cursor-pointer text-(--text-secondary) items-center w-full"
            >
              <Search />
              <span>Search Summary</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex gap-1 text-xs text-(--text-secondary) items-center w-full"
            >
              <Book />
              <span>Your Summaries</span>
            </button>
          </li>
        </ul>

        <ul className="my-3 flex flex-col gap-2">
          {userSummaries.map((summary) => {
            const title = summary.contract_type
            const date = new Date(summary.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })

            return (
              <li
                key={summary.id}
                className="text-xs"
                onClick={() => setMenuOpen(prev => !prev)}
              >
                <Link href={`/users/${summary.id}`} className="cursor-pointer">
                  {title}...{date}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <Profile data={data} />
    </aside>
  )
}

export default SideBar