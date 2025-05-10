import { User } from "../../types/userTypes.ts";
import { motion } from "framer-motion";
import calculateAge from "../../utils/calculateAge.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import {
  HiOutlineCalendar,
  HiOutlineHeart,
  HiOutlineLocationMarker,
  HiOutlineX,
} from "react-icons/hi";
import useLikeUserMutation from "../../hooks/muatations/useLikeUserMutation.ts";
import useDislikeUserMutation from "../../hooks/muatations/useDislikeUserMutation.ts";
import Spinner from "../spinner/Spinner.tsx";
import { useAuthStore } from "../../store/authStore.ts";

type DiscoverUserCardProps = {
  user: User;
};

const DiscoverUserCard = ({ user }: DiscoverUserCardProps) => {
  const { userId } = useAuthStore.getState().authentication;

  const age = calculateAge(user.dateOfBirth.toLocaleString());
  const displayName = `${user.firstName} ${user.lastName}`;
  const location =
    user.city && user.country
      ? `${user.city}, ${user.country}`
      : "Location unknown";

  const { likeUser, likingUser } = useLikeUserMutation();
  const { dislikeUser, dislikingUser } = useDislikeUserMutation();

  if (likingUser || dislikingUser) {
    return <Spinner />;
  }

  const onLikeClick = () => {
    if (userId && user.id) {
      likeUser({
        sourceUserId: userId,
        targetUserId: user.id,
      });
    }
  };

  const onDislikeClick = () => {
    if (userId && user.id) {
      dislikeUser({
        sourceUserId: userId,
        targetUserId: user.id,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-pink-100 transition-all h-full flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
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

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-white">
            {displayName}
            {age > 0 && <span className="ml-2 text-pink-200">{age}</span>}
          </h3>
          <div className="flex items-center text-gray-300 text-sm mt-1">
            <HiOutlineLocationMarker className="size-4 mr-1" />
            <span>{location}</span>
          </div>
          {user.dateOfBirth && user.dateOfBirth.toString() !== "0001-01-01" && (
            <div className="flex items-center text-gray-300 text-sm mt-1">
              <HiOutlineCalendar className="size-4 mr-1" />
              <span>
                Born {new Date(user.dateOfBirth).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {user.interests && user.interests.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.interests.slice(0, 3).map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-black-100 text-pink-200 rounded-full text-xs border border-gray-300"
                >
                  {interest.interestName}
                </span>
              ))}
              {user.interests.length > 3 && (
                <span className="px-2 py-1 bg-black-100 text-gray-300 rounded-full text-xs border border-gray-300">
                  +{user.interests.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto flex gap-2">
          <AnimatedButton
            onClick={() => onDislikeClick()}
            className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-white font-medium flex items-center justify-center"
            hoverBackgroundColor="transparent"
            hoverBorderColor="#FE5487"
            hoverTextColor="#FE5487"
          >
            <HiOutlineX className="size-5" />
          </AnimatedButton>
          <AnimatedButton
            onClick={() => onLikeClick()}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-medium flex items-center justify-center"
            hoverBackgroundColor="#E80352"
            hoverTextColor="#FFFFFF"
          >
            <HiOutlineHeart className="size-5" />
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscoverUserCard;
