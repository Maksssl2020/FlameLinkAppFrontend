export interface SignUpFirstStepData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpSecondStepData {
  country: string;
  city: string;
  dateOfBirth: Date | null;
  gender: "Male" | "Female" | "Other";
  preference: "Males" | "Females" | "Both";
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  details?: string;
}

export interface SectionType {
  name: string;
  url: string;
}
