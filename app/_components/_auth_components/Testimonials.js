'use client'
import { useEffect, useState } from 'react'
import Sfiso from '@/public/Sfiso.jpg'
import Katlego from '@/public/Katlego.jpg'
import Mandisa from '@/public/Mandisa.jpg'
import Rudzani from '@/public/Rudzani.jpg'
import Lebo from '@/public/Lebo.jpg'
import Emmanuel from '@/public/Emmanuel.jpg'
import Image from 'next/image'

function Testimonials() {
  const testimonies = [
    {
      id: crypto.randomUUID(),
      name: 'Sfiso',
      picture: Sfiso,
      testimony: `
In 2021, I signed a 24-month WiFi contract to help build my credit score as I was entering the workforce.
After the contract ended, the monthly debit orders did not stop.

When I called customer support, I was told the contract automatically renews unless I cancel it within
20 days before the end date. This condition was never explained to me when I signed the agreement.
      `
    },
    {
      id: crypto.randomUUID(),
      name: 'Mandisa',
      picture: Mandisa,
      testimony: `
I joined a gym after being promised I could cancel anytime.
Six months later, I tried to cancel and was told
 I had signed a 24-month contract with penalties.

The cancellation fee was almost the same as finishing the contract.
I later found the clause buried deep in the agreement I never read.
      `
    },
    {
      id: crypto.randomUUID(),
      name: 'Rudzani',
      picture: Rudzani,
      testimony: `
I signed a personal loan agreement after being told the interest rate was "low and manageable."
Only after a few months did I realise most of my payments were going toward interest, not the loan itself.

The final amount I had to repay was almost double what I borrowed.
All of this was in the fine print.
      `
    },
    {
      id: crypto.randomUUID(),
      name: 'Lebo',
      picture: Lebo,
      testimony: `
I rented an apartment after being told utilities were included.
After moving in, I started receiving separate bills for water, electricity, and refuse.

The lease stated utilities were excluded — a detail I missed because I trusted the agent and didn’t read the full contract.
      `
    },
    {
  id: crypto.randomUUID(),
  name: 'Emmanuel',
  picture: Emmanuel,
  testimony: `
I took out an insurance policy after being assured it offered “full cover.”
When I later tried to submit a claim, 
it was rejected due to multiple exclusions I had never been told about.

The insurer said the exclusions were listed in the policy document.
None of these conditions were explained to me by the salesperson at the time of signing.
  `
}
,
    {
      id: crypto.randomUUID(),
      name: 'Katlego',
      picture: Katlego,
      testimony: `
In 2023, I took out a phone contract that included insurance.
A year later, I discovered I was paying for two separate insurance policies on the same device.

When I contacted customer support, they claimed I had agreed to it in the contract.
The salesperson never mentioned multiple insurance policies during the sale.
      `
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonies.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [testimonies.length])

  const current = testimonies[currentIndex]

  return (
    <div className="w-[90%] mx-auto h-full md:w-[50%] md:mx-0 md:h-[72vh]  md:flex
     items-center justify-center bg-(--accent-primary)">
      <div className="max-w-lg text-white p-8 transition-all duration-700 ease-in-out">
        {current.picture && (
          <Image
            src={current.picture.src}
            alt={current.name}
            width={150}
            height={150}
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />
        )}

        <p className="text-xs md:text-lg leading-relaxed whitespace-pre-line">
          {current.testimony.trim()}
        </p>

        <p className="mt-6 font-semibold text-md opacity-80">
          — {current.name}
        </p>
      </div>
    </div>
  )
}

export default Testimonials
