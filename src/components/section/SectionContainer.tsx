import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionContainerProps = {
  children: ReactNode;
};

const SectionContainer = ({ children }: SectionContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center h-auto gap-8 py-6"
    >
      {children}
    </motion.div>
  );
};

export default SectionContainer;
