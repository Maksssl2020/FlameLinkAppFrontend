import { useQuery } from "@tanstack/react-query";
import { fetchDislikedUsers } from "../../api/dislikes-api.ts";

function useUserDislikedUsers(userId: number | string | null) {
  const { data: dislikedUsers, isLoading: fetchingDislikedUsers } = useQuery({
    queryKey: ["dislikedUsers", userId],
    queryFn: async () => {
      if (userId) {
        return await fetchDislikedUsers(userId);
      }
    },
    enabled: !!userId,
  });

  return { dislikedUsers, fetchingDislikedUsers };
}

export default useUserDislikedUsers;
