import { Image } from "./imageTypes.ts";
import { Interest } from "./interestTypes.ts";

export interface UserProfile {
  id: number;
  ownerId: number;
  displayName: string;
  gender: string;
  preference: string;
  lookingFor: string;
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

export interface UploadProfileMainPhotoRequest {
  userId: number;
  photo: File;
}
