import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import { SectionType } from "../types/types.ts";
import { motion } from "framer-motion";

const sections: SectionType[] = [
  { name: "Discover People", url: "discover-people" },
  { name: "News", url: "news" },
  { name: "Your Matches", url: "matches" },
  { name: "Liked People", url: "liked-people" },
  { name: "Disliked People", url: "disliked-people" },
];

const DashboardLayout = () => {
  return (
    <div className="w-full h-[calc(100vh-5rem)] flex overflow-hidden">
      <Sidebar sections={sections} linkPrefix="dashboard" />
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

export default DashboardLayout;
