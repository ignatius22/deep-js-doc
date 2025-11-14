import Link from "next/link";

interface TagsProps {
  tags: string[];
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
}

export default function Tags({ tags, size = "md", clickable = true }: TagsProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const baseClasses = `${sizeClasses[size]} bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded font-medium`;

        if (clickable) {
          return (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className={`${baseClasses} hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors inline-block`}
            >
              {tag}
            </Link>
          );
        }

        return (
          <span key={tag} className={baseClasses}>
            {tag}
          </span>
        );
      })}
    </div>
  );
}
