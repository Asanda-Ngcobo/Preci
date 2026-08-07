import Image from "next/image";

export default function AccordionItem({
  question,
  explanation,
  index,
  isOpen,
  onToggle,
  image,
}) {
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer transition-all  "
    >
      <div className="flex items-center justify-between p-4">
        <p className="w-10 text-lg font-bold text-gray-400">
          {String(index + 1).padStart(2, "0")}
        </p>

        <div className="flex-1 px-4 text-lg font-semibold">
          <p>
            {question}

            {index === 2 && (
              <span className="ml-2 font-semibold text-(--accent-primary)
              text-xs">
                (50% off for August)
              </span>
            )}
          </p>
        </div>

        <span className="text-2xl font-bold text-(--accent-primary)">
          {isOpen ? "−" : "+"}
        </span>
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col-reverse 
        justify-between text-center font-medium leading-relaxed text-gray-600 md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={image}
              alt={question}
              className="mx-auto w-[70%]"
            />
          </div>

          <div className="flex items-center justify-center md:w-1/2">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
}
