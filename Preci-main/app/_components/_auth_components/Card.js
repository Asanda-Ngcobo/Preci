'use client'
function Card({children}) {
    return (
        <div className="w-[90%] mx-auto md:w-[60%] h-[20vh]
         shadow-sm shadow-gray-400">
            {children}
            
        </div>
    )
}

export default Card
