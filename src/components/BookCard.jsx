import React from 'react'

function coverUrl(cover_i) {
  return cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : 'https://via.placeholder.com/150x220?text=No+Cover'
}

export default function BookCard({ book }) {
  const title = book.title
  const authors = book.author_name ? book.author_name.join(', ') : 'Unknown author'
  const year = book.first_publish_year || (book.publish_year ? book.publish_year[0] : '—')

  return (
    <a
      href={`https://openlibrary.org${book.key}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white p-3 rounded shadow hover:shadow-md transition"
    >
      <img src={coverUrl(book.cover_i)} alt={`${title} cover`} className="w-full h-48 object-cover mb-3 rounded" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{authors}</p>
      <p className="text-xs text-gray-500 mt-1">First published: {year}</p>
    </a>
  )
}
