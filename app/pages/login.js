import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Layout from '../components/layout.js'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

export default function Login() {
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  if(user){
    router.push('/profile')
  }
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className="max-w-md mx-auto mt-20">
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
          providers={['github','google','twitter']}
          view="sign_in"
          socialLayout="horizontal"
          socialColors={true}
          redirectTo="/profile"
        />
      </div>
    </Layout>
  )
}
