import { UserProfile } from "../../types/userProfileTypes.ts";
import { HiOutlineCalendar, HiOutlineHeart } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";

const UserProfileAboutSection = ({
  userProfile,
}: {
  userProfile: UserProfile;
}) => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="w-full h-auto flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <HiOutlineHeart className="size-6 text-pink-200" />
          About {userProfile.displayName?.split(" ")[0] || "User"}
        </h3>

        <div className="w-full rounded-xl min-h-[300px] border-2 border-gray-200 bg-black-100 p-6">
          <div className="w-full h-full text-white text-lg leading-relaxed">
            {userProfile.bio || "This user hasn't added a bio yet."}
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-white">Personal Details</h3>

        <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-300">
              <HiOutlineLocationMarker className="size-6 text-pink-200" />
              <div>
                <p className="text-sm font-medium text-gray-400">Location</p>
                <p className="text-white">
                  {userProfile.city || "City"},{" "}
                  {userProfile.country || "Country"}
                </p>
              </div>
            </li>

            <li className="flex items-center gap-3 text-gray-300">
              <HiOutlineCalendar className="size-6 text-pink-200" />
              <div>
                <p className="text-sm font-medium text-gray-400">Age</p>
                <p className="text-white">
                  {userProfile.age || "Not specified"} years old
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
          <h4 className="text-xl font-semibold text-pink-200 mb-3">
            Looking For
          </h4>
          <p className="text-gray-300">
            {userProfile.lookingFor ||
              "This user hasn't specified what they're looking for."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileAboutSection;
