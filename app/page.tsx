"use client";

import { useState } from "react";
import { FileDropZone } from "@/components/FileDropZone";
import { MarkdownPreview } from "@/components/MarkdownPreview";

export default function Home() {
  const [content, setContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFileLoad = (fileContent: string, name: string) => {
    setContent(fileContent);
    setFileName(name);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Markdown File Viewer
        </h1>
      </header>

      <main className="flex flex-1 flex-col gap-6 p-6 md:flex-row">
        <section className="flex flex-col md:w-80 md:shrink-0">
          <h2 className="mb-3 text-sm font-medium text-gray-600">
            Upload a file
          </h2>
          <FileDropZone
            onFileLoad={handleFileLoad}
            onError={setError}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </section>

        <section className="flex min-h-0 flex-1 flex-col">
          <h2 className="mb-3 text-sm font-medium text-gray-600">Preview</h2>
          {content ? (
            <MarkdownPreview content={content} fileName={fileName} />
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white">
              <p className="text-gray-500">
                Drop your .MD file here or click to browse
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
