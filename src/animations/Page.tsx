import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageProps = {
  className?: string;
  children: ReactNode;
};

const Page = ({ className, children }: PageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Page;
