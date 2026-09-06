"use client";

import React, { useRef } from "react";
import CopyButton from "./CopyButton";
import PdfConvert from "./PdfConvert";
import { markdownComponents } from "./CodeBlock";
import { CopyModal } from "./CopyModal";
import { jsPDF } from "jspdf";
import ReactMarkdown, { type Components } from "react-markdown";

const ReviewResult = ({ result }: { result: string }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [showCopyModal, setShowCopyModal] = React.useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!result || !isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowCopyModal(true);

    timeoutRef.current = setTimeout(() => {
      setShowCopyModal(false);
    }, 1500);
  };

  const pdfConvert = () => {
    const doc = new jsPDF();
    doc.text(result, 10, 10);
    doc.save("result.pdf");
  };

  return (
    <div className="w-full max-w-3xl mt-8 p-6 bg-white rounded-2xl shadow-2xl border border-slate-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[85vh] overflow-auto z-50 text-slate-900">
      <button
        type="button"
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer text-lg font-bold shadow-sm"
        onClick={handleClose}
      >
        &times;
      </button>

      <h2 className="text-2xl font-extrabold mb-6 text-slate-900 tracking-wide">
        Review Result
      </h2>

      <div className="prose max-w-none text-slate-700 text-left bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6 shadow-inner">
        <ReactMarkdown components={markdownComponents as Components}>
          {result}
        </ReactMarkdown>
      </div>

      <div className="flex gap-3 items-center pt-3 border-t border-slate-200">
        <CopyButton onClick={copyToClipboard} />
        <PdfConvert onClick={pdfConvert} />
      </div>

      {showCopyModal && (
        <div className="fixed bottom-6 right-6 z-50">
          <CopyModal />
        </div>
      )}
    </div>
  );
};

export default ReviewResult;