"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = typeof children === "string" ? children : extractTextFromChildren(children);

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const extractTextFromChildren = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractTextFromChildren).join("");
    if (node && typeof node === "object" && "props" in node) {
      const props = (node as { props: { children?: React.ReactNode } }).props;
      return extractTextFromChildren(props.children);
    }
    return "";
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </>
        )}
      </button>
      <pre className={className}>{children}</pre>
    </div>
  );
}
