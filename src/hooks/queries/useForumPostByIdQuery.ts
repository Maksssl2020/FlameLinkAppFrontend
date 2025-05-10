import { useQuery } from "@tanstack/react-query";
import { fetchForumPostById } from "../../api/fodum-posts-api.ts";

function useForumPostByIdQuery(postId: number) {
  const { data: forumPostById, isLoading: fetchingForumPostById } = useQuery({
    queryKey: ["forumPostById", postId],
    queryFn: () => fetchForumPostById(postId),
  });

  return { forumPostById, fetchingForumPostById };
}

export default useForumPostByIdQuery;
