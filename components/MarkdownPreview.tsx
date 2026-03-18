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
    <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {fileName && (
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
          <p className="text-sm font-medium text-gray-600">{fileName}</p>
        </div>
      )}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
        <article className="max-w-none">
          <MarkdownRenderer content={content} />
        </article>
      </div>
      <ScrollToTopButton scrollContainerRef={scrollRef} />
    </div>
  );
}
