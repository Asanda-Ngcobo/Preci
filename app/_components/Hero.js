import Heading from "./Heading"
import UploadContainer from "./UploadContainer"


function Hero({data, params}) {
    return (
        <div className="text-center">
          
            <Heading data={data} params={params}/>
          
        </div>
    )
}

export default Hero
