import Layout from "../components/layout"


function HomePage({Component, pageProps}) {
    return  (     
    <Layout>
      <title>HF page</title>
      <meta name="description" content="C'est Mozart capitain jackson" />
      <h1>
        Mon gars chako est l'ing
      </h1>
      <Link to="/use-state">Aller à UseStatePage</Link>
      
      
      </Layout>
    )
  }
  
  export default HomePage
