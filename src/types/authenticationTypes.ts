export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterDataState {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date | null;
  gender: "Male" | "Female" | "Other";
  preference: "Males" | "Females" | "Both";
  country: string;
  city: string;
  interests: string[];
}

export interface AuthenticationState {
  userId: number;
  username: string;
  accessToken: string;
  roles: string[];
  isAuthenticated: boolean;
}

export interface AuthenticationResponse {
  userId: number;
  username: string;
  accessToken: string;
  roles: string[];
}
