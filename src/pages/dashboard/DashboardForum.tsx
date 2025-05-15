import { AnimatePresence, motion } from "framer-motion";
import Page from "../../animations/Page.tsx";
import { useState } from "react";
import {
  HiOutlineChat,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineTag,
} from "react-icons/hi";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import Modal from "../../components/modal/Modal.tsx";
import FormTextArea from "../../components/textarea/FormTextArea.tsx";
import FormInput from "../../components/input/FormInput.tsx";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import useForumPostsQuery from "../../hooks/queries/useForumPostsQuery.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import useAddForumPostMutation from "../../hooks/muatations/useAddForumPostMutation.ts";
import { useForm } from "react-hook-form";
import { ForumPostCategory } from "../../types/forumPostTypes.ts";
import useAuthentication from "../../hooks/useAuthentication.ts";
import ForumPostCard from "../../components/card/ForumPostCard.tsx";

type ForumCategoryToSelect = {
  name: string;
  category: ForumPostCategory;
  color: string;
};

const ForumCategoriesToSelect: ForumCategoryToSelect[] = [
  {
    name: "Events",
    category: "Events",
    color: "from-yellow-400 to-yellow-200",
  },
  {
    name: "App Feedback",
    category: "AppFeedback",
    color: "from-blue-400 to-blue-200",
  },
  {
    name: "Dating Tips",
    category: "DatingTips",
    color: "from-purple-400 to-purple-200",
  },
  {
    name: "Relationships",
    category: "Relationships",
    color: "from-pink-400 to-pink-200",
  },
  {
    name: "Success Stories",
    category: "SuccessStories",
    color: "from-green-400 to-green-200",
  },
];

const DashboardForum = () => {
  const { userId } = useAuthentication();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ForumPostCategory | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [createPostCategory, setCreatePostCategory] =
    useState<ForumPostCategory>("Events");
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { forumPosts, fetchingForumPosts } = useForumPostsQuery();
  const { addForumPost, addingForumPost } = useAddForumPostMutation();

  const handleSort = (type: "recent" | "popular") => {
    setSortBy(type);
    setIsFilterOpen(false);
  };

  const getCategoryColor = (categoryValue: string) => {
    const category = ForumCategoriesToSelect.find(
      (cat) => cat.category === categoryValue,
    );
    return category?.color || "from-gray-400 to-gray-200";
  };

  const onSubmit = ({ title, content }: { title: string; content: string }) => {
    if (userId) {
      addForumPost({
        userId: userId,
        content: content,
        title: title,
        category: createPostCategory,
      });
      setIsNewTopicModalOpen(false);
    }
  };

  if (fetchingForumPosts || addingForumPost) {
    return <Spinner />;
  }

  const filteredTopics = forumPosts?.filter(
    (post) =>
      (searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === null || post.category === selectedCategory),
  );

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="Community Forum">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 pr-4 rounded-xl bg-black-200 border-2 border-gray-200 text-white focus:border-pink-100 outline-none transition-colors w-[200px]"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 size-5" />
            </div>

            <div className="relative">
              <AnimatedButton
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="size-12 rounded-xl cursor-pointer border-2 border-pink-100 bg-black-200 text-white hover:bg-pink-100 hover:text-black-100 transition-all flex items-center justify-center"
                hoverBackgroundColor="#E80352"
                hoverTextColor="#FFFFFF"
              >
                <HiOutlineFilter className="size-6" />
              </AnimatedButton>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-black-200 border-2 border-pink-100 rounded-xl shadow-lg overflow-hidden z-10"
                  >
                    <div className="py-2">
                      <button
                        onClick={() => handleSort("recent")}
                        className={`w-full px-4 py-3 text-left hover:bg-black-100 transition-colors flex items-center gap-2 ${
                          sortBy === "recent" ? "text-pink-200" : "text-white"
                        }`}
                      >
                        <span>Most Recent</span>
                        {sortBy === "recent" && (
                          <span className="ml-auto">✓</span>
                        )}
                      </button>
                      <button
                        onClick={() => handleSort("popular")}
                        className={`w-full px-4 py-3 text-left hover:bg-black-100 transition-colors flex items-center gap-2 ${
                          sortBy === "popular" ? "text-pink-200" : "text-white"
                        }`}
                      >
                        <span>Most Popular</span>
                        {sortBy === "popular" && (
                          <span className="ml-auto">✓</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatedButton
              onClick={() => setIsNewTopicModalOpen(true)}
              className="h-12 px-4 rounded-xl cursor-pointer bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold flex items-center gap-2"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              <HiOutlinePlus className="size-5" />
              <span>New Topic</span>
            </AnimatedButton>
          </div>
        </SectionBanner>

        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-white">Categories</h3>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full px-4 py-3 rounded-lg text-left mb-1 transition-colors ${
                    selectedCategory === null
                      ? "bg-gradient-to-r from-pink-400 to-pink-200 text-black-100 font-bold"
                      : "text-white hover:bg-black-100"
                  }`}
                >
                  All Topics
                </button>

                {ForumCategoriesToSelect.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setSelectedCategory(category.category)}
                    className={`w-full px-4 py-3 rounded-lg text-left mb-1 transition-colors flex items-center ${
                      selectedCategory === category.category
                        ? `bg-gradient-to-r ${category.color} text-black-100 font-bold`
                        : "text-white hover:bg-black-100"
                    }`}
                  >
                    <HiOutlineTag className="size-4 mr-2" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            {filteredTopics !== undefined && filteredTopics?.length > 0 ? (
              <div className="space-y-4">
                {filteredTopics?.map((topic) => (
                  <ForumPostCard
                    topic={topic}
                    topicColor={getCategoryColor(topic.category)}
                    topicCategory={topic.category}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-black-200 rounded-xl border-2 border-gray-200 p-10">
                <div className="size-20 rounded-full bg-black-100 flex items-center justify-center mb-4">
                  <HiOutlineChat className="size-10 text-pink-200" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Topics Found
                </h3>
                <p className="text-gray-300 text-center max-w-md mb-6">
                  {searchQuery
                    ? `We couldn't find any topics matching "${searchQuery}".`
                    : "There are no topics in this category yet."}
                </p>
                <div className="flex gap-4">
                  {searchQuery && (
                    <AnimatedButton
                      onClick={() => setSearchQuery("")}
                      className="px-6 py-3 rounded-xl border-2 border-gray-300 text-white font-bold"
                      hoverBackgroundColor="transparent"
                      hoverBorderColor="#FE5487"
                      hoverTextColor="#FE5487"
                    >
                      Clear Search
                    </AnimatedButton>
                  )}
                  <AnimatedButton
                    onClick={() => setIsNewTopicModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold"
                    hoverBackgroundColor="#E80352"
                    hoverTextColor="#FFFFFF"
                  >
                    Create New Topic
                  </AnimatedButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>

      {/* New Topic Modal */}
      <AnimatePresence>
        {isNewTopicModalOpen && (
          <Modal>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-[500px] max-w-2xl bg-black-200 rounded-xl border-2 border-pink-100 shadow-lg shadow-pink-100/10 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Create New Topic
              </h2>

              <form className="space-y-4">
                <FormInput title="Topic Title" type="text" formType="default" />

                <div className="flex flex-col gap-2">
                  <label className="text-white text-lg font-medium">
                    Category
                  </label>
                  <select
                    value={createPostCategory}
                    onChange={(e) => {
                      setCreatePostCategory(
                        e.target.value as ForumPostCategory,
                      );
                    }}
                    className="w-full h-[55px] bg-black-100 border-2 border-gray-200 rounded-xl px-4 text-white"
                  >
                    {ForumCategoriesToSelect.map((category) => (
                      <option key={category.name} value={category.category}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <FormTextArea
                  error={errors?.content?.message}
                  register={register("content")}
                  title="Topic Content"
                  height="h-[200px]"
                />

                <div className="flex gap-4 pt-4">
                  <AnimatedButton
                    onClick={() => setIsNewTopicModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-white font-bold"
                    hoverBackgroundColor="transparent"
                    hoverBorderColor="#FE5487"
                    hoverTextColor="#FE5487"
                    type="button"
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold"
                    hoverBackgroundColor="#E80352"
                    hoverTextColor="#FFFFFF"
                    type="button"
                    onClick={handleSubmit((data) => onSubmit(data))}
                  >
                    Create Topic
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default DashboardForum;
