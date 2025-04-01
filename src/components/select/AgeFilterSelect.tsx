import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const dropdownVariants = {
  open: {
    scaleY: 1,
    height: 350,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    scaleY: 0,
    height: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: -15,
  },
};

type AgeFilterSelectProps = {
  min?: number;
  selected: number;
  onChange?: (value: number) => void;
  backgroundColor?: string;
};

const AgeFilterSelect = ({
  selected,
  min,
  onChange,
  backgroundColor = "#0D0D0D",
}: AgeFilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState<number>(selected);
  const age: number[] = Array.from(
    { length: 99 - (min ?? 18) + 1 },
    (_, index) => (min ?? 18) + index,
  );

  return (
    <div className={"w-auto h-auto relative"}>
      <motion.button
        animate={
          isOpen ? { borderColor: "#E80352" } : { borderColor: "#292929" }
        }
        onClick={() => setIsOpen(!isOpen)}
        className={"size-[50px] border-2 rounded-xl  border-gray-200"}
      >
        {selectedAge}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial={"closed"}
            animate={"open"}
            exit={"closed"}
            style={{
              backgroundColor: backgroundColor,
            }}
            className={
              "w-[100px] z-10 border-2 scrollbar py-2 px-1 overflow-y-auto border-pink-100  gap-1 flex flex-col absolute right-[-50%]  top-[120%] rounded-xl text-white"
            }
          >
            {age.map((age, index) => (
              <motion.li
                onClick={() => {
                  setSelectedAge(age);
                  onChange?.(age);
                }}
                whileHover={{ backgroundColor: "#E80352" }}
                className={
                  "w-full flex items-center justify-center rounded-xl cursor-pointer"
                }
                variants={itemVariants}
                key={index}
              >
                {age}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgeFilterSelect;
