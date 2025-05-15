import { Image } from "./imageTypes.ts";

export interface ForumPostRequest {
  userId: number;
  title: string;
  content: string;
  category: ForumPostCategory;
}

export type ForumPostCategory =
  | "Relationships"
  | "DatingTips"
  | "SuccessStories"
  | "AppFeedback"
  | "Events";

export interface ForumPost {
  id: number;
  authorId: number;
  authorName: string;
  title: string;
  content: string;
  category: ForumPostCategory;
  createdAt: string;
  likes: number;
  authorImage?: Image;
}
