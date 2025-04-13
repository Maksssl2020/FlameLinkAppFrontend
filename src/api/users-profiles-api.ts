import axiosConfig from "../config/axiosConfig.ts";
import {
  UploadProfileMainPhotoRequest,
  UserProfile,
} from "../types/userProfileTypes.ts";

export async function fetchUserProfileByUserId(
  userId: number,
): Promise<UserProfile> {
  const response = await axiosConfig.get<UserProfile>(
    `/users-profiles/${userId}`,
  );
  return response.data;
}

export async function handleUploadProfileMainPhoto(
  data: UploadProfileMainPhotoRequest,
): Promise<void> {
  const formData = new FormData();
  formData.append("file", data.photo);

  const response = await axiosConfig.put(
    `/users-profiles/upload-main-photo/${data.userId}`,
    formData,
  );
  return response.data;
}
