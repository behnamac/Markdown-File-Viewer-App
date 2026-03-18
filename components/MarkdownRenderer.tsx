"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-3 mt-4 break-words text-2xl font-bold text-gray-900 sm:mb-4 sm:mt-6 sm:text-3xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-2 mt-4 break-words text-xl font-bold text-gray-900 sm:mb-3 sm:mt-6 sm:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-3 break-words text-lg font-bold text-gray-900 sm:mt-4 sm:text-xl">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-2 mt-3 break-words text-base font-bold text-gray-900 sm:mt-4 sm:text-lg">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="mb-2 mt-3 text-sm font-bold text-gray-900 sm:text-base">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="mb-2 mt-2 text-sm font-bold text-gray-900">{children}</h6>
  ),
  p: ({ children }) => (
    <p className="mb-3 break-words text-[15px] leading-7 text-gray-700 sm:mb-4 sm:text-base">
      {children}
    </p>
  ),
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="mb-4 ml-4 list-disc space-y-1 pl-1 text-[15px] text-gray-700 sm:ml-6 sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-4 list-decimal space-y-1 pl-1 text-[15px] text-gray-700 sm:ml-6 sm:text-base">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="text-sm text-gray-100" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-4 max-w-full overflow-x-auto rounded-lg bg-gray-900 p-3 text-[13px] sm:p-4 sm:text-sm [-webkit-overflow-scrolling:touch]">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-4 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-100">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-gray-200">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="whitespace-nowrap border border-gray-300 px-2 py-2 text-left text-xs font-semibold text-gray-900 sm:px-4 sm:text-sm">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-300 px-2 py-2 text-xs text-gray-700 sm:px-4 sm:text-sm">
      {children}
    </td>
  ),
  hr: () => <hr className="my-6 border-gray-200" />,
};

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
