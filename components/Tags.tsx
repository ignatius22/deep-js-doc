import Link from "next/link";

interface TagsProps {
  tags: string[];
  size?: "sm" | "md" | "lg";
}

export default function Tags({ tags, size = "md" }: TagsProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const tagColors = [
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  ];

  const getTagColor = (tag: string) => {
    const index = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return tagColors[index % tagColors.length];
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`${sizeClasses[size]} ${getTagColor(
            tag
          )} rounded-full font-medium transition-all hover:scale-105`}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
