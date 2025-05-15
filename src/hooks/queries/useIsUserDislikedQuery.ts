import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { checkIsDisliked } from "../../api/dislikes-api.ts";

function useIsUserDislikedQuery(targetUserId?: number | string) {
  const { userId } = useAuthentication();

  const { data: isDisliked, isFetching: checkingIsDisliked } = useQuery({
    queryKey: ["isUserDislikedData", targetUserId, userId],
    queryFn: async () => {
      if (userId && targetUserId) {
        return await checkIsDisliked(userId, targetUserId);
      }

      return false;
    },
    enabled: !!targetUserId,
  });

  return { isDisliked, checkingIsDisliked };
}

export default useIsUserDislikedQuery;
