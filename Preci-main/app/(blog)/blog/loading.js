function loading() {
    return (
        <div className="absolute w-screen  h-screen backdrop-blur-sm
        bg-white flex justify-center items-center z-20 ">
     
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin
       rounded-full h-20 w-20 border-t-4 border-(--accent-primary)"></div>
    </div>

        </div>
    )
}

export default loading
