import Layout from "../components/layout"
import Head from 'next/head'


function HomePage({Component, pageProps}) {
    return  (     
    <Layout>
        <Head>
        <title>HF - Home</title>
      </Head>

      <meta name="description" content="C'est Mozart capitain jackson" />
      
        <div class="flex justify-center items-center h-screen">
          <div class="w-1/2 h-1/2">
            <img src="https://cdns-images.dzcdn.net/images/cover/1220f0569f189e1365438baeeed0e0e8/500x500.jpg" />
          </div>
        </div>

      
      </Layout>
    )
  }
  
  export default HomePage
