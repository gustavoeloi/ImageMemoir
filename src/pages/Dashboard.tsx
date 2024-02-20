import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/config";
import { IPost } from "@/utils/IPost";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Trash } from "lucide-react";

import { AlertConfirm } from "@/components/AlertConfirm";
import { FormEdit } from "@/components/FormEdit";

import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const user = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const postRef = collection(db, "posts");
    const q = query(
      postRef,
      where("userID", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => doc.data() as IPost);
      setUserPosts(postsData);
    });

    return () => unsubscribe();
  }, [user, navigate]);

  const deletePost = async (id: string) => {
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef)
      .then(() => {
        toast({
          title: "Post was removed successfully!",
          className: "bg-slate-800 text-white",
        });
      })
      .catch((error) => {
        toast({
          title: "Error deleting post",
          description: "Try again later!",
          className: "bg-red-500 text-white",
        });
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center flex-col my-6">
        <h1 className="text-xl font-medium">Dashboard</h1>
        <p className="text-slate-500">
          This is the dashboard showing your posts
        </p>
      </div>
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <TableCaption>
          {userPosts.length > 0 ? (
            ""
          ) : (
            <p className="italic font-bold">
              No posts linked to your account were found! <br />
              <Link to="/new-post" className="underline">
                Create a new post
              </Link>
            </p>
          )}
        </TableCaption>
        <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50">
          <TableRow>
            <TableHead scope="col" className="px-6 py-3">
              Title
            </TableHead>
            <TableHead scope="col" className="px-6 py-3">
              Description
            </TableHead>
            <TableHead scope="col" className="px-6 py-3">
              Image
            </TableHead>
            <TableHead scope="col" className="px-6 py-3">
              Tags
            </TableHead>
            <TableHead scope="col" className="px-6 py-3">
              Created At
            </TableHead>
            <TableHead scope="col" className="px-6 py-3 text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white border-b">
          {userPosts.map((post) => (
            <TableRow key={post.postID}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="">{post.description}</TableCell>
              <TableCell className="">
                <img src={post.image} alt={post.title} className="max-w-24" />
              </TableCell>
              <TableCell className="">
                {post.tags.map((tag) => (
                  <Badge className="mr-1 mb-1" variant={"outline"} key={tag}>
                    {tag}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="">
                {post.createdAt.toDate().toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <FormEdit post={post} />

                  <AlertConfirm
                    buttonContent={<Trash />}
                    title="Do you want delete this post?"
                    description="This is a perman action"
                    onContinue={() => deletePost(post.postID)}
                    destructive={true}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
