export const metadata = {
  metadataBase: new URL("https://preci.co.za"),

  title: {
    default:
      "Preci | User",
      
    template: "%s | Preci",
  },
}
function page() {

    
    return (
        <div className="w-screen h-screen flex justify-center items-center">

            <h1>Apologies, Preci is currently unavailable in your country</h1>
            
        </div>
    )
}

export default page
