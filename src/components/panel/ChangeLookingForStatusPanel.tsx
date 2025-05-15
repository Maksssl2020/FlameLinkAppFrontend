import AnimatedButton from "../button/AnimatedButton.tsx";
import { IoCloseOutline } from "react-icons/io5";
import { LookingForType } from "../../types/userProfileTypes.ts";

type ChangeLookingForStatusPanelPanel = {
  onClose: () => void;
  lookingForStatus: LookingForType;
  onConfirm: (type: LookingForType) => void;
};

const allOptions: LookingForType[] = [
  "Friends",
  "Serious relationship",
  "Fun with people",
  "I don't know yet",
];

const ChangeLookingForStatusPanel = ({
  onClose,
  lookingForStatus,
  onConfirm,
}: ChangeLookingForStatusPanelPanel) => {
  const optionsToDisplay = allOptions.filter(
    (option) => option !== lookingForStatus,
  );

  return (
    <div
      className={
        "w-[500px] gap-8 h-auto flex text-white flex-col bg-black-200 rounded-xl p-4 border-2 border-pink-100 bg-black-200"
      }
    >
      <div className="relative">
        <h1 className="text-2xl text-center font-bold">
          Change Looking For Status
        </h1>
        <AnimatedButton
          onClick={onClose}
          className="size-10 absolute right-0 top-0 rounded-full border-2 cursor-pointer text-white"
        >
          <IoCloseOutline className="size-7" />
        </AnimatedButton>
      </div>
      <h3 className={"text-xl"}>
        Current Looking For Status:{" "}
        <span className={"font-bold text-pink-600"}> {lookingForStatus}</span>
      </h3>
      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-semibold">Choose a new status:</h4>
        {optionsToDisplay.map((option) => (
          <AnimatedButton
            key={option}
            onClick={() => {
              onConfirm(option);
              onClose();
            }}
            className="border-2 border-white text-white px-4 py-2 rounded-lg"
          >
            {option}
          </AnimatedButton>
        ))}
      </div>
    </div>
  );
};

export default ChangeLookingForStatusPanel;
