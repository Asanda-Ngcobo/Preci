'use client'

import { X } from "@deemlol/next-icons"
import Link from "next/link"
import Profile from "./Profile"
import { useMenu } from "../providers/MenuProvider"

function SideBar({ data, userSummaries }) {
  const { menuOpen, setMenuOpen } = useMenu()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      {/* Backdrop so tapping outside the drawer closes it on mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/*
        h-screen (not h-full) is what actually guarantees the sidebar
        occupies the full viewport height regardless of what ancestors
        do — h-full needs every parent to have a resolved height, which
        is easy to break by accident. flex-col + a flex-1 scroll region
        + a shrink-0 footer is the same structure Claude's own sidebar
        uses: content scrolls, profile never moves.
      */}
      <aside
        className={`
          md:flex md:w-64 w-[75%] max-w-xs
          h-screen fixed md:sticky md:top-0 top-0 left-0
          flex-col bg-white z-30 md:z-0
          shadow-xl md:shadow-none
          transition-transform duration-300
          ${menuOpen ? 'flex translate-x-0' : 'hidden md:flex -translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header — fixed height, never scrolls */}
        <div className="px-4 pt-4 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-(--accent-primary) font-bold md:text-2xl text-lg">
              Préci
            </h2>
            <button
              type="button"
              className="md:hidden"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>

          <div className="mt-10 text-sm font-medium text-(--text-secondary)">
            Your Summaries
          </div>
        </div>

        {/*
          Scroll region: flex-1 claims all leftover height between the
          header and the profile footer. min-h-0 is required — without
          it, a flex child won't shrink below its content size, so
          overflow-y-auto silently does nothing and the whole sidebar
          (profile included) scrolls instead of just this list.
        */}
        <ul className="flex-1 min-h-0 overflow-y-auto px-4 py-4 flex flex-col gap-1">
          {userSummaries.length === 0 && (
            <li className="text-xs text-(--text-secondary) py-2">
              No summaries yet.
            </li>
          )}

          {userSummaries.map((summary) => {
            const date = new Date(summary.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })

            return (
              <li key={summary.id} className="text-xs">
                <Link
                  href={`/users/${summary.id}`}
                  onClick={closeMenu}
                  className="flex flex-col py-2 px-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="truncate font-medium text-gray-800">
                    {summary.contract_type}
                  </span>
                  <span className="text-(--text-secondary)">{date}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/*
          Profile footer: shrink-0 stops it from being compressed by
          the flex layout, and being the last item in a flex-col + h-screen
          parent is what pins it visually to the bottom — no scrolling
          ever required to reach it.
        */}
        <div className="shrink-0 border-t border-gray-100 bg-white">
          <Profile data={data} />
        </div>
      </aside>
    </>
  )
}

export default SideBar
