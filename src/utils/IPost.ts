import { Timestamp } from "firebase/firestore";

export interface IPost {
  author: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  userID?: string;
  postID: string;
  createdAt: Timestamp;
}
