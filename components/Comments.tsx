"use client";

import { useEffect, useRef } from "react";

export default function Comments() {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    // Check if script already exists
    const existingScript = commentsRef.current.querySelector("script");
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "[ENTER REPO HERE]"); // e.g., "username/repo-name"
    script.setAttribute("data-repo-id", "[ENTER REPO ID HERE]");
    script.setAttribute("data-category", "[ENTER CATEGORY NAME HERE]");
    script.setAttribute("data-category-id", "[ENTER CATEGORY ID HERE]");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    commentsRef.current.appendChild(script);
  }, []);

  return (
    <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Comments
      </h2>
      <div ref={commentsRef} className="giscus" />

      {/* Instructions for setup */}
      <noscript>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please enable JavaScript to view the comments.
        </p>
      </noscript>
    </div>
  );
}
