"use client";

import { useRef } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ScrollToTopButton } from "./ScrollToTopButton";

interface MarkdownPreviewProps {
  content: string;
  fileName?: string;
}

export function MarkdownPreview({ content, fileName }: MarkdownPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {fileName && (
        <div className="shrink-0 border-b border-gray-200 bg-gray-50 px-3 py-2 sm:px-4">
          <p className="truncate text-xs font-medium text-gray-600 sm:text-sm">
            {fileName}
          </p>
        </div>
      )}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-5 md:p-6"
      >
        <article className="max-w-none min-w-0 break-words">
          <MarkdownRenderer content={content} />
        </article>
      </div>
      <ScrollToTopButton scrollContainerRef={scrollRef} />
    </div>
  );
}
