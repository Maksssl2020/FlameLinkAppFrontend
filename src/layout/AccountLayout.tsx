import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import { SectionType } from "../types/types.ts";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import useAuthentication from "../hooks/useAuthentication.ts";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowLeft } from "react-icons/hi2";

const sections: SectionType[] = [
  { name: "Overall Settings", url: "overall" },
  { name: "Profile Settings", url: "profile" },
];

const adminSections: SectionType[] = [
  { name: "Manage Interests", url: "admin/manage-interests" },
  { name: "Create News", url: "admin/news-form" },
];

const AccountLayout = () => {
  const navigate = useNavigate();
  const authentication = useAuthentication();

  const allSections = useMemo(() => {
    return authentication?.isAuthenticated &&
      authentication?.roles.includes("Admin")
      ? [...sections.filter((s) => s.url !== "profile"), ...adminSections]
      : sections;
  }, [authentication]);

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex overflow-hidden">
      <Sidebar sections={allSections} linkPrefix="account">
        <AnimatedButton
          type="button"
          onClick={() => navigate("/dashboard/discover-people")}
          className="w-full flex items-center justify-center gap-2 h-[50px] bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold rounded-xl"
          hoverBackgroundColor="#E80352"
          hoverTextColor="#FFFFFF"
        >
          <HiOutlineArrowLeft className="size-5" />
          <span className="truncate">Back to Dashboard</span>
        </AnimatedButton>
      </Sidebar>
      <motion.div
        className="flex-1 overflow-y-auto scrollbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AccountLayout;
