import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import { IPost } from "@/utils/IPost";
import Post from "@/components/Post";
// import { useUser } from "@/context/UserContext";
import InputSearch from "@/components/InputSearch";

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const user = useUser();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map<IPost>((doc) => doc.data() as IPost));
    });

    return () => unsubscribe();
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (!posts) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-center font-medium text-3xl my-4">Loading...</h1>
      </main>
    );
  }

  if (!posts.length) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-center font-medium text-3xl my-4">
          No posts found.
        </h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <InputSearch onSearch={handleSearchChange} />
      <h1 className="text-center font-medium text-3xl my-8">Latest Posts</h1>
      <div className="max-w-screen-sm mx-auto mb-16">
        {searchTerm === "" ? (
          // Se o campo de busca estiver vazio, exibir todos os posts
          posts.map((post) => <Post key={post.title} post={post} />)
        ) : // Se houver um termo de busca, exibir os posts filtrados
        filteredPosts.length === 0 ? (
          // Se não houver posts correspondentes, exibir uma mensagem
          <p className="text-center text-gray-500 mt-32">No posts found.</p>
        ) : (
          // Exibir os posts filtrados
          filteredPosts.map((post) => <Post key={post.title} post={post} />)
        )}
      </div>
    </main>
  );
};

export default Home;
