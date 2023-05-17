import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


export default function Account({
  session
}) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
      getProfile();
  }, [session]);

  async function getProfile() {
      try {
          setLoading(true);

          const {
              data,
              error
          } = await supabase
              .from('profiles')
              .select('username, phoneNumber')
              .eq('id', user.id)
              .single();

          if (error) {
              throw error;
          }

          if (data) {
              setUsername(data.username);
              setPhoneNumber(data.phoneNumber);
          }
      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }

  }

  async function updateProfile({
      username,
      phoneNumber
  }) {
      try {
          setLoading(true);

          const updates = {
              username,
              updated_at: new Date().toISOString(),
              email: user.email,
              phoneNumber,
              id: user.id,
          };

          const {
              error
          } = await supabase
              .from('profiles')
              .upsert(updates, {
                  returning: 'minimal'
              })
              .eq('id', user.id);

          if (error) {
              throw error;
          }

          alert('Profile updated!');
      } catch (error) {
          alert('Error updating the data!');
          console.log(error);
      } finally {
          setLoading(false);
      }

  }

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl font-bold mb-4">Profile</h2>
  <form>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email:</label>
      <input type="email" id="email" value={session ? session.user.email : ''} disabled className="form-input bg-gray-100 w-full rounded-lg py-2 px-3"/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Username:</label>
      <input type="text" id="username" value={username || ''} onChange={(e) => setUsername(e.target.value)} className="form-input bg-gray-100 w-full rounded-lg py-2 px-3"/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">Phone number:</label>
      <input type="text" id="phone" value={phoneNumber || ''} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input bg-gray-100 w-full rounded-lg py-2 px-3"/>
    </div>
    <div className="flex justify-center">
      <button type="submit" onClick={() => updateProfile({ username, phoneNumber })} disabled={loading} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-900 focus:outline-none focus:shadow-outline">
        {loading ? 'Loading...' : 'Update'}
      </button>
    </div>
  </form>
  <div className="mt-4 flex justify-center">
    <button onClick={() => supabase.auth.signOut()} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline">
      Sign Out
    </button>
  </div>
</div>

  )
}

