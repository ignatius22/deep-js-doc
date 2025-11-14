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
  tags?: string[]
  category?: string
  author?: string
  featured?: boolean
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
    tags: data.tags || [],
    category: data.category || 'Uncategorized',
    author: data.author || 'Deep JS Team',
    featured: data.featured || false,
    content,
  }
}

export function getAllTags(): string[] {
  const articles = getAllArticles()
  const tags = new Set<string>()
  articles.forEach(article => {
    article.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set<string>()
  articles.forEach(article => {
    if (article.category) categories.add(article.category)
  })
  return Array.from(categories).sort()
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter(article =>
    article.tags?.includes(tag)
  )
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(article =>
    article.category === category
  )
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs()
  const articles = slugs
    .map(slug => getArticleBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1))
  
  return articles
}