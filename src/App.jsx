import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard.jsx'

export default function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [numFound, setNumFound] = useState(0)

  useEffect(() => {
    if (!query) {
      setBooks([])
      setNumFound(0)
      return
    }

    const controller = new AbortController()
    async function fetchBooks() {
      setLoading(true)
      setError(null)
      try {
        // Open Library Search API
        const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&page=${page}`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        setBooks(data.docs || [])
        setNumFound(data.numFound || 0)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
    return () => controller.abort()
  }, [query, page])

  function handleSearch(q) {
    setQuery(q)
    setPage(1)
  }

  const perPage = 100  // OpenLibrary returns many results per page; UI shows what we get
  const totalPages = Math.max(1, Math.ceil(numFound / perPage))

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold">Book Finder</h1>
          <p className="text-sm text-gray-600 mt-1">Search books by title using the Open Library API.</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        <section className="mt-6">
          {loading && <div className="text-gray-500">Loading...</div>}
          {error && <div className="text-red-600">Error: {error}</div>}

          {!loading && !error && query && (
            <>
              <div className="mb-3 text-sm text-gray-600">Found {numFound} results — page {page} of {totalPages}</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {books.map(b => (
                  <BookCard key={b.key} book={b} />
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 bg-white border rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="text-sm text-gray-700">Page {page} / {totalPages}</div>

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 bg-white border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {!query && (
            <div className="mt-6 text-gray-600">Try searching for <em>harry potter</em>, <em>data structures</em>, or <em>pride and prejudice</em>.</div>
          )}
        </section>
      </div>
    </div>
  )
}
