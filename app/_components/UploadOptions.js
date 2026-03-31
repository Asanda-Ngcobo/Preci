"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X } from "@deemlol/next-icons";
import { useMenu } from "../providers/MenuProvider";

function UploadOptions() {
 const {file, setFile} = useMenu();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or image file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="w-60 -mx-5 max-w-sm absolute -mt-40">
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-all
          ${
            isDragging
              ? "border-teal-500 bg-teal-50"
              : "border-gray-300 bg-white hover:border-gray-400"
          }`}
      >
        <div className="flex flex-col items-center text-center gap-2">
          <Upload size={28} className="text-gray-500" />
          <p className="text-sm font-medium text-gray-700">
            Upload a contract
          </p>
          <p className="text-xs text-gray-500">
            Click to upload PDF file
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {/* File Preview */}
      {file && (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-gray-500" />
            <span className="text-xs text-gray-700 truncate max-w-50">
              {file.name}
            </span>
          </div>
          <button
            onClick={() => setFile(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadOptions;
