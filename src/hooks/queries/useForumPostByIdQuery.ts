import { useQuery } from "@tanstack/react-query";
import { fetchForumPostById } from "../../api/forum-posts-api.ts";

function useForumPostByIdQuery(postId?: number | string) {
  const { data: forumPostById, isLoading: fetchingForumPostById } = useQuery({
    queryKey: ["forumPostById", postId],
    queryFn: async () => {
      if (postId) {
        return await fetchForumPostById(postId);
      }
    },
    enabled: !!postId,
  });

  return { forumPostById, fetchingForumPostById };
}

export default useForumPostByIdQuery;
