import { UserParams } from "../types/userTypes.ts";
import { create } from "zustand/react";

interface UserFilterParamsStore {
  userParams: UserParams;
  setUserParams: (params: UserParams) => void;
}

const initialUserParams: UserParams = {
  userUsername: "",
  minAge: 18,
  maxAge: 99,
  pageNumber: 0,
  pageSize: 20,
};

export const useUserFilterParamsStore = create<UserFilterParamsStore>(
  (setState) => ({
    userParams: initialUserParams,
    setUserParams: (params) => setState({ userParams: params }),
  }),
);
