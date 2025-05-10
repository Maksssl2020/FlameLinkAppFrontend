import Page from "../../animations/Page.tsx";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AccountProfilePreviewSection from "../../components/section/AccountProfilePreviewSection.tsx";
import useUserProfileByUserIdQuery from "../../hooks/queries/useUserProfileByUserIdQuery.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import useAuthentication from "../../hooks/useAuthentication.ts";
import AccountProfilePhotosSection from "../../components/section/AccountProfilePhotosSection.tsx";
import AccountProfileAboutYouSection from "../../components/section/AccountProfileAboutYouSection.tsx";

type ProfileSection = {
  title: string;
  value: "profilePreview" | "aboutYou" | "photos";
};

const profileSections: ProfileSection[] = [
  {
    title: "Profile Preview",
    value: "profilePreview",
  },
  {
    title: "About You",
    value: "aboutYou",
  },
  {
    title: "Photos",
    value: "photos",
  },
];

const AccountProfile = () => {
  const [activeSection, setActiveSection] = useState<
    "profilePreview" | "aboutYou" | "photos"
  >("profilePreview");
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const authentication = useAuthentication();
  const [activeButton, setActiveButton] = useState<HTMLButtonElement | null>(
    null,
  );

  const { userProfileByUserId, fetchingUserProfileByUserId } =
    useUserProfileByUserIdQuery(authentication?.userId);

  const handleTabChange = (
    index: number,
    value: "profilePreview" | "aboutYou" | "photos",
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

  if (fetchingUserProfileByUserId) {
    return <Spinner />;
  }

  console.log(userProfileByUserId);

  return (
    <Page>
      <div className="bg-black-100 min-h-screen">
        <SectionContainer>
          <SectionBanner title="Manage Your Profile">
            <div className="relative w-auto mt-auto flex gap-6">
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
          </SectionBanner>

          <div className="w-full bg-black-200 rounded-xl border-2 border-pink-100 shadow-lg shadow-pink-100/10 p-6">
            {activeSection === "profilePreview" && (
              <AccountProfilePreviewSection
                userProfile={userProfileByUserId!}
              />
            )}
            {activeSection === "aboutYou" && (
              <AccountProfileAboutYouSection
                userProfile={userProfileByUserId!}
              />
            )}
            {activeSection === "photos" && (
              <AccountProfilePhotosSection userProfile={userProfileByUserId!} />
            )}
          </div>
        </SectionContainer>
      </div>
    </Page>
  );
};

export default AccountProfile;
