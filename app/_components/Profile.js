'use client'

import { LogOut, Settings } from '@deemlol/next-icons'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { createClient } from '@/app/_lib/supabase/client'
import { useRouter } from 'next/navigation'

function Profile({ data }) {
  const [showProfile, setShowProfile] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if(!data) return null
  const { full_name, name, avatar_url, email } = data.user_metadata ?? {};
  

  function handleShowProfile() {
    setShowProfile(prev => !prev)
  }

  const Name = full_name || name
    ? full_name || name
        .split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
    : 'User'

    const initials = Name
  .split(/\s+/)
  .slice(0, 2)
  .map(word => word[0]?.toUpperCase())
  .join('');

  const logout = () => {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/')
    })
  }

  return (
    <>
      {showProfile && (
        <div className="backdrop-blur-md fixed
          w-full h-screen flex justify-center items-center mx-auto rounded-lg z-20 "
               onClick={handleShowProfile}>
          <div className="flex flex-col gap-3 
          bg-background shadow-2xl shadow-gray-500 ml-2 items-center justify-center
          w-[60%] md:w-[30%] h-fit rounded-2xl">
            {avatar_url ? <Image
  src={avatar_url}
  alt="user image"
  width={40}
  height={40}
  className="rounded-full -mt-3"
 
/> : (
  <div className='w-10 h-10 bg-(--accent-primary) rounded-full
  flex justify-center items-center'>
    {initials}
  </div>
)}

            <div>
              <div>{name}</div>
              <div className="text-xs w-full">{email}</div>
            </div>
               <ul className='w-full   flex justify-center items-center'>
            {/* <li className="flex ml-2 gap-5 py-3">
              <Settings /> Settings
            </li> */}

            <li
              onClick={!isPending ? logout : undefined}
              className={`flex mx-10 gap-5 py-3 hover:text-gray-500 ${
                isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <LogOut />
              {isPending ? 'Logging out…' : 'Log out'}
            </li>
          </ul>
          </div>

       
        </div>
      )}

      <div
        className={`${showProfile ? 'w-[90%] ' : 'w-[94%]'} h-[10vh] mx-auto mb-5
          rounded-md bg-background flex gap-3 justify-center items-center cursor-pointer`}
        onClick={handleShowProfile}
      >
    {avatar_url ? <Image
  src={avatar_url}
  alt="user image"
  width={40}
  height={40}
  className="rounded-full"
 
/> : (
  <div className='w-10 h-10 bg-(--accent-primary) rounded-full
  flex justify-center items-center'>
    {initials}
  </div>
)}

        <div>{Name}</div>
      </div>
    </>
  )
}

export default Profile
