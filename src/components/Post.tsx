import { IPost } from "@/utils/IPost";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";

interface Props {
  post: IPost;
}

const Post = ({ post }: Props) => {
  const [tags] = useState<string[]>(post.tags);

  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="mb-2">{post.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <img src={post.image} alt={post.title} />
          <p className="mt-3 text-slate-500">
            <span className="font-bold text-slate-800">{post.author}</span>{" "}
            {post.description}
          </p>
          <div className="mt-3">
            {tags.map((tag) => (
              <Badge key={tag} className="mr-1" variant={"secondary"}>
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
