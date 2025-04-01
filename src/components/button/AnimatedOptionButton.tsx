import { ReactNode } from "react";
import { motion } from "framer-motion";

type AnimatedOptionButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  isSelected: boolean;
  selectedTextColor: string;
  borderColor?: string;
  backgroundColor: string;
};

const AnimatedOptionButton = ({
  onClick,
  className,
  children,
  isSelected,
  selectedTextColor,
  backgroundColor,
  borderColor = "#FFFFFF",
}: AnimatedOptionButtonProps) => {
  return (
    <motion.button
      type={"button"}
      onClick={onClick}
      whileHover={{
        backgroundColor: "#E80352",
        borderColor: "#E80352",
        color: selectedTextColor,
      }}
      animate={
        isSelected
          ? {
              backgroundColor: "#E80352",
              borderColor: "#E80352",
              color: selectedTextColor,
            }
          : {
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              color: "#FFFFFF",
            }
      }
      className={`flex justify-center cursor-pointer items-center ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedOptionButton;
