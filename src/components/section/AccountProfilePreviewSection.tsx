import Page from "../../animations/Page.tsx";
import { LookingForType, UserProfile } from "../../types/userProfileTypes.ts";
import {
  HiOutlineEye,
  HiOutlineFire,
  HiOutlineHeart,
  HiOutlineMapPin,
  HiOutlinePencil,
  HiOutlineUser,
} from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { useEffect, useRef, useState } from "react";
import ManageInterestsPanel from "../panel/ManageInterestsPanel.tsx";
import Modal from "../modal/Modal.tsx";
import { isTextArrayEqual } from "../../utils/isArrayEqual.ts";
import ChangeLookingForStatusPanel from "../panel/ChangeLookingForStatusPanel.tsx";
import useUpdateUserProfileMutation from "../../hooks/muatations/useUpdateUserProfileMutation.ts";
import Spinner from "../spinner/Spinner.tsx";

type AccountProfilePreviewSectionProps = {
  userProfile: UserProfile;
};

type InitialUserProfileData = {
  bio?: string;
  interests: string[];
  lookingFor: LookingForType;
};

const AccountProfilePreviewSection = ({
  userProfile,
}: AccountProfilePreviewSectionProps) => {
  const [isManageInterestsPanelOpen, setIsManageInterestsPanelOpen] =
    useState<boolean>(false);
  const initialUserData = useRef<InitialUserProfileData>({
    bio: userProfile.bio,
    interests: userProfile.interests.map((interest) => interest.interestName),
    lookingFor: userProfile.lookingFor,
  });

  const [interestsToUpdate, setInterestsToUpdate] = useState<string[]>(
    userProfile.interests.map((interest) => interest.interestName),
  );
  const [
    isChangeLookingForStatusPanelOpen,
    setIsChangeLookingForStatusPanelOpen,
  ] = useState<boolean>(false);
  const [chosenLookingForStatus, setChosenLookingForStatus] =
    useState<LookingForType>(userProfile.lookingFor);
  const [isChange, setIsChange] = useState<boolean>(false);

  const { updateUserProfile, updatingUserProfile } =
    useUpdateUserProfileMutation();

  useEffect(() => {
    const interestsChanged = !isTextArrayEqual(
      initialUserData.current.interests,
      interestsToUpdate,
    );
    const lookingForChanged =
      chosenLookingForStatus !== initialUserData.current.lookingFor;

    setIsChange(interestsChanged || lookingForChanged);
  }, [interestsToUpdate, chosenLookingForStatus]);

  const onSubmit = () => {
    if (interestsToUpdate.length > 0) {
      updateUserProfile({
        interests: isTextArrayEqual(
          initialUserData.current.interests,
          interestsToUpdate,
        )
          ? []
          : interestsToUpdate,
        lookingFor: chosenLookingForStatus,
      });

      initialUserData.current = {
        bio: userProfile.bio,
        interests: interestsToUpdate,
        lookingFor: chosenLookingForStatus,
      };

      setIsChange(false);
    }
  };

  if (updatingUserProfile) {
    return <Spinner />;
  }

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

          <div className="relative bg-black-100 rounded-xl p-6 border border-gray-200">
            <AnimatedButton
              onClick={() => setIsManageInterestsPanelOpen(true)}
              className="absolute right-3 top-3 cursor-pointer size-10 flex items-center justify-center text-white rounded-full border-2 border-pink-100 z-10 bg-black-200"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              <HiOutlinePencil className="size-5" />
            </AnimatedButton>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <HiOutlineFire className="size-6 text-pink-200" />
              My Interests
            </h3>
            <div className="flex flex-wrap gap-3">
              {userProfile.interests.map((interest, index) => (
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

          <div className="bg-black-100 relative rounded-xl p-6 border border-gray-200">
            <AnimatedButton
              onClick={() => setIsChangeLookingForStatusPanelOpen(true)}
              className="absolute right-3 top-3 cursor-pointer size-10 flex items-center justify-center text-white rounded-full border-2 border-pink-100 z-10 bg-black-200"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              <HiOutlinePencil className="size-5" />
            </AnimatedButton>
            <h3 className=" text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <HiOutlineEye className="size-6 text-pink-200" />
              Looking For
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {userProfile.lookingFor || ""}
            </p>
          </div>
          <div className={"w-full h-auto justify-end flex mt-auto"}>
            {isChange && (
              <AnimatedButton
                onClick={onSubmit}
                className={
                  "h-[50px] border-2 px-8 rounded-lg bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100"
                }
              >
                Save Changes
              </AnimatedButton>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isManageInterestsPanelOpen && (
          <Modal>
            <ManageInterestsPanel
              interests={userProfile.interests}
              onClose={() => setIsManageInterestsPanelOpen(false)}
              onConfirm={(interests) => setInterestsToUpdate(interests)}
            />
          </Modal>
        )}
        {isChangeLookingForStatusPanelOpen && (
          <Modal>
            <ChangeLookingForStatusPanel
              onClose={() => setIsChangeLookingForStatusPanelOpen(false)}
              lookingForStatus={chosenLookingForStatus}
              onConfirm={(type) => setChosenLookingForStatus(type)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default AccountProfilePreviewSection;
