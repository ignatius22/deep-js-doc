"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Get all headings from the article
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );
    const items = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: parseInt(elem.tagName.charAt(1)),
    }));
    setHeadings(items);

    // Intersection Observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 px-3">
          On this page
        </h2>

        <ul className="space-y-1 text-sm border-l-2 border-gray-200 dark:border-gray-800">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 16 + 12}px` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full py-1.5 transition-all relative ${
                  activeId === heading.id
                    ? "text-emerald-600 dark:text-emerald-400 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-emerald-600 dark:before:bg-emerald-400 before:-ml-[2px]"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
