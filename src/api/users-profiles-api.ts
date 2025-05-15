import axiosConfig from "../config/axiosConfig.ts";
import {
  UpdateUserProfileRequest,
  UploadProfilePhotoRequest,
  UserProfile,
} from "../types/userProfileTypes.ts";

export async function fetchUserProfileByUserId(
  userId: number | string,
): Promise<UserProfile> {
  const response = await axiosConfig.get<UserProfile>(
    `/users-profiles/${userId}`,
  );
  return response.data;
}

export async function handleUploadProfileMainPhoto(
  data: UploadProfilePhotoRequest,
): Promise<void> {
  const formData = new FormData();
  formData.append("file", data.photo);

  const response = await axiosConfig.put(
    `/users-profiles/upload-main-photo/${data.userId}`,
    formData,
  );
  return response.data;
}

export async function handleUploadPhotoToGallery(
  data: UploadProfilePhotoRequest,
): Promise<void> {
  const formData = new FormData();
  formData.append("file", data.photo);

  const response = await axiosConfig.put(
    `/users-profiles/upload-photo-to-gallery/${data.userId}`,
    formData,
  );
  return response.data;
}

export async function handleUpdateUserProfile(
  userId: string | number,
  data: UpdateUserProfileRequest,
) {
  const formData = new FormData();

  if (data.bio) {
    formData.append("bio", data.bio);
  }
  if (data.lookingFor) {
    formData.append("lookingFor", data.lookingFor);
  }
  if (data.interests) {
    data.interests.forEach((interest) => {
      formData.append("interests", interest);
    });
  }

  const response = await axiosConfig.patch<void>(
    `/users-profiles/update-profile/${userId}`,
    formData,
  );
  return response.data;
}
