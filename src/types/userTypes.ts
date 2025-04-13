import { Interest } from "./interestTypes.ts";

export interface User {
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
  createdAt: Date;
  interests: Interest[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
