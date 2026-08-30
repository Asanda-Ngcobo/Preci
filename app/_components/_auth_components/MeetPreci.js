import Accordion from "../Accordion";
import { Video } from "../Video";
import Testimonials from "./Testimonials";

function MeetPreci() {
  return (
    <section
      id="meet-preci"
      className="w-full bg-gray-50 pb-16 px-4 md:pt-30"
    >
      <div className="mx-auto max-w-6xl">
        {/* Intro */}
        <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
      We've helped South Africans avoid
      <span className="text-(--accent-primary)"> hundreds of rands </span>
      in hidden costs
    </h1>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-base md:text-lg">
            Préci breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms, 
            <span className="font-medium">{" "}
              before they cost you hundreds of rands.</span>
          </p>
       
        </div>
       
   
      
         

          <div className="flex flex-col  gap-5 md:gap-8">
        
            <div className=" w-full flex flex-col justify-center">
              <div className=" py-6">
                <Accordion />
              </div>
            </div>
          </div>
        </div>
  
      {/* <Testimonials/> */}
    </section>
  );
}

export default MeetPreci;
