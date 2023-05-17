import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Usercomment from '../../components/Usercomment'
import Layout from '../../components/layout'

export default function Articles(props) {
   const session = useSession();
   const supabaseClient = useSupabaseClient();
   const [data, setData] = useState([]);
   const [username, setUsername] = useState('');

   useEffect(() => {
       async function loadData() {
           try {
               const {
                   data: articles,
                   error
               } = await supabaseClient
                   .from('articles')
                   .select('*')
                   .order('created_at', {
                       ascending: false
                   });

               if (error) {
                   throw new Error(error.message);
               }

               setData(articles);
           } catch (error) {
               console.log(error);
           }
       }
       loadData();

   }, []);


   return (
    <Layout>
    <div className="flex flex-col items-center justify-center mt-10">
       <h1 className="text-4xl font-bold mb-4">ARTICLES</h1>
       {data ? data.map(article => (
          <Link href={'/articles/' + article.id} key={article.id}>
             <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-md mt-4 cursor-pointer hover:shadow-md transition-shadow duration-300">
                <img className="w-72 h-48 object-cover mb-4 rounded-md" src={article.source}></img>
                <p className="text-xl font-bold mb-2">{article.title}</p>
                <p className="text-gray-500 mb-4">Written by <Usercomment id={article.author_id} /></p>
             </div>
          </Link>
       )) : <p>Loading...</p>}
       <div className="mt-4">
         <Link href="/newArticle">
           <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
             Create Article
           </button>
         </Link>
       </div>
    </div>
 </Layout>
   )
}
