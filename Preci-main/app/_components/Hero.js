import Heading from "./Heading";
import UploadContainer from "./UploadContainer";

// ✅ Not async — no await needed here
function Hero({ data, params }) {
  return (
    <div className="text-center">
      <Heading data={data} params={params} />
    </div>
  );
}

export default Hero;