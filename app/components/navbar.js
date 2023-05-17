import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function searchArticles(query) {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .or(`title.ilike.%${query}%`, `content.ilike.%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return articles;
}

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.search || '');
  const [articles, setArticles] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const articles = await searchArticles(searchTerm);
    router.push(`/articles?search=${searchTerm}`);
    setArticles(articles);
  };

  useEffect(() => {
    setSearchTerm(router.query.search || '');
  }, [router.query.search]);

  useEffect(() => {
    async function fetchArticles() {
      if (searchTerm) {
        const articles = await searchArticles(searchTerm);
        setArticles(articles);
      }
    }

    fetchArticles();
  }, [searchTerm]);

    return (
      
    <header>
        <nav class="bg-grey-100">
          <div class="px-8 border mx-auto">
            <div class="flex justify-between">

              <div>
                <a href="/" class="flex items-center py-5 px-2 text-green-700">
                    <span class="font-semibold">HF page</span>
                </a>
              </div>

              <div class="hidden md:flex items-center space-x-1">
                <a class="py-5 px-2 text-gray-700 hover:text-gray-900" href="/">Home</a>
                <a class="py-5 px-2 text-gray-700 hover:text-gray-900" href="/articles">Articles</a>
                <a class="py-5 px-2 text-gray-700 hover:text-gray-900" href="/about">About</a>
              </div>

              <div class="hidden md:flex items-center space-x-1">
                <a class="py-5 px-3 text-gray-800 hover:text-gray-900" href="/login">Login</a>
                <a class="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" href="/profile">Profile</a>
              </div>

              <div class="md:hidden flex items-center">
              <button class="mobile-menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" /></svg>
              </button>
              </div>
          </div>
          </div>
          <div class="mobile-menu hidden md:hidden">
            <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Shipments</a>
            <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Services</a>
            <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Revenues</a>
            <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Insights</a>
          </div>
        </nav>
        
  <form onSubmit={handleSearch} className="ml-4 flex-grow max-w-xl w-full">
  <label htmlFor="search" className="sr-only">
    Search articles
  </label>
  <div className="relative text-gray-400 focus-within:text-gray-600">
    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M14.447 12.236a7.5 7.5 0 111.06-1.06l5.297 5.298a1 1 0 11-1.414 1.414l-5.297-5.298zm-7.947 0a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <input
      id="search"
      name="search"
      type="search"
      placeholder="Search articles"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="block w-full rounded-md pl-10 sm:text-sm border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </div>
  <button
    type="submit"
    className="ml-2 bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-800 focus:outline-none focus:bg-green-800"
  >
    Search
  </button>
</form>
    
    </header>
)
}
