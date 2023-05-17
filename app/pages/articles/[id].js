import supabase from "../../components/supabase"
import { useEffect, useState } from "react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { RealtimePresence } from "@supabase/supabase-js"
import Usercomment from "../../components/Usercomment"
import Layout from "../../components/layout"

export async function getServerSideProps({
   params
}) {
   try {
       const {
           data: post,
           error
       } = await supabase
           .from('articles')
           .select('*')
           .eq('id', params.id)
           .single();

       if (error) {
           throw new Error(error.message);
       }

       return {
           props: {
               post,
           },
       };

   } catch (error) {
       console.log(error);
       return {
           props: {
               post: null,
           },
       };
   }
}

export default function Article({
   post
}) {
   const session = useSession();
   const [comments, setComments] = useState([]);
   const [newCom, setNewCom] = useState('');
   const [editing, setEditing] = useState(false);
   const [idEdit, setIdEdit] = useState(null);

   function countChar(val) {
       console.log(val);
       var len = String(val).length;
       console.log(len);
       return len;
   }

   useEffect(() => {
       async function loadComments() {
           try {
               const {
                   data: comments,
                   error
               } = await supabase
                   .from('comments')
                   .select('*')
                   .eq('article_id', post.id)
                   .order('created_at', {
                       ascending: false
                   });
               if (error) {
                   throw new Error(error.message);
               }

               setComments(comments);
           } catch (error) {
               console.log(error);
           }
       }
       loadComments();

   }, []);

   async function deleteComment({
       id
   }) {
       try {
           await supabase
               .from('comments')
               .delete()
               .eq('id', id);
           alert('Your comment was deleted!');
       } catch (error) {
           console.log(error);
       }
   }

   async function postComment() {
       if (newCom) {
           try {
               await supabase
                   .from('comments')
                   .insert({
                       author_id: session.user.id,
                       content: newCom,
                       created_at: new Date().toISOString(),
                       article_id: post.id,
                       author_email: session.user.email,
                   });
           } catch (error) {
               console.log(error);
           }
           setNewCom('');
       } else {
           alert('Your comment cannot be empty!');
       }
   }

   function editComment({
       content,
       id
   }) {
       setEditing(true);
       setNewCom(content);
       setIdEdit(id);
   }

   async function postEditedComment() {
       if (newCom) {
           try {
               await supabase
                   .from('comments')
                   .upsert({
                       id: idEdit,
                       content: newCom,
                   });
           } catch (error) {
               console.log(error);
           }
           setNewCom('');
           setEditing(false);
       } else {
           alert('Your comment cannot be empty!');
       }
   }


   if (session) {
      return (
         <Layout>
<div class="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg px-6 py-4">
  <p class="text-2xl font-bold mb-2">{post.title}</p>
  <div>
    <img src={post.source} alt="Article image" class="w-full rounded-lg" />
  </div>
  <div class="my-4">
    {post.content}
  </div>

  <div>
    <div>
      {comments ? comments.map(comment => (
        <div key={comment.id} className={comment.author_id === session.user.id ? "bg-gray-100 p-4 rounded-lg mb-4" : "bg-gray-200 p-4 rounded-lg mb-4"}>
          <div></div>
          <div>
            <span class="font-semibold"><Usercomment id={comment.author_id} /></span>
            <br /><br />
            <span>{comment.content}</span>
            <br />
            <span class="text-gray-500">{new Date(comment.created_at).toLocaleString()}</span>
            <br />

            {comment.author_id === session.user.id &&
              <>
               <button onClick={() => deleteComment(comment)} class="w-8 h-8"><img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete comment icon" /></button>
               <button onClick={() => editComment(comment)} class="w-8 h-8"><img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="Edit comment icon" /></button>

              </>
            }

          </div>
        </div>
      )) : <></>}
    </div>

    <div class="mt-8">
      <textarea class="w-full border-gray-300 rounded-lg p-4" placeholder="Your comment..." value={newCom || ''} onChange={(e) => setNewCom(e.target.value)}></textarea>
      {editing ?
        <button onClick={() => postEditedComment()} class="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg mt-4"><span>Edit comment</span></button>
        : <button onClick={() => postComment()} class="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg mt-4"><span>Post comment</span></button>
      }
    </div>
  </div>
</div>

</Layout>
      )
    } else {
      return (
         <Layout>
         <div class="max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg p-6">
         <p class="text-lg font-bold mb-4">{post.title}</p>
         <div>
           <img src={post.source} alt="Article image" />
         </div>
         <div class="mt-4">{post.content}</div>
       
         <div class="mt-8">
           <div>
             {comments ? comments.map(comment => (
               <div key={comment.id} className="comments mb-4">
                 <div class="flex items-center">
                   <Usercomment id={comment.author_id} />
                 </div>
                 <div class="ml-4">
                   <span>{comment.content}</span>
                   <br />
                   <span>{new Date(comment.created_at).getDate() + "/" +
                     (new Date(comment.created_at).getMonth() + 1) + "/" +
                     new Date(comment.created_at).getFullYear() + " | " +
                     (new Date(comment.created_at).getHours() + 1) + ":" +
                     new Date(comment.created_at).getMinutes()}</span>
                   <br />
                 </div>
               </div>
             )) : <></>}
           </div>
       
           <div class="mt-8">
             <textarea disabled value={newCom || ''} onChange={(e) => setNewCom(e.target.value)} class="w-full bg-gray-200 p-2 rounded-lg"></textarea>
             <button disabled class="mt-2 bg-gray-200 px-4 py-2 rounded-lg text-gray-600 font-bold cursor-not-allowed"><span>Post comment</span></button>
           </div>
         </div>
       </div>
       </Layout>
      )
    }
}



