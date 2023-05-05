import Layout from '../components/layout';
import Link from 'next/link';
import { getArticleIdList } from '../lib/articles';
import Head from 'next/head'

export async function getStaticProps(){
  const articles = await getArticleIdList();
  return {
    props: {
      articles,
    },
  };
}

export default function Articles({ articles }) {
  return (
    <Layout>
      <Head>
        <title>Articles</title>
      </Head>
      <div className="max-w-md mx-auto mt-20 space-y-4">
        <h1 className="text-3xl font-bold">Bro lis mes articles et tu deviendras beau</h1>
        <ul>
          {articles.map(({ params: { id } }) => (
            <li key={id} className="text-lg">
              <Link href={`/articles/${id}`}>
                {`Article ${id}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}