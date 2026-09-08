"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, CheckCircle, X } from "lucide-react";

interface FileUploadProps {
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  maxFiles = 3,
  accept = ".pdf,.docx,.xlsx,.doc",
  className = "",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      setFiles(droppedFiles);
      if (onChange) onChange(droppedFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).slice(0, maxFiles);
      setFiles(selectedFiles);
      if (onChange) onChange(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 overflow-hidden group ${
          isDragging
            ? "border-amber-400 bg-amber-500/10 scale-[0.99]"
            : "border-white/15 bg-white/[0.02] hover:border-amber-500/40 hover:bg-white/[0.04]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleFileInput}
        />

        {/* Ambient grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all"
          >
            <UploadCloud className="w-6 h-6" />
          </motion.div>

          <div>
            <p className="text-sm font-semibold text-white/90">
              Перетягніть заявку чи штатний розпис
            </p>
            <p className="text-xs text-white/40 mt-1 font-mono">
              PDF, DOCX, XLSX до 25 МБ (до {maxFiles} файлів)
            </p>
          </div>

          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Пряме завантаження в B2B аналізатор
          </span>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 space-y-2"
        >
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white/80"
            >
              <div className="flex items-center space-x-2 truncate">
                <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate max-w-[200px] font-mono">{file.name}</span>
                <span className="text-[10px] text-white/40 font-mono">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className="text-white/40 hover:text-rose-400 transition-colors p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
