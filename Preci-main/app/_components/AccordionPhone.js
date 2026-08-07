'use client'

import { useState } from 'react';
import AccordionItem from './AccordionItem';
import Loggin from "@/public/Loggin.png"
import Upload from "@/public/Upload.png"
import Processing from "@/public/Processing.png"
import Summary from "@/public/Phone Straight.png"
import Payment from "@/public/Phone preview.png"
const data = [
  {
    image: Loggin,
    question: 'Create an account or sign in',
    explanation: 'Sign up or log in using Google (recommended) or your email and password.',
    id: 1,
  },
  {
       image: Upload,
    question: 'Upload your contract or agreement',
    explanation: 'Upload your document in PDF format for analysis.',
    id: 2,
  },
  {   image: Processing,
    question: 'Get your document summarized',
    explanation:
      'Click the arrow button to let our AI analyze your document and highlight key clauses, risks, and potential red flags.',
    id: 3,
  },
  {   image: Payment,
    question: 'Complete the payment',
    explanation:
      'Pay based on your document length (for example, a 1,000-word contract).',
    id: 4,
  },
  { image: Summary,
    question: 'Access your summary anytime',
    explanation:
      'Review your summary anytime to better understand the agreement before making a commitment.',
    id: 5,
  },
];


export default function AccordionPhone() {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className=" lg:max-w-[70%] mx-auto my-24 flex flex-col gap-6">
      {data.map((item, index) => (
        <AccordionItem
          key={item.id}
          index={index}
          image={item.image}
          question={item.question}
          explanation={item.explanation}
          isOpen={curOpen === index}
          onToggle={() => setCurOpen(curOpen === index ? null : index)}
        />
      ))}
    </div>
  );
}

