import axiosConfig from "../config/axiosConfig.ts";
import {
  ChangePasswordRequest,
  UpdateUserDataRequest,
  User,
  UserParams,
} from "../types/userTypes.ts";

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

  if (params.interests && params.interests.length > 0) {
    params.interests.forEach((interest) => {
      query.append("interests", interest);
    });
  }

  query.append("userParamsImagesOptions", params.userParamsImagesOptions);

  const response = await axiosConfig.get(
    `/users/matching-users?${query.toString()}`,
  );

  console.log(response);

  // @ts-ignore
  const paginationHeader = response.headers.get("pagination");
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

  return { users: response.data, pagination };
}

export async function handleAccountDataUpdate(data: UpdateUserDataRequest) {
  const { initialData, dataToUpdate } = data;
  const formData = new FormData();

  if (initialData.firstName !== dataToUpdate.firstName)
    formData.append("firstName", dataToUpdate.firstName);
  if (initialData.lastName !== dataToUpdate.lastName)
    formData.append("lastName", dataToUpdate.lastName);
  if (initialData.email !== dataToUpdate.email)
    formData.append("email", dataToUpdate.email);
  if (initialData.country !== dataToUpdate.country)
    formData.append("country", dataToUpdate.country);
  if (initialData.city !== dataToUpdate.city)
    formData.append("city", dataToUpdate.city);

  const response = await axiosConfig.patch<void>(
    "/users/change-account-data",
    formData,
  );
  return response.data;
}
