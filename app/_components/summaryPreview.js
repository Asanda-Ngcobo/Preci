


import FullSummary from "./FullSummary";
import Preview from "./Preview";


export default async function SummaryPreview({ summary,profile }) {
  
  const {contract_type, summary_preview, full_summary,
     price_zar, is_paid, id, paid} = summary;
  
  return (
    <>
   <h2 className="text-lg font-semibold mb-4 sticky top-4 z-10 pb-2">
        {contract_type}
      </h2>
           

             <div className="rounded-2xl p-6 flex flex-col
     justify-center items-center
    
    md:w-[70%]  my-auto mx-auto">
      
    
      
     
{!paid ? <Preview
contract_type={contract_type}
price_zar={price_zar}
summary_preview={summary_preview}
paid={is_paid}
summaryId={id}
user={profile}/> : <FullSummary
full_summary={full_summary}
contract_type={contract_type}/>}
     
    </div>
            </>
   
  );
}
