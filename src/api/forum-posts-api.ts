import { ForumPost, ForumPostRequest } from "../types/forumPostTypes.ts";
import axiosConfig from "../config/axiosConfig.ts";

export async function fetchForumPosts() {
  const response = await axiosConfig.get<ForumPost[]>(`forum-posts`);
  return response.data;
}

export async function fetchForumPostById(postId: number | string) {
  const response = await axiosConfig.get<ForumPost>(`forum-posts/${postId}`);
  return response.data;
}

export async function checkIsPostLikedByUser(
  postId: number | string,
  userId: number | string,
) {
  const response = await axiosConfig.get<boolean>(
    `forum-posts/post-likes/is-liked/${postId}/${userId}`,
  );
  return response.data;
}

export async function handleCreateForumPost(data: ForumPostRequest) {
  const response = await axiosConfig.post<void>("forum-posts", data);
  return response.data;
}

export async function handleLikeOrUnLikePost(
  postId: number | string,
  userId: number | string,
) {
  const response = await axiosConfig.post<void>(
    `forum-posts/post-likes/${postId}/${userId}`,
  );
  return response.data;
}

export async function handleUpdateForumPost(
  postId: number,
  data: ForumPostRequest,
) {
  const response = await axiosConfig.put<void>(`forum-posts/${postId}`, data);
  return response.data;
}

export async function handleDeleteForumPost(postId: number) {
  const response = await axiosConfig.delete<void>(`forum-posts/${postId}`);
  return response.data;
}
