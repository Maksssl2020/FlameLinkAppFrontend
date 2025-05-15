import { Interest } from "./interestTypes.ts";
import { Image } from "./imageTypes.ts";

export interface User {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  city: string;
  country: string;
  preference: string;
  dateOfBirth: Date;
  lastActive: Date;
  createdAt: string;
  interests: Interest[];
  mainPhoto?: Image;
}

export interface UserDataToUpdate {
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
}

export interface UpdateUserDataRequest {
  initialData: UserDataToUpdate;
  dataToUpdate: UserDataToUpdate;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserParams {
  userUsername?: string;
  minAge?: number;
  maxAge?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface UserRelationshipsRequest {
  sourceUserId: number | string;
  targetUserId: number | string;
}
