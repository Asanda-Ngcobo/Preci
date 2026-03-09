'use client'

import { useState } from 'react';
import AccordionItem from './AccordionItem';

const data = [
  {
    question: 'Create an account or sign in',
    explanation: 'Sign up or log in using Google (recommended) or your email and password.',
    id: 1,
  },
  {
    question: 'Upload your contract or agreement',
    explanation: 'Upload your document in PDF format for analysis.',
    id: 2,
  },
  {
    question: 'Get your document summarized',
    explanation:
      'Click the arrow button to let our AI analyze your document and highlight key clauses, risks, and potential red flags.',
    id: 3,
  },
  {
    question: 'Complete the payment',
    explanation:
      'Pay based on your document length (for example, a 1,000-word contract).',
    id: 4,
  },
  {
    question: 'Access your summary anytime',
    explanation:
      'Review your summary anytime to better understand the agreement before making a commitment.',
    id: 5,
  },
];


export default function Accordion() {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="max-w-[90%] lg:max-w-[70%] mx-auto my-24 flex flex-col gap-6">
      {data.map((item, index) => (
        <AccordionItem
          key={item.id}
          index={index}
          question={item.question}
          explanation={item.explanation}
          isOpen={curOpen === index}
          onToggle={() => setCurOpen(curOpen === index ? null : index)}
        />
      ))}
    </div>
  );
}

