import { LookingForType } from "../../types/userProfileTypes.ts";
import { motion } from "framer-motion";

const lookingForOptions: LookingForType[] = [
  "Friends",
  "Fun with people",
  "I don't know yet",
  "Serious relationship",
];

type LookingForButtonsSelectProps = {
  chosenType: LookingForType;
  onSelect: (type: LookingForType) => void;
};

const LookingForButtonsSelect = ({
  chosenType,
  onSelect,
}: LookingForButtonsSelectProps) => {
  return (
    <div className={"w-full h-auto grid grid-cols-4 gap-3"}>
      {lookingForOptions.map((data, index) => (
        <motion.button
          animate={{
            backgroundColor: chosenType === data ? "#E80352" : "#292929",
          }}
          key={index}
          type="button"
          onClick={() => onSelect(data)}
          className={`w-auto cursor-pointer h-full border-pink-100 text-lg border-2 rounded-lg`}
        >
          {data}
        </motion.button>
      ))}
    </div>
  );
};

export default LookingForButtonsSelect;
