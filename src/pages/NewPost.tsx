import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Handshake } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router";
import { useToast } from "@/components/ui/use-toast";

import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z.string().min(5).max(50, {
    message: "Title must be between 5 and 50 characters",
  }),
  description: z.string().min(10).max(200),
  tags: z.array(z.string().min(3).max(20)),
  image: z.string().url(),
});

const NewPost = () => {
  const user = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pathPost, setPathPost] = useState<string | undefined>("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      image: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const data = { ...values, author: user?.displayName, createdAt: serverTimestamp(), userID: user?.uid };

    try {
      const docRef = await addDoc(collection(db, "posts"), data);
      await setDoc(doc(db, "posts", docRef.id), { ...data, postID: docRef.id })
      toast({
        title: "Post Created",
        description: `Your post has been created successfully - ${data.author}`,
        className: "bg-lime-600 text-white"
      })
      form.reset();
      navigate(`/post/${docRef.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        className: "bg-red-600 text-white",
      });
      console.error("Error adding document: ", error);
    }

  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 max-w-md mx-auto m-12 p-4 rounded border border-gray-200 bg-gray-50"
        >
          <h1 className="text-center font-medium text-xl text-slate-900">
            Share your moment with us!
            <Handshake className="w-8 h-8 inline-block ml-2" />
          </h1>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title of your post" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="description of your post"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tags of your post"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value.split(",").map((tag) => tag.trim()));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="image url" {...field} onFocus={(e) => setPathPost(e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>

        </form>

      </Form>
      {pathPost && (
        <img src={pathPost} alt="Imagem" className="w-32 mx-auto" />
      )}
    </div>
  );
};

export default NewPost;
