import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { motion } from "framer-motion";
import { User } from "../../types/userTypes.ts";
import calculateAge from "../../utils/calculateAge.ts";
import { useNavigate } from "react-router-dom";
import useCreateConversationMutation from "../../hooks/muatations/useCreateConversationMutation.ts";
import Spinner from "../spinner/Spinner.tsx";

const MatchedUserCard = ({ matchedUser }: { matchedUser: User }) => {
  const navigate = useNavigate();
  const age = calculateAge(matchedUser.dateOfBirth.toLocaleString());
  const displayName = `${matchedUser.firstName} ${matchedUser.lastName}`;
  const location =
    matchedUser.city && matchedUser.country
      ? `${matchedUser.city}, ${matchedUser.country}`
      : "Location unknown";

  const { createConversation, creatingConversation } =
    useCreateConversationMutation();

  const handleCreateConversation = () => {
    if (matchedUser.id) {
      createConversation(matchedUser.id);
      navigate("/dashboard/messages");
    }
  };

  if (creatingConversation) {
    return <Spinner />;
  }

  return (
    <motion.div
      key={matchedUser.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden mb-6 hover:border-pink-100 transition-all"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 lg:w-1/4">
          {matchedUser.mainPhoto ? (
            <img
              src={`data:image/jpeg;base64,${matchedUser.mainPhoto.imageData}`}
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

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {displayName}, {age}
              </h3>
              <div className="flex items-center text-gray-300 mt-1 text-sm">
                <HiOutlineLocationMarker className="size-4 mr-1" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 my-4">
            {matchedUser.interests.map((interest, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-black-100 text-pink-200 rounded-full text-xs border border-gray-300"
              >
                {interest.interestName}
              </span>
            ))}
          </div>

          <p className="text-gray-300 mb-6 flex-grow">
            You and {displayName.split(" ")[0]} have a strong connection based
            on shared interests. Start a conversation to learn more about each
            other!
          </p>

          <div className="flex gap-3 mt-auto">
            <AnimatedButton
              onClick={handleCreateConversation}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-medium flex items-center justify-center gap-2"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              <HiOutlineChat className="size-5" />
              <span>Start Conversation</span>
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigate(`/user/${matchedUser.id}`)}
              className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-white font-medium flex items-center justify-center gap-2"
              hoverBackgroundColor="#141414"
              hoverBorderColor="#FE5487"
              hoverTextColor="#FE5487"
            >
              <HiOutlineHeart className="size-5" />
              <span>View Full Profile</span>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchedUserCard;
