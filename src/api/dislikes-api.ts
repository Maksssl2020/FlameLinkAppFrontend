import axiosConfig from "../config/axiosConfig.ts";
import { User } from "../types/userTypes.ts";

export async function fetchDislikedUsers(userId: number | string) {
  const response = await axiosConfig.get<User[]>(
    `dislikes/${userId}/disliked-users`,
  );
  return response.data;
}

export async function checkIsDisliked(
  sourceUserId: number | string,
  targetUserId: number | string,
): Promise<boolean> {
  const response = await axiosConfig.get<boolean>(
    `dislikes/${sourceUserId}/is-disliked/${targetUserId}`,
  );
  return response.data;
}

export async function handleDislikeUser(
  sourceUserId: number | string,
  targetUserId: number | string,
) {
  const response = await axiosConfig.post<void>(
    `dislikes/${sourceUserId}/dislike/${targetUserId}`,
  );
  return response.data;
}

export async function handleRemoveDislike(
  sourceUserId: number | string,
  targetUserId: number | string,
) {
  const response = await axiosConfig.delete<void>(
    `dislikes/${sourceUserId}/remove-dislike/${targetUserId}`,
  );
  return response.data;
}
