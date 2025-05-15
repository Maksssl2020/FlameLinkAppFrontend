import { motion } from "framer-motion";
import { Interest } from "../../types/interestTypes.ts";
import SelectWithSearchbar from "../select/SelectWithSearchbar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { IoCloseOutline } from "react-icons/io5";
import useInterestSelection from "../../hooks/useInterestSelection.ts";
import Spinner from "../spinner/Spinner.tsx";

type ManageInterestsPanelProps = {
  interests: Interest[];
  onClose: () => void;
  onConfirm: (interests: string[]) => void;
};

const ManageInterestsPanel = ({
  interests,
  onClose,
  onConfirm,
}: ManageInterestsPanelProps) => {
  const initialInterests = interests.map((interest) => interest.interestName);
  const {
    selectedInterests,
    availableInterests,
    selectInterest,
    fetchingInterests,
  } = useInterestSelection(initialInterests);

  if (fetchingInterests) {
    return <Spinner />;
  }

  return (
    <div
      className={
        "w-[550px] gap-8 min-h-[500px] flex text-white flex-col bg-black-200 rounded-xl p-4 border-2 border-pink-100 bg-black-200"
      }
    >
      <div className="relative">
        <h1 className="text-3xl text-center font-bold">Manage Interests</h1>
        <AnimatedButton
          onClick={onClose}
          className="size-10 absolute right-0 top-0 rounded-full border-2 cursor-pointer text-white"
        >
          <IoCloseOutline className="size-7" />
        </AnimatedButton>
      </div>

      <div className={"w-full h-auto flex flex-col gap-4"}>
        <h3 className="text-xl font-medium ml-2">Current Interests</h3>
        <div className="flex flex-wrap gap-3 bg-black-100 p-2 rounded-lg border border-gray-200">
          {interests.map((interest, index) => (
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
        <SelectWithSearchbar
          dropdownData={availableInterests}
          onOptionClick={(value) => selectInterest(value)}
        />
        <div className={"w-full h-auto flex flex-col gap-4"}>
          <h3 className="text-xl font-medium ml-2">Chosen Interests</h3>
          <div className="flex flex-wrap gap-3 bg-black-100 p-2 rounded-lg border border-gray-200">
            {selectedInterests.map((interest, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-black-200 text-pink-200 rounded-full border border-pink-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectInterest(interest)}
              >
                {interest}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className={"w-full h-auto flex  gap-4"}>
        <AnimatedButton
          onClick={onClose}
          className={"w-full h-[40px] rounded-lg border-2"}
        >
          Cancel
        </AnimatedButton>
        <AnimatedButton
          onClick={() => {
            onConfirm(selectedInterests);
            onClose();
          }}
          className={"w-full h-[40px] rounded-lg border-2"}
        >
          Confirm
        </AnimatedButton>
      </div>
    </div>
  );
};

export default ManageInterestsPanel;
