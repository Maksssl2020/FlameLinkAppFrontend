import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { checkIsLiked } from "../../api/matches-api.ts";

function useIsUserLikedQuery(targetUserId?: number | string) {
  const { userId } = useAuthentication();

  console.log("userId:", userId, "targetUserId:", targetUserId);

  const { data: isLiked, isFetching: checkingIsLiked } = useQuery({
    queryKey: ["isUserLikedData", targetUserId, userId],
    queryFn: async () => {
      if (userId && targetUserId) {
        return await checkIsLiked(userId, targetUserId);
      }
      return false;
    },

    enabled: !!targetUserId,
  });

  return { isLiked, checkingIsLiked };
}

export default useIsUserLikedQuery;
