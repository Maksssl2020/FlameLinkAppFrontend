import axiosConfig from "../config/axiosConfig.ts";
import { ChangePasswordRequest, User } from "../types/userTypes.ts";

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
