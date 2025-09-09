import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState('')

  function submit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSearch(trimmed)
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search book titles (e.g. 'Atomic Habits')"
        className="flex-1 p-3 border rounded shadow-sm"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
    </form>
  )
}
