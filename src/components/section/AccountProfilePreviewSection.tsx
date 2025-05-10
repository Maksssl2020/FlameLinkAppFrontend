import Page from "../../animations/Page.tsx";
import { UserProfile } from "../../types/userProfileTypes.ts";
import {
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlineHeart,
  HiOutlineFire,
} from "react-icons/hi2";
import { motion } from "framer-motion";

type AccountProfilePreviewSectionProps = {
  userProfile: UserProfile;
};

const AccountProfilePreviewSection = ({
  userProfile,
}: AccountProfilePreviewSectionProps) => {
  const interests = userProfile.interests || [
    "Music",
    "Travel",
    "Photography",
    "Cooking",
  ];

  return (
    <Page>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="w-full text-white h-auto flex flex-col gap-6">
          <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-gradient mb-2">
              {userProfile.displayName || "Your Name"}
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
                {userProfile.age || "25"}
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
                <p className="mt-4 text-lg">No profile photo yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 w-full h-auto flex flex-col gap-6">
          <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <HiOutlineHeart className="size-6 text-pink-200" />
              About Me
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {userProfile.bio ||
                "This is how your bio will appear to others. Add information about yourself, your interests, and what you're looking for on FlameLink."}
            </p>
          </div>

          <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <HiOutlineFire className="size-6 text-pink-200" />
              My Interests
            </h3>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-black-200 text-pink-200 rounded-full border border-pink-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {interest}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-white mb-4">
              Profile Completeness
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
              <motion.div
                className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: userProfile.mainPhoto ? "80%" : "40%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="text-gray-300">
              {userProfile.mainPhoto
                ? "Your profile is almost complete! Add more photos to increase visibility."
                : "Add a profile photo to significantly improve your profile completeness."}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AccountProfilePreviewSection;
