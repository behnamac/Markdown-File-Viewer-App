"use client";

import { useRef, useState, useCallback } from "react";

interface FileDropZoneProps {
  onFileLoad: (content: string, fileName: string) => void;
  onError?: (message: string) => void;
}

export function FileDropZone({ onFileLoad, onError }: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidFile = (file: File) => {
    return (
      file.name.endsWith(".md") || file.name.endsWith(".markdown")
    );
  };

  const handleFile = useCallback(
    (file: File) => {
      if (!isValidFile(file)) {
        onError?.("Please upload a .md or .markdown file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          onFileLoad(content, file.name);
          onError?.("");
        }
      };
      reader.onerror = () => {
        onError?.("Failed to read file");
      };
      reader.readAsText(file);
    },
    [onFileLoad, onError]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    e.target.value = "";
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        flex min-h-[200px] cursor-pointer flex-col items-center justify-center
        rounded-lg border-2 border-dashed transition-colors
        ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".md,.markdown"
        onChange={handleInputChange}
        className="hidden"
      />
      <svg
        className="mb-3 h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="mb-1 text-sm font-medium text-gray-600">
        Drop your .MD file here or click to browse
      </p>
      <p className="text-xs text-gray-500">Supports .md and .markdown files</p>
    </div>
  );
}
