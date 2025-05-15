import Page from "../../animations/Page.tsx";
import { UserProfile } from "../../types/userProfileTypes.ts";
import {
  HiOutlineCheck,
  HiOutlinePencil,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useState } from "react";
import AnimatedButton from "../button/AnimatedButton.tsx";
import useUpdateUserProfileMutation from "../../hooks/muatations/useUpdateUserProfileMutation.ts";
import Spinner from "../spinner/Spinner.tsx";

type AccountProfileAboutYouSectionProps = {
  userProfile: UserProfile;
};

const AccountProfileAboutYouSection = ({
  userProfile,
}: AccountProfileAboutYouSectionProps) => {
  const initialBioText = userProfile.bio;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [bioText, setBioText] = useState<string>(userProfile.bio || "");

  const { updateUserProfile, updatingUserProfile } =
    useUpdateUserProfileMutation();

  const handleCancel = () => {
    setBioText(userProfile.bio || "");
    setIsEditing(false);
  };

  const onSubmit = () => {
    if (initialBioText !== bioText) {
      updateUserProfile({
        bio: bioText,
      });
    }

    setIsEditing(false);
  };

  if (updatingUserProfile) {
    return <Spinner />;
  }

  return (
    <Page>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-auto flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">About You</h3>
          </div>

          <div className="w-full relative rounded-xl min-h-[500px] border-2 border-pink-100 overflow-hidden bg-black-100">
            {!isEditing ? (
              <>
                <AnimatedButton
                  onClick={() => setIsEditing(true)}
                  className="absolute right-3 top-3 cursor-pointer size-12 flex items-center justify-center text-white rounded-full border-2 border-pink-100 z-10 bg-black-200"
                  hoverBackgroundColor="#E80352"
                  hoverTextColor="#FFFFFF"
                >
                  <HiOutlinePencil className="size-6" />
                </AnimatedButton>

                <div className="w-full h-full p-6 text-white text-lg leading-relaxed">
                  {bioText || "Tell others something about yourself..."}
                </div>
              </>
            ) : (
              <>
                <div className="absolute right-3 top-3 flex gap-2 z-10">
                  <AnimatedButton
                    onClick={onSubmit}
                    className="cursor-pointer size-12 flexitems-center justify-center text-white rounded-full border-2 border-green-100 bg-black-200"
                    hoverBackgroundColor="#0DB063"
                    hoverTextColor="#FFFFFF"
                  >
                    <HiOutlineCheck className="size-6" />
                  </AnimatedButton>

                  <AnimatedButton
                    onClick={handleCancel}
                    className="cursor-pointer size-12 flex items-center justify-center text-white rounded-full border-2 border-pink-100 bg-black-200"
                    hoverBackgroundColor="#E80352"
                    hoverTextColor="#FFFFFF"
                  >
                    <HiOutlineXMark className="size-6" />
                  </AnimatedButton>
                </div>

                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full h-full resize-none p-6 bg-black-100 text-white text-lg border-0 outline-none focus:ring-0 focus:outline-none"
                  placeholder="Tell others something about yourself..."
                />
              </>
            )}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-white">Writing Tips</h3>

          <div className="bg-black-100 rounded-xl p-6 border border-gray-200">
            <h4 className="text-xl font-semibold text-pink-200 mb-3">
              Be Authentic
            </h4>
            <p className="text-gray-300 mb-6">
              Share your genuine interests and personality. Authenticity helps
              you connect with like-minded people.
            </p>

            <h4 className="text-xl font-semibold text-pink-200 mb-3">
              Be Specific
            </h4>
            <p className="text-gray-300 mb-6">
              Instead of "I like music," try "I love discovering indie folk
              bands and attend local concerts monthly."
            </p>

            <h4 className="text-xl font-semibold text-pink-200 mb-3">
              Be Positive
            </h4>
            <p className="text-gray-300 mb-6">
              Focus on what you're looking for rather than what you want to
              avoid. Positive profiles attract more connections.
            </p>

            <h4 className="text-xl font-semibold text-pink-200 mb-3">
              Be Concise
            </h4>
            <p className="text-gray-300">
              Keep your bio engaging and to the point. Aim for 150-300 words
              that capture your essence.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AccountProfileAboutYouSection;
