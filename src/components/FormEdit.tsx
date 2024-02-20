import { IPost } from "@/utils/IPost";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FilePenLine } from "lucide-react";
import { Pencil } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

interface Props {
  post: IPost
}

const formSchema = z.object({
  title: z.string().min(5).max(50, {
    message: "Title must be between 5 and 50 characters",
  }),
  description: z.string().min(10).max(200),
  tags: z.array(z.string().min(3).max(20)),
  image: z.string().url(),
});


export function FormEdit({ post }: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      description: post.description,
      tags: post.tags,
      image: post.image,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const postRef = doc(db, "posts", post.postID);

    await updateDoc(postRef, { ...values }).then(() => {
      toast({
        title: "Post edited successfully!",
        className: "bg-green-500 text-white"
      })
      navigate(`/post/${post.postID}`)
    })
      .catch((error) => {
        toast({
          title: "Error when saving course edit",
          description: "Try again later",
          className: "bg-red-500 text-white"
        })
        console.error(error);
      })

    form.reset();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Pencil />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2"><FilePenLine /> Post Edit Form</AlertDialogTitle>
          <AlertDialogDescription>
            Edit the fields with the new post data and click save
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 max-w-md mx-auto m-12 p-4 rounded border border-gray-200 bg-gray-50"
            >

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
                      <Input placeholder="image url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <img src={post.image} className="w-36 mx-auto" alt={post.title} />
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <Button type="submit" variant={"default"} >Save</Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )

}
