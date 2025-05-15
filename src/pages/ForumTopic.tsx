import {
  HiHeart,
  HiOutlineArrowLeft,
  HiOutlineClock,
  HiOutlineHeart,
} from "react-icons/hi";
import { ForumPostCategory } from "../types/forumPostTypes.ts";
import { useNavigate, useParams } from "react-router-dom";
import SectionBanner from "../components/banner/SectionBanner.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import SectionContainer from "../components/section/SectionContainer.tsx";
import Page from "../animations/Page.tsx";
import useForumPostByIdQuery from "../hooks/queries/useForumPostByIdQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import useUserByIdQuery from "../hooks/queries/useUserByIdQuery.ts";
import { dateFormat } from "../utils/dateFormat.ts";
import useIsPostLikedByUserQuery from "../hooks/queries/useIsPostLikedByUserQuery.ts";
import useLikeOrUnlikePostMutation from "../hooks/muatations/useLikeOrUnlikePostMutation.ts";

const FORUM_CATEGORIES = [
  { category: "Events", color: "from-yellow-400 to-yellow-200" },
  { category: "AppFeedback", color: "from-blue-400 to-blue-200" },
  { category: "DatingTips", color: "from-purple-400 to-purple-200" },
  { category: "Relationships", color: "from-pink-400 to-pink-200" },
  { category: "SuccessStories", color: "from-green-400 to-green-200" },
];

const ForumTopic = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const { forumPostById, fetchingForumPostById } =
    useForumPostByIdQuery(topicId);

  const { user, fetchingUser } = useUserByIdQuery(forumPostById?.authorId);
  const { isPostLikedByUser, checkingIsPostLikedByUser } =
    useIsPostLikedByUserQuery(topicId);
  const { likeOrUnlikePost, likingOrUnlikingPost } =
    useLikeOrUnlikePostMutation();

  const getCategoryColor = (category: ForumPostCategory) => {
    const foundCategory = FORUM_CATEGORIES.find(
      (cat) => cat.category === category,
    );
    return foundCategory?.color || "from-gray-400 to-gray-200";
  };
  const displayName = `${user?.firstName} ${user?.lastName}`;

  const onLikeOrUnlikeClick = () => {
    if (topicId) {
      likeOrUnlikePost(topicId);
    }
  };

  if (
    fetchingForumPostById ||
    !forumPostById ||
    fetchingUser ||
    !user ||
    checkingIsPostLikedByUser ||
    likingOrUnlikingPost
  ) {
    return <Spinner />;
  }

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title={forumPostById.title}>
          <AnimatedButton
            onClick={() => navigate(-1)}
            className="h-12 px-4 rounded-xl cursor-pointer border-2 border-gray-200 text-white font-bold flex items-center gap-2"
            hoverBackgroundColor="transparent"
            hoverBorderColor="#FE5487"
            hoverTextColor="#FE5487"
          >
            <HiOutlineArrowLeft className="size-5" />
            <span>Back to Forum</span>
          </AnimatedButton>
        </SectionBanner>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">
                  About the Author
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="size-16 rounded-full overflow-hidden mr-4">
                    {user.mainPhoto ? (
                      <img
                        src={`data:image/jpeg;base64,${user.mainPhoto.imageData}`}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-black-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="size-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl font-bold text-black-200">
                              {displayName.charAt(0)}
                            </span>
                          </div>
                          <p className="text-gray-300">No photo available</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {forumPostById.authorName}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Member since {dateFormat(user?.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Dating enthusiast and relationship coach with 5+ years of
                  experience helping people find meaningful connections.
                </p>
                <AnimatedButton
                  className="w-full py-2 rounded-lg border-2 border-gray-300 text-white font-medium"
                  hoverBackgroundColor="#141414"
                  hoverBorderColor="#FE5487"
                  hoverTextColor="#FE5487"
                  onClick={() => navigate(`/user/${forumPostById.authorId}`)}
                >
                  View Profile
                </AnimatedButton>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="size-12 rounded-full overflow-hidden mr-4">
                      {user.mainPhoto ? (
                        <img
                          src={`data:image/jpeg;base64,${user.mainPhoto.imageData}`}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-black-100 flex items-center justify-center">
                          <div className="text-center p-4">
                            <div className="size-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                              <span className="text-4xl font-bold text-black-200">
                                {displayName.charAt(0)}
                              </span>
                            </div>
                            <p className="text-gray-300">No photo available</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {forumPostById.authorName}
                      </h3>
                      <div className="flex items-center text-gray-300 text-sm">
                        <HiOutlineClock className="size-4 mr-1" />
                        <span>{dateFormat(forumPostById.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(forumPostById.category)} text-black-100`}
                  >
                    {forumPostById.category}
                  </div>
                </div>

                <div className="text-white mb-8 whitespace-pre-line leading-relaxed">
                  {forumPostById.content
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>

                <div className="flex flex-wrap justify-between items-center border-t border-gray-700 pt-4">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={onLikeOrUnlikeClick}
                      className={`flex items-center gap-2 text-sm ${isPostLikedByUser ? "text-pink-200" : "text-gray-300"} hover:text-pink-200 transition-colors`}
                    >
                      {isPostLikedByUser ? (
                        <HiHeart className="size-5" />
                      ) : (
                        <HiOutlineHeart className="size-5" />
                      )}
                      <span>{forumPostById.likes} Likes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </Page>
  );
};

export default ForumTopic;
