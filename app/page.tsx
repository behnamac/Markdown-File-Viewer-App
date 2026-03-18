"use client";

import { useState, useCallback } from "react";
import { FileDropZone, type LoadedMdFile } from "@/components/FileDropZone";
import { MarkdownPreview } from "@/components/MarkdownPreview";

type MdFileEntry = LoadedMdFile & { id: string };

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export default function Home() {
  const [files, setFiles] = useState<MdFileEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleFilesLoad = useCallback((loaded: LoadedMdFile[]) => {
    const withIds: MdFileEntry[] = loaded.map((f) => ({
      ...f,
      id: createId(),
    }));

    setFiles((prev) => [...prev, ...withIds]);
    setActiveId((current) => {
      if (withIds.length === 0) return current;
      if (!current) return withIds[0].id;
      return current;
    });
  }, []);

  const activeFile = files.find((f) => f.id === activeId) ?? null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="min-w-0 truncate text-xl font-semibold text-gray-900">
          Markdown File Viewer
        </h1>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label="Refresh page"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
        <div aria-hidden className="min-w-0" />
      </header>

      <main className="flex flex-1 flex-col gap-6 p-6 md:flex-row">
        <section className="flex min-h-0 flex-col md:w-80 md:shrink-0">
          <h2 className="mb-3 text-sm font-medium text-gray-600">
            Upload files
          </h2>
          <FileDropZone onFilesLoad={handleFilesLoad} onError={setError} />
          {error && (
            <p className="mt-2 text-sm text-amber-700">{error}</p>
          )}

          {files.length > 0 && (
            <div className="mt-4 flex min-h-0 flex-1 flex-col">
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                Your files ({files.length})
              </h3>
              <ul className="max-h-[min(50vh,28rem)] space-y-1 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                {files.map((f) => (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(f.id)}
                      className={`w-full truncate rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                        activeId === f.id
                          ? "bg-blue-100 font-medium text-blue-900 ring-1 ring-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      title={f.name}
                    >
                      {f.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="flex min-h-0 flex-1 flex-col">
          <h2 className="mb-3 text-sm font-medium text-gray-600">Preview</h2>
          {activeFile ? (
            <MarkdownPreview
              content={activeFile.content}
              fileName={activeFile.name}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-white">
              <p className="text-gray-500">
                Drop .MD files here or click to browse, then select a file to
                preview
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
