import { ReactNode, useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";

type SidebarContainerProps = {
  children: ReactNode;
};

type OutletContextType = {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
};

const SidebarContainer = ({ children }: SidebarContainerProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const context = useOutletContext<OutletContextType>();
  const isMobileSidebarOpen = context?.isMobileSidebarOpen || false;
  const setIsMobileSidebarOpen = context?.setIsMobileSidebarOpen || (() => {});

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <motion.div
        className={`${
          isMobile
            ? "fixed left-0 top-0 bottom-0 z-30 pt-[100px]"
            : "relative h-full"
        } bg-black-200 border-r-2 border-gray-200 flex flex-col`}
        initial={isMobile ? { x: -300 } : { width: isCollapsed ? 80 : 300 }}
        animate={
          isMobile
            ? { x: isMobileSidebarOpen ? 0 : -300 }
            : { width: isCollapsed ? 80 : 300 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex-1 overflow-y-auto scrollbar p-4">{children}</div>

        {/* Desktop collapse button */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-8 bg-pink-100 text-black-100 rounded-full p-1.5 shadow-lg"
          >
            {isCollapsed ? (
              <HiOutlineChevronRight size={16} />
            ) : (
              <HiOutlineChevronLeft size={16} />
            )}
          </button>
        )}
      </motion.div>
    </>
  );
};

export default SidebarContainer;
