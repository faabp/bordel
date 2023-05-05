import Link from 'next/link'


export default function Header(){
    return (
      
    <header>
        <nav class="bg-grey-100">
          <div class="px-8 border mx-auto">
            <div class="flex justify-between">

              <div>
                <a href="#" class="flex items-center py-5 px-2 text-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
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
                <a class="py-2 px-3 bg-blue-700 hover:text-blue-100 text-blue-200 transition duration-300 rounded shadow" href="/profile">Profile</a>
              </div>

              <div class="md:hidden flex items-center">
              <button class="mobile-menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" /></svg>
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
        
    </header>
)
}
