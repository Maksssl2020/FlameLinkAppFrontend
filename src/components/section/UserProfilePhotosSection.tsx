import { UserProfile } from "../../types/userProfileTypes.ts";
import { motion } from "framer-motion";
import { HiOutlineUser } from "react-icons/hi";

const UserProfilePhotosSection = ({
  userProfile,
}: {
  userProfile: UserProfile;
}) => {
  const galleryPhotos = userProfile.photos || [];

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="w-full flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-white">Main Photo</h3>
          <div className="aspect-square relative border-2 border-pink-100 rounded-xl overflow-hidden bg-black-100 flex items-center justify-center">
            {userProfile.mainPhoto ? (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full object-cover"
                src={`data:image/jpeg;base64,${userProfile.mainPhoto?.imageData}`}
                alt={userProfile.id.toString()}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-300">
                <HiOutlineUser className="size-24 stroke-1" />
                <p className="mt-4 text-lg">No profile photo</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-6">Photo Gallery</h3>

          {galleryPhotos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="aspect-square relative border-2 border-gray-200 rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02, borderColor: "#FE5487" }}
                >
                  <img
                    src={`data:image/jpeg;base64,${photo.imageData}`}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-black-100 rounded-xl border border-gray-200 p-10">
              <div className="size-16 rounded-full bg-black-200 flex items-center justify-center mb-4">
                <HiOutlineUser className="size-8 text-pink-200" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                No Gallery Photos
              </h4>
              <p className="text-gray-300 text-center">
                {userProfile.displayName?.split(" ")[0] || "This user"} hasn't
                added any gallery photos yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePhotosSection;
