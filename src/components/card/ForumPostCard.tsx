import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineHeart, HiOutlineUser } from "react-icons/hi";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { ForumPost } from "../../types/forumPostTypes.ts";
import { useNavigate } from "react-router-dom";

type ForumTopicCardProps = {
  topic: ForumPost;
  topicColor: string;
  topicCategory: string;
};

const ForumPostCard = ({
  topic,
  topicColor,
  topicCategory,
}: ForumTopicCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={topic.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-pink-100 transition-all"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1 flex items-center">
              {topic.title}
            </h3>
            <div className="flex items-center text-gray-300 text-sm">
              <div className="flex items-center mr-4">
                <HiOutlineUser className="size-4 mr-1" />
                <span>{topic.authorName}</span>
              </div>
              <div className="flex items-center mr-4">
                <HiOutlineClock className="size-4 mr-1" />
                <span>{topic.createdAt.toLocaleString().split("T")[0]}</span>
              </div>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${topicColor} text-black-100`}
          >
            {topicCategory}
          </div>
        </div>

        <p className="text-gray-300 mb-4">
          {topic.content.slice(0, 125).concat("...")}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center">
              <HiOutlineHeart className="size-4 mr-1" />
              <span>{topic.likes} likes</span>
            </div>
          </div>

          <AnimatedButton
            onClick={() => navigate(`/forum/topic/${topic.id}`)}
            className="px-4 py-2 rounded-lg border-2 border-gray-300 text-white font-medium"
            hoverBackgroundColor="transparent"
            hoverBorderColor="#FE5487"
            hoverTextColor="#FE5487"
          >
            View Topic
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

export default ForumPostCard;
