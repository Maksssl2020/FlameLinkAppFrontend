import { useQuery } from "@tanstack/react-query";
import { fetchUserProfileByUserId } from "../../api/users-profiles-api.ts";

function useUserProfileByUserIdQuery(userId?: number) {
  const { data: userProfileByUserId, isLoading: fetchingUserProfileByUserId } =
    useQuery({
      queryKey: ["userProfile", userId],
      queryFn: () => {
        if (userId) {
          return fetchUserProfileByUserId(userId);
        }
      },
      enabled: userId !== undefined,
    });

  return { userProfileByUserId, fetchingUserProfileByUserId };
}

export default useUserProfileByUserIdQuery;
