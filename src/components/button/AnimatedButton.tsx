import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const AnimatedButton = ({
  onClick,
  className,
  children,
  type = "button",
}: AnimatedButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ backgroundColor: "#E80352", color: "#FFFFFF" }}
      className={`flex justify-center items-center ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
