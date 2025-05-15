"use client";

import { motion } from "framer-motion";
import {
  HiOutlineChat,
  HiOutlineLocationMarker,
  HiOutlineX,
} from "react-icons/hi";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { User } from "../../types/userTypes.ts";
import calculateAge from "../../utils/calculateAge.ts";
import useAuthentication from "../../hooks/useAuthentication.ts";
import useRemoveUserDislike from "../../hooks/muatations/useRemoveUserDislike.ts";
import Spinner from "../spinner/Spinner.tsx";
import { useNavigate } from "react-router-dom";

type DislikedUserCardProps = {
  user: User;
};

const DislikedUserCard = ({ user }: DislikedUserCardProps) => {
  const userId = useAuthentication().userId;
  const navigate = useNavigate();

  const age = calculateAge(user.dateOfBirth.toLocaleString());
  const displayName = `${user.firstName} ${user.lastName}`;
  const location =
    user.city && user.country
      ? `${user.city}, ${user.country}`
      : "Location unknown";

  const { removeUserDislike, removingUserDislike } = useRemoveUserDislike();

  const onRemoveUserDislike = () => {
    if (userId && user.id) {
      removeUserDislike({
        sourceUserId: userId,
        targetUserId: user.id,
      });
    }
  };

  if (removingUserDislike) {
    return <Spinner />;
  }

  return (
    <motion.div
      onClick={() => navigate(`/user/${user.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-pink-100 transition-all"
    >
      <div className="relative">
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
        <div className="absolute top-3 right-3 flex gap-2">
          <AnimatedButton
            onClick={() => onRemoveUserDislike()}
            className="size-10 rounded-full bg-black-100/80 backdrop-blur-sm flex items-center justify-center text-white border border-gray-200"
          >
            <HiOutlineX className="size-5" />
          </AnimatedButton>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">
            {displayName}, {age}
          </h3>
        </div>

        <div className="flex items-center text-gray-300 mb-3 text-sm">
          <HiOutlineLocationMarker className="size-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {user.interests.map((interest, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-black-100 text-gray-300 rounded-full text-xs border border-gray-300"
            >
              {interest.interestName}
            </span>
          ))}
        </div>

        <AnimatedButton
          className="flex-1 py-2 w-full rounded-lg border-2 border-gray-300 text-white font-medium flex items-center justify-center gap-1"
          hoverBackgroundColor="transparent"
          hoverBorderColor="#FE5487"
          hoverTextColor="#FE5487"
          onClick={() => navigate(`/user/${user.id}`)}
        >
          <HiOutlineChat className="size-4" />
          <span>View Profile</span>
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default DislikedUserCard;
