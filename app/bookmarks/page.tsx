import { getAllArticles } from "@/lib/articles";
import BookmarksClient from "@/components/BookmarksClient";

export const metadata = {
  title: "Your Reading List | Deep JavaScript",
  description: "Your bookmarked articles for later reading.",
};

export default function BookmarksPage() {
  const allArticles = getAllArticles();

  return <BookmarksClient articles={allArticles} />;
}
