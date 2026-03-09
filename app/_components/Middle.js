import Hero from "./Hero"
import UploadContainer from "./UploadContainer"

function Middle({data}) {
    return (
        <div className="flex flex-col min-h-screen 
        items-center justify-center ">
              <Hero data={data}/>
      <UploadContainer/>
        </div>
    )
}

export default Middle
