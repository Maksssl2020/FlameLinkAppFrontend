import Page from "../../animations/Page.tsx";
import { UserProfile } from "../../types/userProfileTypes.ts";
import { HiOutlineUser } from "react-icons/hi";
import { IoCloudUploadOutline } from "react-icons/io5";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "../modal/Modal.tsx";
import UploadMainPhotoPanel from "../panel/UploadMainPhotoPanel.tsx";

type AccountProfilePhotosSectionProps = {
  userProfile: UserProfile;
};

const AccountProfilePhotosSection = ({
  userProfile,
}: AccountProfilePhotosSectionProps) => {
  const [isUploadMainPhotoModalOpen, setIsUploadMainPhotoModalOpen] =
    useState<boolean>(false);

  return (
    <Page>
      <div className={"w-full h-full flex flex-col text-white"}>
        <div
          className={
            "size-[400px] relative border-2 rounded-xl flex items-center justify-center"
          }
        >
          {userProfile.mainPhoto ? (
            <img
              className={"w-full h-full object-cover rounded-xl"}
              src={`data:image/jpeg;base64,${userProfile.mainPhoto?.imageData}`}
              alt={userProfile.id.toString()}
            />
          ) : (
            <HiOutlineUser className={"size-36 stroke-[0.5]"} />
          )}

          <AnimatedButton
            className={
              "size-12 rounded-full text-white border-2 cursor-pointer absolute top-2 right-2"
            }
          >
            <IoCloudUploadOutline
              onClick={() => setIsUploadMainPhotoModalOpen(true)}
              className={"size-7"}
            />
          </AnimatedButton>
        </div>
      </div>
      <AnimatePresence>
        {isUploadMainPhotoModalOpen && (
          <Modal>
            <UploadMainPhotoPanel
              onClose={() => setIsUploadMainPhotoModalOpen(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default AccountProfilePhotosSection;
