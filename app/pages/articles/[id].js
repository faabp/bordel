import Layout from '../../components/layout';
import { getArticleDetails, getArticleIdList } from '../../lib/articles';
import Head from 'next/head'

export async function getStaticPaths() {
  const paths = await getArticleIdList();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articleData = await getArticleDetails(params.id);
  return {
    props: {
      articleData,
    },
  };
}

export default function Article({ articleData }) {
  return (
    <Layout>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <div className="max-w-md mx-auto mt-20 space-y-4">
        <h1 className="text-3xl font-bold">{articleData.title}</h1>
        <div className="text-lg">{articleData.description}</div>
        <div className="text-sm">{`Publié le : ${articleData.date}`}</div>
      </div>
    </Layout>
  );
}
