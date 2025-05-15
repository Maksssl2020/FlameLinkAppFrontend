import SectionContainer from "../components/section/SectionContainer.tsx";
import Page from "../animations/Page.tsx";
import SectionBanner from "../components/banner/SectionBanner.tsx";
import { useNavigate, useParams } from "react-router-dom";
import useUserProfileByUserIdQuery from "../hooks/queries/useUserProfileByUserIdQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineChat, HiOutlineHeart, HiOutlineX } from "react-icons/hi";
import UserProfilePreviewSection from "../components/section/UserProfilePreviewSection.tsx";
import UserProfileAboutSection from "../components/section/UserProfileAboutSection.tsx";
import UserProfilePhotosSection from "../components/section/UserProfilePhotosSection.tsx";
import useIsUserDislikedQuery from "../hooks/queries/useIsUserDislikedQuery.ts";
import useIsUserLikedQuery from "../hooks/queries/useIsUserLikedQuery.ts";
import useDislikeUserMutation from "../hooks/muatations/useDislikeUserMutation.ts";
import useLikeUserMutation from "../hooks/muatations/useLikeUserMutation.ts";
import useRemoveUserDislike from "../hooks/muatations/useRemoveUserDislike.ts";
import useRemoveLikeMutation from "../hooks/muatations/useRemoveLikeMutation.ts";
import useAuthentication from "../hooks/useAuthentication.ts";

type ProfileSection = {
  title: string;
  value: "profilePreview" | "aboutUser" | "photos";
};

const profileSections: ProfileSection[] = [
  {
    title: "Profile Preview",
    value: "profilePreview",
  },
  {
    title: "About User",
    value: "aboutUser",
  },
  {
    title: "Photos",
    value: "photos",
  },
];

const UserProfile = () => {
  const { userId: userProfileId } = useParams();
  const { userId } = useAuthentication();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    "profilePreview" | "aboutUser" | "photos"
  >("profilePreview");
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeButton, setActiveButton] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleTabChange = (
    index: number,
    value: "profilePreview" | "aboutUser" | "photos",
  ) => {
    setActiveSection(value);
    setActiveButton(buttonRefs.current[index]);
  };

  useEffect(() => {
    const index = profileSections.findIndex((s) => s.value === activeSection);
    if (index !== -1) {
      setActiveButton(buttonRefs.current[index]);
    }
  }, [activeSection]);

  const { userProfileByUserId, fetchingUserProfileByUserId } =
    useUserProfileByUserIdQuery(userProfileId);

  const { isDisliked, checkingIsDisliked } =
    useIsUserDislikedQuery(userProfileId);

  const { isLiked, checkingIsLiked } = useIsUserLikedQuery(userProfileId);

  const { dislikeUser, dislikingUser } = useDislikeUserMutation();
  const { likeUser, likingUser } = useLikeUserMutation();
  const { removeUserDislike, removingUserDislike } = useRemoveUserDislike();
  const { removeUserLike, removingUserLike } = useRemoveLikeMutation();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDislikeClick = () => {
    if (userId && userProfileId) {
      if (isDisliked) {
        removeUserDislike({
          sourceUserId: userId,
          targetUserId: userProfileId,
        });
      } else if (!isLiked) {
        dislikeUser({
          sourceUserId: userId,
          targetUserId: userProfileId,
        });
      }
    }
  };

  const handleUserLikeClick = () => {
    if (userId && userProfileId) {
      if (isLiked) {
        removeUserLike({
          sourceUserId: userId,
          targetUserId: userProfileId,
        });
      } else if (!isDisliked) {
        likeUser({
          sourceUserId: userId,
          targetUserId: userProfileId,
        });
      }
    }
  };

  if (
    fetchingUserProfileByUserId ||
    !userProfileByUserId ||
    checkingIsDisliked ||
    checkingIsLiked ||
    likingUser ||
    removingUserDislike ||
    removingUserLike ||
    dislikingUser
  ) {
    return <Spinner />;
  }

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner
          title={`${userProfileByUserId.displayName || "User"}'s Profile`}
        >
          <div className="flex items-center gap-3">
            <AnimatedButton
              onClick={handleGoBack}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 text-white font-medium"
              hoverBackgroundColor="transparent"
              hoverBorderColor="#FE5487"
              hoverTextColor="#FE5487"
            >
              Go Back
            </AnimatedButton>
          </div>
        </SectionBanner>

        <div className="w-full bg-black-200 rounded-xl border-2 border-pink-100 shadow-lg shadow-pink-100/10 p-6">
          <div className="flex justify-end gap-3 mb-6">
            <AnimatedButton
              onClick={handleDislikeClick}
              className={`px-4 py-2 rounded-lg ${
                isDisliked
                  ? "bg-red-500 text-white"
                  : "border-2 border-gray-300 text-white"
              } font-medium flex items-center gap-2`}
              hoverBackgroundColor={isDisliked ? "#f43f5e" : "#141414"}
              hoverBorderColor={isDisliked ? "#f43f5e" : "#FE5487"}
              hoverTextColor={isDisliked ? "#FFFFFF" : "#FE5487"}
            >
              <HiOutlineX className="size-5" />
              <span>{isDisliked ? "Disliked" : "Dislike"}</span>
            </AnimatedButton>

            <AnimatedButton
              onClick={handleUserLikeClick}
              className={`px-4 py-2 rounded-lg ${
                isLiked
                  ? "bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100"
                  : "border-2 border-gray-300 text-white"
              } font-medium flex items-center gap-2`}
              hoverBackgroundColor={isLiked ? "#E80352" : "#141414"}
              hoverBorderColor={isLiked ? "#E80352" : "#FE5487"}
              hoverTextColor={isLiked ? "#FFFFFF" : "#FE5487"}
            >
              <HiOutlineHeart className="size-5" />
              <span>{isLiked ? "Liked" : "Like"}</span>
            </AnimatedButton>

            <AnimatedButton
              // onClick={handleMessage}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-medium flex items-center gap-2"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              <HiOutlineChat className="size-5" />
              <span>Message</span>
            </AnimatedButton>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <div className="relative flex gap-6 mb-2">
              {profileSections.map((section: ProfileSection, index) => (
                <button
                  key={index}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  type="button"
                  onClick={() => handleTabChange(index, section.value)}
                  className={`relative z-10 text-xl font-bold px-2 cursor-pointer transition-colors ${
                    activeSection === section.value
                      ? "text-pink-200"
                      : "text-white hover:text-pink-300"
                  }`}
                >
                  {section.title}
                </button>
              ))}

              <motion.div
                layoutId="active-underline"
                className="absolute -bottom-2.5 h-[3px] bg-pink-100 z-0"
                style={{
                  left:
                    activeButton?.offsetLeft ??
                    buttonRefs.current[0]?.offsetLeft ??
                    0,
                  width:
                    activeButton?.offsetWidth ??
                    buttonRefs.current[0]?.offsetWidth ??
                    0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </div>

          <div className="mt-6">
            {activeSection === "profilePreview" && (
              <UserProfilePreviewSection userProfile={userProfileByUserId} />
            )}
            {activeSection === "aboutUser" && (
              <UserProfileAboutSection userProfile={userProfileByUserId} />
            )}
            {activeSection === "photos" && (
              <UserProfilePhotosSection userProfile={userProfileByUserId} />
            )}
          </div>
        </div>
      </SectionContainer>
    </Page>
  );
};

export default UserProfile;
