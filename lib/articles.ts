import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const articlesDirectory = path.join(process.cwd(), '/content/articles')

export interface ArticleMetadata {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
}

export interface Article extends ArticleMetadata {
  content: string
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true })
    return []
  }
  
  return fs.readdirSync(articlesDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

export function getArticleBySlug(slug: string): Article {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const { text } = readingTime(content)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    readingTime: text,
    content,
  }
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs()
  const articles = slugs
    .map(slug => getArticleBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1))
  
  return articles
}