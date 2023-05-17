import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Layout from "../components/layout"

export default function CreateArticle(props) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [char1, setChar1] = useState('0 (100 max)');
  const [char2, setChar2] = useState('0 (1000 max)');
  const [a, setA] = useState(true);

  useEffect(() => {
      if (session && a) {
          setContent(null);
          setTitle(null);
          setSource(null);
          setA(false);
      }
  });

  async function postArticle() {
      if (content && title && source) {
          try {
              await supabase.from('articles').insert({
                  author_id: session.user.id,
                  content: content,
                  title: title,
                  source: source,
                  created_at: new Date().toISOString(),
              });
              alert('Article posté');
          } catch (error) {
              console.log(error);
          }
          setContent('');
          setTitle('');
          setSource('');
      } else {
          alert('Remplissez tous les champs !');
      }
  }

    return (
        <Layout>
          <div class="flex justify-center items-center ">
            <div class="bg-white p-8 rounded shadow-md">
              <h1 class="text-center text-2xl font-bold mb-4">Create New Article</h1>
              <div class="mb-4">
                <label class="block mb-2 font-bold text-gray-700" for="title">
                  Title:
                </label>
                <textarea 
                  id="title" 
                  name="title"
                  value={title || ''}
                  disabled={session ? false : true} 
                  onChange={(e) => {
                    setChar1(e.target.value.length + " (max 100)");
                    setTitle(e.target.value);
                  }}
                  maxLength='100'
                  class="w-full px-3 py-2 placeholder-gray-300 border rounded-md appearance-none focus:outline-none focus:shadow-outline-green focus:border-green-300"
                  rows="2"
                  placeholder="Entrer un non d'article"
                ></textarea>
                <p class="text-sm text-gray-500">{char1}</p>
              </div>
              <div class="mb-4">
                <label class="block mb-2 font-bold text-gray-700" for="content">
                  Content:
                </label>
                <textarea 
                  id="content" 
                  name="content"
                  value={content || ''}
                  disabled={session ? false : true} 
                  onChange={(e) => {
                    setChar2(e.target.value.length + " (max 1000)");
                    setContent(e.target.value);
                  }}
                  maxLength='1000'
                  class="w-full px-3 py-2 placeholder-gray-300 border rounded-md appearance-none focus:outline-none focus:shadow-outline-green focus:border-green-300"
                  rows="10"
                  placeholder="Entrer le contenu de l'article"
                ></textarea>
                <p class="text-sm text-gray-500">{char2}</p>
              </div>
              <div class="mb-4">
                <label class="block mb-2 font-bold text-gray-700" for="source">
                  Image source:
                </label>
                <textarea 
                  id="source" 
                  name="source"
                  value={source || ''}
                  disabled={session ? false : true} 
                  onChange={(e) => setSource(e.target.value)}
                  class="w-full px-3 py-2 placeholder-gray-300 border rounded-md appearance-none focus:outline-none focus:shadow-outline-green focus:border-green-300"
                  rows="2"
                  placeholder="Entrer un lien d'image"
                ></textarea>
              </div>
              <button 
                class="w-full px-3 py-2 text-white bg-green-600 rounded-md hover:bg-green-800 focus:outline-none focus:shadow-outline-green"
                disabled={!session}
                onClick={(e) => { postArticle() }}
              >
                {session ? "Submit" : "Connectez vous"}
              </button>
            </div>
          </div>
          </Layout>
    )
}
