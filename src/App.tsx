import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { TopNav } from './components/TopNav';
import { CategorySelect } from './components/CategorySelect';
import { SearchBar } from './components/SearchBar';
import { ArticlesGrid } from './components/ArticlesGrid';
import { Layout, MainContainer } from './components/Layout';
import type { Article, Category } from './types/news';
import { fetchTechNews } from './services/newsApi';
import { useLocalStorage } from './hooks/useLocalStorage'
import { useColorMode } from './hooks/useColorMode'
import { generateDummyNews } from './utils/dummyNews'

function App() {
  const { mode, toggle } = useColorMode()
  const [category, setCategory] = useState<Category>('all')
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookmarks, setBookmarks] = useLocalStorage<Article[]>('bookmarks', [])
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false)

  // For the 'all' category, we'll pass it directly to fetchTechNews
  // which will handle it by using the country parameter instead of category
  const categoryQuery = useMemo(() => category, [category]);

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchTechNews({ categoryQuery })
        if (!ignore) setArticles(data)
      } catch (e: unknown) {
        if (!ignore) {
          const msg = e instanceof Error ? e.message : 'Failed to load news'
          console.warn('Using fallback dummy news data due to:', msg)
          // Generate 10 dummy articles for the current category
          const dummyNews = generateDummyNews(10, categoryQuery === 'all' ? undefined : categoryQuery)
          setArticles(dummyNews)
          setError(`Showing demo data | ${msg} | NewsAPI development plan doesn't work in production`)
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [categoryQuery])

  const filteredArticles = useMemo(() => {
    const list = showOnlyBookmarks ? bookmarks : articles
    if (!query.trim()) return list
    const q = query.toLowerCase()
    return list.filter((a) => a.title?.toLowerCase().includes(q))
  }, [articles, bookmarks, query, showOnlyBookmarks])

  function isSaved(a: Article) {
    return bookmarks.some((b) => b.url === a.url)
  }

  function toggleSave(a: Article) {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.url === a.url)
      return exists ? prev.filter((b) => b.url !== a.url) : [a, ...prev]
    })
  }

  return (
    <Layout>
      <TopNav onToggleMode={toggle} mode={mode} />
      <MainContainer>
        <div className="row g-3 align-items-center mb-3">
          <div className="col-12 col-md-4">
            <CategorySelect value={category} onChange={setCategory} />
          </div>
          <div className="col-12 col-md-5">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <div className="col-12 col-md-3 d-flex gap-2 justify-content-md-end">
            <button className={`btn ${showOnlyBookmarks ? 'btn-warning' : 'btn-outline-secondary'}`} onClick={() => setShowOnlyBookmarks((v) => !v)}>
              <i className="bi bi-bookmark-star me-1" /> {showOnlyBookmarks ? 'Showing Bookmarks' : 'Show Bookmarks'}
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border" role="status" aria-label="Loading" />
          </div>
        ) : filteredArticles.length ? (
          <ArticlesGrid articles={filteredArticles} isSaved={isSaved} onToggleSave={toggleSave} />
        ) : (
          <div className="text-center text-secondary py-5">No articles found.</div>
        )}
      </MainContainer>
      <footer className="bg-light py-3 mt-auto">
        <div className="container text-center text-secondary small">
          Powered by NewsAPI.org
        </div>
      </footer>
    </Layout>
  )
}

export default App
