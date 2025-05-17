import { UserProfile } from "../../types/userProfileTypes.ts";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineUser } from "react-icons/hi";
import { IoCloudUploadOutline } from "react-icons/io5";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../modal/Modal.tsx";
import UploadMainPhotoPanel from "../panel/UploadMainPhotoPanel.tsx";
import toast from "react-hot-toast";
import UploadGalleryPanel from "../panel/UploadGalleryPanel.tsx";
import useDeletePhotoMutation from "../../hooks/muatations/useDeletePhotoMutation.ts";
import Spinner from "../spinner/Spinner.tsx";

type AccountProfilePhotosSectionProps = {
  userProfile: UserProfile;
};

const AccountProfilePhotosSection = ({
  userProfile,
}: AccountProfilePhotosSectionProps) => {
  const [isUploadMainPhotoModalOpen, setIsUploadMainPhotoModalOpen] =
    useState<boolean>(false);
  const [isUploadGalleryModalOpen, setIsUploadGalleryModalOpen] =
    useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(selectedPhoto === index ? null : index);
  };

  const { deletePhoto, deletingPhoto } = useDeletePhotoMutation();

  if (deletingPhoto) {
    return <Spinner />;
  }

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

            <AnimatedButton
              onClick={() => setIsUploadMainPhotoModalOpen(true)}
              className="size-12 rounded-full text-white border-2 border-pink-100 cursor-pointer absolute top-3 right-3 bg-black-200 flex items-center justify-center"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              <IoCloudUploadOutline className="size-6" />
            </AnimatedButton>
          </div>

          <div className="bg-black-100 rounded-xl p-4 border border-gray-200">
            <h4 className="text-xl font-semibold text-pink-200 mb-2">
              Main Photo Tips
            </h4>
            <ul className="text-gray-300 space-y-2 list-disc pl-5">
              <li>Choose a clear, well-lit photo of your face</li>
              <li>Avoid group photos for your main picture</li>
              <li>A genuine smile makes a great first impression</li>
              <li>High-quality images perform better</li>
            </ul>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Photo Gallery</h3>
            <AnimatedButton
              onClick={() => {
                if (userProfile.photos.length >= 6) {
                  toast.error("You can upload up to 6 photos only.");
                  return;
                }
                setIsUploadGalleryModalOpen(true);
              }}
              className="px-4 py-2 rounded-lg text-white border-2 border-pink-100 cursor-pointer bg-black-200 flex items-center gap-2"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              <HiOutlinePlus className="size-5" />
              <span>Add Photos</span>
            </AnimatedButton>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {userProfile.photos.length > 0
              ? userProfile.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    className={`aspect-square relative border-2 rounded-xl overflow-hidden cursor-pointer ${
                      selectedPhoto === index
                        ? "border-pink-100"
                        : "border-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handlePhotoClick(index)}
                  >
                    <img
                      src={`data:image/jpeg;base64,${photo.imageData}`}
                      alt={`Gallery ${index}`}
                      className="w-full h-full object-cover"
                    />

                    {selectedPhoto === index && (
                      <div className="absolute inset-0 bg-black-100/70 flex items-center justify-center">
                        <AnimatedButton
                          onClick={() => deletePhoto(photo.id)}
                          className="size-12 rounded-full text-white border-2 border-pink-100 bg-black-200"
                          hoverBackgroundColor="#E80352"
                          hoverTextColor="#FFFFFF"
                        >
                          <HiOutlineTrash className="size-6" />
                        </AnimatedButton>
                      </div>
                    )}
                  </motion.div>
                ))
              : Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <motion.div
                      key={index}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-black-100"
                      whileHover={{ borderColor: "#FE5487" }}
                      onClick={() => {
                        if (userProfile.photos.length >= 6) {
                          toast.error("You can upload up to 6 photos only.");
                          return;
                        }
                        setIsUploadGalleryModalOpen(true);
                      }}
                    >
                      <div className="flex flex-col items-center text-gray-300">
                        <HiOutlinePlus className="size-10" />
                        <p className="mt-2">Add photo</p>
                      </div>
                    </motion.div>
                  ))}
          </div>

          <div className="mt-8 bg-black-100 rounded-xl p-4 border border-gray-200">
            <h4 className="text-xl font-semibold text-pink-200 mb-2">
              Gallery Tips
            </h4>
            <ul className="text-gray-300 space-y-2 list-disc pl-5">
              <li>Add 4-6 photos to showcase different aspects of your life</li>
              <li>Include photos of your hobbies and interests</li>
              <li>Variety helps others get to know you better</li>
              <li>Photos with good lighting and clear focus perform best</li>
            </ul>
          </div>
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

        {isUploadGalleryModalOpen && (
          <Modal>
            <UploadGalleryPanel
              currentPhotoCount={userProfile.photos.length}
              onClose={() => setIsUploadGalleryModalOpen(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountProfilePhotosSection;
