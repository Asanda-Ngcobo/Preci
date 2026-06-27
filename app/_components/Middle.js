import Hero from "./Hero"
import UploadContainer from "./UploadContainer"

function Middle({data, params}) {
    return (
        <div className="flex flex-col min-h-screen 
         justify-center ">
              <Hero data={data} params={params}/>
      <UploadContainer user={data}/>
        </div>
    )
}

export default Middle
