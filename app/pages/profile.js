import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Layout from '../components/layout.js'

export default function Contact() {
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const onClickLogout = async () => {
    await supabaseClient.auth.signOut()
    router.push('/login')
  }
  return (
    <Layout>
      <Head>
        <title>Profile</title>
      </Head>
      <button
        className="rounded px-3 py-2 text-white bg-slate-500 hover:bg-blue-500"
        onClick={onClickLogout}
      >
        logout
      </button>
      <pre><code>{JSON.stringify(user, null, 2)}</code></pre>
    </Layout>
  )
}