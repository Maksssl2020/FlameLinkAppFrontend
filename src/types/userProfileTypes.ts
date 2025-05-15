import { Image } from "./imageTypes.ts";
import { Interest } from "./interestTypes.ts";

export type LookingForType =
  | "Friends"
  | "Serious relationship"
  | "Fun with people"
  | "I don't know yet";

export interface UserProfile {
  id: number;
  ownerId: number;
  displayName: string;
  gender: string;
  preference: string;
  lookingFor: LookingForType;
  city: string;
  country: string;
  age: number;
  bio?: string;
  showGender: boolean;
  showPreference: boolean;
  showCity: boolean;
  showCountry: boolean;
  mainPhotoId?: number;
  mainPhoto?: Image;
  photos: Image[];
  interests: Interest[];
}

export interface UploadProfilePhotoRequest {
  userId: number;
  photo: File;
}

export interface UpdateUserProfileRequest {
  bio?: string;
  lookingFor?: LookingForType;
  interests?: string[];
}
