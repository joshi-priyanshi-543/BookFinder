Book Finder

A simple React web application that allows users to search for books using the Open Library API. Built with Vite, React, and Tailwind CSS.
Features
Search books by title
View book cover, title, author(s), and publish year
Fast development with Vite
Styled with Tailwind CSS
Beginner-friendly project structure

Tech Stack
Frontend: React (Vite)
Styling: Tailwind CSS
State Management: React hooks (useState, useEffect)
API: Open Library Search API

Setup & Installation
1. Clone the repo
   git clone https://github.com/your-username/book-search.git
   cd book-search
2. Install dependencies
   npm install
3. Install Tailwind CSS
   npm install -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p
4. Configure Tailwind

 In tailwind.config.cjs:

  module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
    }
  In src/index.css:

  @tailwind base;
  @tailwind components;
  @tailwind utilities;  
5. Run the development server
  npm run dev

  Now open http://localhost:5173 in your browser



