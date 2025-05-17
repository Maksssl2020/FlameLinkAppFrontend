import { LookingForType } from "./userProfileTypes.ts";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterDataState {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  city: string;
  country: string;
  preference: "Males" | "Females" | "Both";
  dateOfBirth: Date | null;
  lookingFor: LookingForType;
  interests: string[];
}

export interface AuthenticationState {
  userId: number | null;
  username: string | null;
  accessToken: string | null;
  roles: string[];
  isAuthenticated: boolean;
}

export interface AuthenticationResponse {
  userId: number;
  username: string;
  accessToken: string;
  roles: string[];
}
