import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type SelectWithSearchBarProps = {
  dropdownData: string[];
  onOptionClick: (value: string) => void;
};

const dropdownVariants = {
  open: {
    scaleY: 1,
    height: 300,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    height: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
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

const SelectWithSearchbar = ({
  dropdownData,
  onOptionClick,
}: SelectWithSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredDropdownData = dropdownData.filter((data) =>
    data.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      whileHover={{ borderColor: "#E80352" }}
      style={{ borderColor: "#292929" }}
      animate={isDropdownOpen ? "open" : "closed"}
      ref={selectRef}
      className={
        "bg-black-200 relative flex h-[50px] w-full cursor-pointer flex-col rounded-lg border-2"
      }
    >
      <input
        className={
          "text-white placeholder:text-white h-full w-full px-2 outline-none"
        }
        onFocus={() => setIsDropdownOpen(true)}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(event.target.value)
        }
        placeholder={"Search and choose interests..."}
      />

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial={"closed"}
            animate={"open"}
            exit={"closed"}
            style={{ originY: "top" }}
            className="bg-black-200 text-white border-pink-100 scrollbar absolute top-[125%]  flex w-full flex-col gap-1 overflow-y-auto rounded-xl border-2 p-2"
          >
            {filteredDropdownData.slice(0, 10)?.map((data, index) => (
              <motion.li
                whileHover={{ background: "#E80352" }}
                variants={itemVariants}
                transition={{ duration: 0.1 }}
                key={index}
                onClick={() => onOptionClick(data)}
                className={
                  "h-[35px] w-full cursor-pointer rounded-md px-2 py-1"
                }
              >
                {data}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default SelectWithSearchbar;
