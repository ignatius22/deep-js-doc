'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

interface SearchProps {
  articles: Array<{
    slug: string
    title: string
    description: string
  }>
}

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}

export default function Search({ articles }: SearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(articles)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const router = useRouter()
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedQuery = useDebounce(query, 200)

  // Initialize Fuse.js with match highlighting
  const fuse = new Fuse(articles, {
    keys: ['title', 'description'],
    threshold: 0.3,
    includeMatches: true,
    includeScore: true,
  })

  // Handle search with debounced query
  useEffect(() => {
    if (debouncedQuery.length === 0) {
      startTransition(() => {
        setResults(articles)
        setIsOpen(false)
        setSelectedIndex(-1)
      })
    } else {
      const searchResults = fuse.search(debouncedQuery)
      startTransition(() => {
        setResults(searchResults.map(result => result.item))
        setIsOpen(true)
        setSelectedIndex(-1)
      })
    }
  }, [debouncedQuery])

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
    }
    
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0) {
      const element = document.getElementById(`search-result-${selectedIndex}`)
      element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selectedIndex])
  
  const handleSelect = (slug: string, title: string) => {
    // Save to recent searches
    const updated = [title, ...recentSearches.filter(s => s !== title)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
    
    router.push(`/articles/${slug}`)
    setQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
      } else if (e.key === 'Enter' && selectedIndex >= 0 && results.length > 0) {
        e.preventDefault()
        handleSelect(results[selectedIndex].slug, results[selectedIndex].title)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(-1)
        inputRef.current?.blur()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, results])

  const handleInputFocus = () => {
    if (query.length === 0 && recentSearches.length > 0) {
      setIsOpen(true)
    } else if (query.length > 0) {
      setIsOpen(true)
    }
  }

  const handleRecentSearch = (search: string) => {
    setQuery(search)
    inputRef.current?.focus()
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  return (
    <div ref={searchContainerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="Search articles..."
          className="w-full px-4 py-2 pl-10 pr-20 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        
        {/* Keyboard Shortcut Hint */}
        <kbd className="absolute right-3 top-2 hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
          ⌘K
        </kbd>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          
          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Recent Searches
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(search)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {query.length > 0 && results.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                {results.length} {results.length === 1 ? 'Result' : 'Results'}
              </div>
              {results.map((article, index) => (
                <button
                  key={article.slug}
                  id={`search-result-${index}`}
                  onClick={() => handleSelect(article.slug, article.title)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    selectedIndex === index
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {article.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {article.description}
                  </div>
                </button>
              ))}
            </>
          )}

          {/* No Results */}
          {query.length > 0 && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {`No articles found for ${query}`}
              </p>
            </div>
          )}

          {/* Keyboard Hints */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">↵</kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">Esc</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}