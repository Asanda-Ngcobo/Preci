'use client'

import { LogOut } from '@deemlol/next-icons'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { createClient } from '@/app/_lib/supabase/client'
import { useRouter } from 'next/navigation'

function formatFromEmail(email) {
  if (!email) return null
  return email
    .split('@')[0]
    .replace(/[._]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function Profile({ data }) {
  const [showProfile, setShowProfile] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if (!data) return null

  const { full_name, name, avatar_url, email } = data.user_metadata ?? {}

  // Previously this was `full_name || name ? full_name || name.split('@')...`
  // — operator precedence made `.split` bind only to `name`, so it silently
  // broke whenever `name` was undefined or didn't contain "@". This is the
  // intended fallback chain: full_name -> name -> formatted email -> "User".
  const displayName = full_name || name || formatFromEmail(email) || 'User'

  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')

  function toggleProfile() {
    setShowProfile((prev) => !prev)
  }

  const logout = () => {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/')
    })
  }

  const Avatar = ({ size = 40 }) =>
    avatar_url ? (
      <Image
        src={avatar_url}
        alt=""
        width={size}
        height={size}
        className="rounded-full"
      />
    ) : (
      <div
        className="bg-(--accent-primary) rounded-full flex justify-center items-center text-white text-sm font-medium shrink-0"
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    )

  return (
    <>
      {showProfile && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-40"
          onClick={toggleProfile}
          role="presentation"
        >
          <div
            className="flex flex-col gap-3 bg-white shadow-2xl items-center justify-center
              w-[85%] max-w-xs p-6 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <Avatar size={48} />

            <div className="text-center">
              <div className="font-medium text-gray-900">{displayName}</div>
              {email && <div className="text-xs text-(--text-secondary)">{email}</div>}
            </div>

            <button
              type="button"
              onClick={!isPending ? logout : undefined}
              disabled={isPending}
              className={`flex items-center gap-2 py-2 px-4 rounded-md w-full justify-center
                hover:bg-gray-100 transition-colors
                ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <LogOut size={18} />
              {isPending ? 'Logging out…' : 'Log out'}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggleProfile}
        className="w-full py-3 px-4 flex gap-3 items-center hover:bg-gray-50 transition-colors"
      >
        <Avatar />
        <span className="text-sm font-medium text-gray-800 truncate">{displayName}</span>
      </button>
    </>
  )
}

export default Profile
