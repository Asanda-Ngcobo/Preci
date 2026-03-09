
export default function AccordionItem({ question, explanation, index, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer 
       transition-all"
    >
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-lg font-bold w-10">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </p>
        <p className="flex-1 text-md
         px-4">{question}</p>
        <span className="text-2xl font-bold
        text-(--accent-primary)">{isOpen ? '−' : '+'}</span>
      </div>

      {isOpen && (
        <div className="mt-4 
  
        text-base text-gray-600 font-medium leading-relaxed">
          {explanation}
        </div>
      )}
    </div>
  );
}