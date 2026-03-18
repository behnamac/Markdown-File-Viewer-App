"use client";

import { useRef, useState, useCallback } from "react";

export type LoadedMdFile = { name: string; content: string };

interface FileDropZoneProps {
  onFilesLoad: (files: LoadedMdFile[]) => void;
  onError?: (message: string) => void;
}

function readFileAsText(file: File): Promise<LoadedMdFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({ name: file.name, content: reader.result as string });
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsText(file);
  });
}

export function FileDropZone({ onFilesLoad, onError }: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidFile = (file: File) =>
    file.name.endsWith(".md") || file.name.endsWith(".markdown");

  const processFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const all = Array.from(fileList);
      const valid = all.filter(isValidFile);
      const skipped = all.length - valid.length;

      if (valid.length === 0) {
        if (all.length > 0) {
          onError?.("Please upload .md or .markdown files only");
        }
        return;
      }

      if (skipped > 0) {
        onError?.(
          `${skipped} file(s) skipped (not .md/.markdown). Loaded ${valid.length}.`
        );
      }

      try {
        const results = await Promise.all(valid.map(readFileAsText));
        onFilesLoad(results);
        if (skipped === 0) {
          onError?.("");
        }
      } catch {
        onError?.("Failed to read one or more files");
      }
    },
    [onFilesLoad, onError]
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
    void processFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (list?.length) {
      void processFiles(list);
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
        flex min-h-[9.5rem] cursor-pointer touch-manipulation flex-col items-center
        justify-center rounded-lg border-2 border-dashed px-3 py-4 transition-colors
        active:bg-gray-100 sm:min-h-[180px] md:min-h-[200px] md:px-4 md:py-6
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
        multiple
        onChange={handleInputChange}
        className="hidden"
      />
      <svg
        className="mb-2 h-9 w-9 shrink-0 text-gray-400 sm:mb-3 sm:h-10 sm:w-10 md:h-12 md:w-12"
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
      <p className="mb-1 max-w-[16rem] text-center text-xs font-medium leading-snug text-gray-600 sm:max-w-none sm:text-sm">
        Drop .MD files here or click to browse
      </p>
      <p className="max-w-[14rem] text-center text-[11px] text-gray-500 sm:max-w-none sm:text-xs">
        Multiple .md / .markdown files supported
      </p>
    </div>
  );
}
