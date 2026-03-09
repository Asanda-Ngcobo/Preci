import Accordion from "../Accordion";
import { Video } from "../Video";

function MeetPreci() {
  return (
    <section
      id="meet-preci"
      className="w-full bg-gray-50 py-16 px-4"
    >
      <div className="mx-auto max-w-6xl">
        {/* Intro */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Salespeople sell. We explain.
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-base md:text-lg">
            Préci AI breaks down contracts and agreements so you understand the risks, hidden clauses, and cancellation terms — 
            <span className="font-medium"> before you sign.</span>
          </p>
        </div>

        {/* How it works */}
        <div>
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-semibold text-gray-800">
            How it works
          </h2>

          <div className="flex flex-col md:flex-row gap-10 md:gap-8">
            {/* Left column – Video */}
            <div className="md:w-1/2 w-full flex justify-center items-center">
              <div className="w-full md:w-[90%] rounded-md
               shadow-lg overflow-hidden">
                <Video />
              </div>
            </div>

            {/* Right column – Accordion */}
            <div className="md:w-1/2 w-full flex flex-col justify-center">
              <div className=" p-6">
                <Accordion />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeetPreci;