import axiosConfig from "../config/axiosConfig.ts";
import { User } from "../types/userTypes.ts";

export async function fetchUserMatches(userId: number | string) {
  const response = await axiosConfig.get<User[]>(`matches/${userId}/matches`);
  return response.data;
}

export async function fetchUserLikedUsers(userId: number | string) {
  const response = await axiosConfig.get<User[]>(
    `matches/${userId}/liked-users`,
  );
  return response.data;
}

export async function checkIsMatch(
  sourceUserId: number | string,
  targetUserId: number | string,
) {
  const response = await axiosConfig.get<boolean>(
    `matches/${sourceUserId}/is-match/${targetUserId}`,
  );
  return response.data;
}

export async function handleLikeUser(
  sourceUserId: number | string,
  targetUserId: number | string,
) {
  const response = await axiosConfig.post<void>(
    `matches/${sourceUserId}/like/${targetUserId}`,
  );
  return response.data;
}

export async function handleRemoveLike(
  sourceUserId: number | string,
  targetUserId: number | string,
) {
  const response = await axiosConfig.delete<void>(
    `matches/${sourceUserId}/remove-like/${targetUserId}`,
  );
  return response.data;
}
