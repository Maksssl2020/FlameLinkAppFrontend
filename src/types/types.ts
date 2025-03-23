export interface SignUpFirstStepData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpSecondStepData {
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other";
  preference: "Males" | "Females" | "Both";
}
