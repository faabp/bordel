import Layout from '../components/layout';
import Link from 'next/link';
import { getArticleIdList } from '../lib/articles';


export async function getStaticProps(){
  const articles = await getArticleIdList();
  return {
    props: {
      articles,
    },
  };
}

export default function Articles({ articles }){
  return (
    <Layout>
      <div>
        <h1> Bro lis mes articles et tu deviendras beau</h1>
        <ul>
          {articles.map(({ params: { id } }) => (
            <li key={id}>
              <Link href={`/articles/${id}`}>
                {`Article ${id}`}
              </Link>
            </li>
          )
          )}
        </ul>
      </div>
    </Layout>
  )

}