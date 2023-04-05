import Layout from '../../components/layout';
import { getArticleDetails, getArticleIdList } from '../../lib/articles';

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
    <div>
      <h1>
        {articleData.title}
      </h1>
      <div>
        {articleData.description}
      </div>
      <div>
        Publié le : {articleData.date}
      </div>
    </div>
    </Layout>
  );
}