import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { checkIsPostLikedByUser } from "../../api/forum-posts-api.ts";

function useIsPostLikedByUserQuery(postId?: number | string) {
  const { userId } = useAuthentication();

  const { data: isPostLikedByUser, isLoading: checkingIsPostLikedByUser } =
    useQuery({
      queryKey: ["isPostLikedByUser", postId, userId],
      queryFn: async () => {
        if (postId && userId) {
          return await checkIsPostLikedByUser(postId, userId);
        }
      },
      enabled: postId !== undefined && userId !== undefined && userId !== null,
    });

  return { isPostLikedByUser, checkingIsPostLikedByUser };
}

export default useIsPostLikedByUserQuery;
