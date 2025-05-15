import { HiOutlineFire, HiOutlineMapPin } from "react-icons/hi2";
import { UserProfile } from "../../types/userProfileTypes.ts";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlineUser } from "react-icons/hi";

const UserProfilePreviewSection = ({
  userProfile,
}: {
  userProfile: UserProfile;
}) => {
  const interests = userProfile.interests || [
    "Music",
    "Travel",
    "Photography",
    "Cooking",
  ];

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="w-full text-white h-auto flex flex-col gap-6">
        <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
          <h2 className="text-3xl font-bold text-gradient mb-2">
            {userProfile.displayName || "User"}
          </h2>
          <div className="flex items-center gap-2 text-gray-300 mb-4">
            <HiOutlineMapPin className="size-5" />
            <span>
              {userProfile.city || "City"}, {userProfile.country || "Country"}
            </span>
          </div>
          <div className="text-lg mb-1">
            Age:{" "}
            <span className="text-pink-200 font-semibold">
              {userProfile.age || "Unknown"}
            </span>
          </div>
          <div className="text-lg">
            Gender:{" "}
            <span className="text-pink-200 font-semibold">
              {userProfile.gender || "Not specified"}
            </span>
          </div>
        </div>

        <div className="w-full aspect-square border-2 border-pink-100 rounded-xl overflow-hidden bg-black-100 flex items-center justify-center">
          {userProfile.mainPhoto ? (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full object-cover"
              src={`data:image/jpeg;base64,${userProfile.mainPhoto?.imageData}`}
              alt={userProfile.displayName || "Profile"}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300">
              <HiOutlineUser className="size-24 stroke-1" />
              <p className="mt-4 text-lg">No profile photo</p>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 w-full h-auto flex flex-col gap-6">
        <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <HiOutlineHeart className="size-6 text-pink-200" />
            About {userProfile.displayName?.split(" ")[0] || "User"}
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {userProfile.bio || "This user hasn't added a bio yet."}
          </p>
        </div>

        <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <HiOutlineFire className="size-6 text-pink-200" />
            Interests
          </h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-black-200 text-pink-200 rounded-full border border-pink-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {interest.interestName}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-white mb-4">
            Match Compatibility
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
            <motion.div
              className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${75}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Low</span>
            <span className="font-bold text-pink-200">{75}% Match</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePreviewSection;
