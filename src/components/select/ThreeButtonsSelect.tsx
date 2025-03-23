import { motion } from "framer-motion";

type ThreeButtonsSelectProps<T extends string> = {
  title: string;
  options: T[];
  chosenValue: T;
  onClick: (data: T) => void;
  selectWidth?: string;
  error?: string;
};

const ThreeButtonsSelect = <T extends string>({
  title,
  chosenValue,
  options,
  onClick,
  selectWidth = "w-[300px]",
  error,
}: ThreeButtonsSelectProps<T>) => {
  if (options.length !== 3) {
    throw new Error("ThreeButtonsSelect must have exactly 3 options.");
  }

  return (
    <div className={"w-auto h-auto text-white flex  flex-col"}>
      <div className={"w-full h-[50px] flex justify-between items-center"}>
        <label className={"ml-2 text-xl"}>{title}</label>
        <div className={`h-full grid grid-cols-3 ${selectWidth}`}>
          {options.map((option, index) => (
            <motion.button
              animate={
                option === chosenValue
                  ? { backgroundColor: "#E80352" }
                  : { backgroundColor: "#292929" }
              }
              onClick={() => onClick(option)}
              key={index}
              type="button"
              className={`w-full cursor-pointer h-full border-pink-100  text-xl  ${index === 0 && "rounded-l-xl border-2"} ${index === 1 && "border-y-2"} ${index === 2 && "rounded-r-xl border-2"}`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
      <p className={"text-lg text-red-500 h-[25px]"}>{error && error}</p>
    </div>
  );
};

export default ThreeButtonsSelect;
