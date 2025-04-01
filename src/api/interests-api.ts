import axiosConfig from "../config/axiosConfig.ts";
import { Interest } from "../types/interestTypes.ts";

export async function fetchAllInterests(): Promise<Interest[]> {
  const response = await axiosConfig.get<Interest[]>("/interest");
  return response.data;
}

export async function handleCreateInterest(
  interestName: string,
): Promise<void> {
  const response = await axiosConfig.post("/interest/create", {
    interestName: interestName,
  });
  return response.data;
}
