import Page from "../../animations/Page.tsx";
import { UserProfile } from "../../types/userProfileTypes.ts";
import { motion } from "framer-motion";
import { HiOutlinePencil } from "react-icons/hi2";
import { useState } from "react";
import AnimatedButton from "../button/AnimatedButton.tsx";

type AccountProfileAboutYouSectionProps = {
  userProfile: UserProfile;
};

const AccountProfileAboutYouSection = ({
  userProfile,
}: AccountProfileAboutYouSectionProps) => {
  const [isReadOnly, setReadOnly] = useState<boolean>(false);
  const { bio } = userProfile;

  return (
    <Page className={"w-full h-full grid grid-cols-2 gap-4"}>
      <div className={"w-full h-auto flex flex-col gap-4"}>
        <div className={"w-full h-auto flex flex-col gap-3"}>
          <label className={"text-2xl text-white"}>
            Tell others something about yourself
          </label>
          <div
            className={
              "w-full relative rounded-xl h-[500px] border-2 border-white"
            }
          >
            <AnimatedButton
              className={
                "absolute right-2 top-2 cursor-pointer size-12 flex items-center text-white justify-center rounded-full border-2"
              }
            >
              <HiOutlinePencil className={"size-7"} />
            </AnimatedButton>

            <textarea disabled={true} className={"w-full h-full resize-none"}>
              {bio}
            </textarea>
          </div>
        </div>
      </div>
      <div></div>
    </Page>
  );
};

export default AccountProfileAboutYouSection;
