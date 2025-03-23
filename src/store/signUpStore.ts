import { create } from "zustand/react";

interface SignUpState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
  preference: "Males" | "Females" | "Both";
  interests: [];
  setSignUpData: (state: Partial<SignUpState>) => void;
}

export const useSignUpStore = create<SignUpState>((setState) => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthDate: "",
  gender: "Male",
  preference: "Males",
  interests: [],
  setSignUpData: (data) => setState((state) => ({ ...state, ...data })),
}));
