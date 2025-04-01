import { create } from "zustand/react";
import { persist, PersistStorage } from "zustand/middleware";
import { RegisterDataState } from "../types/authenticationTypes.ts";

interface SignUpState {
  signUpData: RegisterDataState;
  setSignUpData: (state: Partial<RegisterDataState>) => void;
  clearData: () => void;
}

const initialState: RegisterDataState = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  dateOfBirth: null,
  gender: "Male",
  preference: "Males",
  country: "",
  city: "",
  interests: [],
};

const sessionStorageAdapter: PersistStorage<SignUpState> = {
  getItem: (key) => {
    const storedValue = sessionStorage.getItem(key);
    if (!storedValue) return null;

    return JSON.parse(storedValue);
  },
  setItem: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  },
};

export const useSignUpStore = create<SignUpState>()(
  persist(
    (setState) => ({
      signUpData: initialState,
      setSignUpData: (data) =>
        setState((state) => ({ signUpData: { ...state.signUpData, ...data } })),
      clearData: () => {
        sessionStorage.removeItem("signUpStorage");
        setState({ signUpData: initialState });
      },
    }),
    {
      name: "signUpStorage",
      storage: sessionStorageAdapter,
    },
  ),
);
