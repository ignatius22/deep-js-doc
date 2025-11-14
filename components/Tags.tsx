import Link from "next/link";

interface TagsProps {
  tags: string[];
  size?: "sm" | "md" | "lg";
}

export default function Tags({ tags, size = "md" }: TagsProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`${sizeClasses[size]} bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded font-medium`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
