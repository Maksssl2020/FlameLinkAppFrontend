import axiosConfig from "../config/axiosConfig.ts";
import { ChangePasswordRequest, User, UserParams } from "../types/userTypes.ts";

export async function fetchUserById(userId: number): Promise<User> {
  const response = await axiosConfig.get<User>(`users/${userId}`);
  return response.data;
}

export async function handlePasswordChange(
  data: ChangePasswordRequest,
): Promise<void> {
  const response = await axiosConfig.put<void>("/users/change-password", data);
  return response.data;
}

export async function fetchMatchingUsers(params: UserParams) {
  const query = new URLSearchParams();

  if (params.userUsername) query.append("userUsername", params.userUsername);
  if (params.minAge) query.append("minAge", params.minAge.toString());
  if (params.maxAge) query.append("maxAge", params.maxAge.toString());
  if (params.pageNumber)
    query.append("pageNumber", params.pageNumber.toString());
  if (params.pageSize) query.append("pageSize", params.pageSize.toString());

  const response = await axiosConfig.get(
    `/users/matching-users?${query.toString()}`,
  );

  console.log(response);

  // @ts-ignore
  const paginationHeader = response.headers.get("pagination");
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

  return { users: response.data, pagination };
}
