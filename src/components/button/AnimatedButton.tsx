import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverTextColor?: string;
};

const AnimatedButton = ({
  onClick,
  className,
  children,
  type = "button",
  hoverBackgroundColor = "#E80352",
  hoverBorderColor = "#E80352",
  hoverTextColor = "#0D0D0D",
}: AnimatedButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{
        borderColor: hoverBorderColor,
        backgroundColor: hoverBackgroundColor,
        color: hoverTextColor,
      }}
      className={`flex justify-center items-center ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
