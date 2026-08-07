import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-screen h-screen flex flex-col
     justify-center items-center bg-amber-300'>
      <div>
    <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <button > <Link href="/">Return Home</Link></button>
      </div>
  
     
    </div>
  )
}