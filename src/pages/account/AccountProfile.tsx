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
      <SectionContainer>
        <SectionBanner title={"Manage Your Profile"}>
          <div className="relative w-auto mt-auto flex gap-4">
            {profileSections.map((section: ProfileSection, index) => (
              <button
                key={index}
                // @ts-ignore
                ref={(el) => (buttonRefs.current[index] = el)} // będziemy potrzebować refa do obliczania pozycji
                type="button"
                onClick={() => setActiveSection(section.value)}
                className={`relative z-10 text-xl font-bold px-2 cursor-pointer`}
              >
                {section.title}
              </button>
            ))}

            <motion.div
              layoutId="active-underline"
              className="absolute -bottom-2.5 h-[2px] bg-pink-100 z-0"
              style={{
                left: activeButton?.offsetLeft ?? 0,
                width: activeButton?.offsetWidth ?? 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </SectionBanner>
        {activeSection === "profilePreview" && (
          <AccountProfilePreviewSection userProfile={userProfileByUserId!} />
        )}
        {activeSection === "aboutYou" && (
          <AccountProfileAboutYouSection userProfile={userProfileByUserId!} />
        )}
        {activeSection === "photos" && (
          <AccountProfilePhotosSection userProfile={userProfileByUserId!} />
        )}
      </SectionContainer>
    </Page>
  );
};

export default AccountProfile;
