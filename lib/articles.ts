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
  series?: string
  seriesOrder?: number
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
    series: data.series,
    seriesOrder: data.seriesOrder,
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

export function getRelatedArticles(slug: string, limit: number = 3): ArticleMetadata[] {
  const currentArticle = getArticleBySlug(slug)
  const allArticles = getAllArticles()

  // Calculate similarity score based on shared tags and category
  const articlesWithScore = allArticles
    .filter(article => article.slug !== slug)
    .map(article => {
      let score = 0

      // Same category gets high score
      if (article.category === currentArticle.category) {
        score += 10
      }

      // Shared tags
      const sharedTags = article.tags?.filter(tag =>
        currentArticle.tags?.includes(tag)
      ) || []
      score += sharedTags.length * 5

      return { article, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return articlesWithScore.map(item => {
    const { content, ...metadata } = item.article
    return metadata
  })
}

export interface SeriesInfo {
  seriesName: string
  currentPart: number
  totalParts: number
  previousArticle?: ArticleMetadata
  nextArticle?: ArticleMetadata
  allArticles: ArticleMetadata[]
}

export function getSeriesInfo(slug: string): SeriesInfo | null {
  const currentArticle = getArticleBySlug(slug)

  if (!currentArticle.series || !currentArticle.seriesOrder) {
    return null
  }

  const allArticles = getAllArticles()
  const seriesArticles = allArticles
    .filter(article => article.series === currentArticle.series)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))

  const currentIndex = seriesArticles.findIndex(article => article.slug === slug)
  const previousArticle = currentIndex > 0 ? seriesArticles[currentIndex - 1] : undefined
  const nextArticle = currentIndex < seriesArticles.length - 1 ? seriesArticles[currentIndex + 1] : undefined

  return {
    seriesName: currentArticle.series,
    currentPart: currentArticle.seriesOrder,
    totalParts: seriesArticles.length,
    previousArticle: previousArticle ? { ...previousArticle, content: '' } as ArticleMetadata : undefined,
    nextArticle: nextArticle ? { ...nextArticle, content: '' } as ArticleMetadata : undefined,
    allArticles: seriesArticles.map(article => {
      const { content, ...metadata } = article
      return metadata
    }),
  }
}