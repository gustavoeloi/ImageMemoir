import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";

import { IPost } from "@/utils/IPost";

import Post from "@/components/Post";

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    async function getDocumentById() {
      if (postId) {
        try {
          const docRef = doc(db, "posts", postId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data() as IPost;
            setPost(data);
          }
        } catch (error) {
          console.error("Erro ao buscar documento: ", error);
          return null;
        }
      }
    }
    getDocumentById();
  }, [postId]);

  return (
    <main className="flex items-center justify-center mt-6">
      <div className="md:max-w-[500px]">{post && <Post post={post} />}</div>
    </main>
  );
};

export default PostPage;
