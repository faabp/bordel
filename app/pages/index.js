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
          <div class="w-1/2 h-1/2 bg-gray-300">
            <img src="https://yard.media/wp-content/uploads/2020/09/leto-yard-alextrescool-14-1125x1406.jpg" />
          </div>
        </div>

      
      </Layout>
    )
  }
  
  export default HomePage
