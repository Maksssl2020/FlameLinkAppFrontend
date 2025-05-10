"use client";

import { motion } from "framer-motion";
import {
  HiOutlineChat,
  HiOutlineLocationMarker,
  HiOutlineRefresh,
  HiOutlineX,
} from "react-icons/hi";
import AnimatedButton from "../button/AnimatedButton.tsx";

type DislikedUserCardProps = {
  user: {
    id: number;
    name: string;
    age: number;
    location: string;
    interests: string[];
    avatar: string;
    matchPercentage: number;
    dislikedAt?: string;
  };
  onRemoveDislike?: (userId: number) => void;
  onUndoDislike?: (userId: number) => void;
};

const DislikedUserCard = ({
  user,
  onRemoveDislike,
  onUndoDislike,
}: DislikedUserCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-pink-100 transition-all"
    >
      <div className="relative">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-full aspect-square object-cover opacity-80 grayscale"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemoveDislike?.(user.id)}
            className="size-10 rounded-full bg-black-100/80 backdrop-blur-sm flex items-center justify-center text-white border border-gray-200"
          >
            <HiOutlineX className="size-5" />
          </motion.button>
        </div>
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-gray-400 to-gray-200 text-black-100 font-bold px-3 py-1 rounded-full text-sm">
          {user.matchPercentage}% Match
        </div>
        {user.dislikedAt && (
          <div className="absolute bottom-3 right-3 bg-black-100/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
            Disliked {user.dislikedAt}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">
            {user.name}, {user.age}
          </h3>
        </div>

        <div className="flex items-center text-gray-300 mb-3 text-sm">
          <HiOutlineLocationMarker className="size-4 mr-1" />
          <span>{user.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {user.interests.map((interest, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-black-100 text-gray-300 rounded-full text-xs border border-gray-300"
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <AnimatedButton
            onClick={() => onUndoDislike?.(user.id)}
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 text-black-100 font-medium flex items-center justify-center gap-1"
            hoverBackgroundColor="#E80352"
            hoverTextColor="#FFFFFF"
          >
            <HiOutlineRefresh className="size-4" />
            <span>Undo Dislike</span>
          </AnimatedButton>
          <AnimatedButton
            className="flex-1 py-2 rounded-lg border-2 border-gray-300 text-white font-medium flex items-center justify-center gap-1"
            hoverBackgroundColor="transparent"
            hoverBorderColor="#FE5487"
            hoverTextColor="#FE5487"
          >
            <HiOutlineChat className="size-4" />
            <span>View Profile</span>
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

export default DislikedUserCard;
