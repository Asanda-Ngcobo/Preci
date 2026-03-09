'use client'
import { ArrowRight, Plus } from "@deemlol/next-icons"
import { useState } from "react"
import UploadOptions from "./UploadOptions"
import { useMenu } from "../providers/MenuProvider";
import { useRouter } from "next/navigation";




function UploadContainer() {
   const {file} = useMenu();
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState("idle");

    function handleUpload (){
  setOpen(prev => !prev)
    }
    const router = useRouter();

// async function handleProcess() {
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const res = await fetch("/api/process-contract", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     // 🔴 HANDLE API ERRORS HERE
//     if (!res.ok) {
//       // Show user-friendly message (not console error)
//       alert(data.error); // replace with toast later
//       return;
//     }

//     // ✅ Success
//     router.push(`/users/${data.summaryId}`);

//   } catch (err) {
//     console.error("Unexpected error:", err);
//     alert("Something went wrong. Please try again.");
//   }
// }

async function handleProcess() {
  if (!file) return;

  setStatus("reading");

  const formData = new FormData();
  formData.append("file", file);

  try {
    // Slight delay so UI feels responsive
    await new Promise(res => setTimeout(res, 600));

    setStatus("summarizing");

    const res = await fetch("/api/process-contract", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("idle");
      setError(data.error);
      return;
    }

    setStatus("saving");

    // Small delay before redirect (feels intentional)
    setTimeout(() => {
      router.push(`/users/${data.summaryId}`);
    }, 700);

  } catch (err) {
    setStatus("idle");
    setError("Something went wrong. Please try again.");
  }
}

    return (

      <>
       <div className="border border-(--text-secondary) rounded-3xl
          h-12 w-[90%] md:w-[60%] mx-auto mt-40 " >
             {open && <UploadOptions remove={handleUpload}/>}

            

          <div className="flex flex-row items-center justify-between mx-2 h-12">
  
  {/* Plus button */}
  <button
    onClick={handleUpload}
    className={`
      flex items-center justify-center
      h-8 w-8 rounded-full
      cursor-pointer
      hover:bg-(--text-secondary)
      ${open ? 'bg-(--text-secondary)' : ''}
    `}
  >
    <Plus />
  </button>

  {/* Arrow button */}
  <button
  disabled={!file}
  onClick={handleProcess}
    className={`
       flex items-center justify-center
      h-8 w-12 rounded-2xl
      cursor-pointer
  
      ${!file ? 'bg-gray-400': `bg-(--accent-primary)
      hover:bg-(--accent-secondary)`    }`}
     
    
  >
    <ArrowRight />
  </button>

</div>

           
        </div>
       {status !== "idle" && (
  <div className=" rounded-2xl w-full
  h-full top-0 left-0
  absolute flex flex-col justify-center
   items-center  z-20
   bg-white p-4 text-sm text-gray-700">
    <p className={status === "reading" ? "font-medium" : ""}>
      {status !== "idle" && "✓ Document uploaded"}
    </p>
    <p className={status === "summarizing" ? "font-medium text-(--accent-secondary)" : ""}>
      Understanding the contract
    </p>
    <p className={status === "saving" ? "font-medium text-(--accent-secondary)" : ""}>
      Preparing your summary
    </p>
  </div>
)}
</>
       
    )
}

export default UploadContainer
