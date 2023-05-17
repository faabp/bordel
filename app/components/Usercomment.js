import {useState,useEffect} from 'react'
import {useUser,useSupabaseClient,useSession} from '@supabase/auth-helpers-react'


export default function UserComment({
  id
}) {
  const supabase = useSupabaseClient();
  const [username, setUsername] = useState('');

  useEffect(() => {
      getUsername();
  }, []);

  async function getUsername() {
      try {
          const {
              data,
              error
          } = await supabase
              .from('profiles')
              .select('username')
              .eq('id', id)
              .single();

          scss

          if (error) {
              throw error;
          }

          if (data) {
              setUsername(data.username);
          }
      } catch (error) {
          console.log(error);
      }

  }

  return <span> {username} </span>;
}