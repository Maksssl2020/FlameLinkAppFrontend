import SidebarContainer from "./SidebarContainer.tsx";
import { SectionType } from "../../types/types.ts";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineNewspaper,
  HiOutlineHeart,
  HiOutlineCog,
  HiOutlineHandThumbDown,
} from "react-icons/hi2";

type SidebarProps = {
  sections: SectionType[];
  linkPrefix: string;
  children?: ReactNode;
};

const getIconForSection = (url: string) => {
  const iconMap: Record<string, ReactNode> = {
    "discover-people": <HiOutlineUsers className="size-5" />,
    news: <HiOutlineNewspaper className="size-5" />,
    matches: <HiOutlineUsers className="size-5" />,
    "liked-people": <HiOutlineHeart className="size-5" />,
    "disliked-people": <HiOutlineHandThumbDown className="size-5" />,
    overall: <HiOutlineCog className="size-5" />,
    profile: <HiOutlineUsers className="size-5" />,
    "admin/manage-interests": <HiOutlineCog className="size-5" />,
    "admin/news-form": <HiOutlineNewspaper className="size-5" />,
  };

  return iconMap[url] || <HiOutlineHome className="size-5" />;
};

const Sidebar = ({ sections, linkPrefix, children }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    const matchedSection = sections.find(
      (section) => section.url === currentPath,
    );
    if (matchedSection) {
      setActiveSection(matchedSection.url);
    }
  }, [location.pathname, sections]);

  return (
    <SidebarContainer>
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h2 className="text-white text-lg font-bold mb-4 uppercase truncate">
            {linkPrefix === "dashboard" ? "Dashboard" : "Account"}
          </h2>
          <ul className="flex flex-col gap-4">
            {sections.map((section, index) => (
              <motion.li
                key={index}
                onClick={() => navigate(`/${linkPrefix}/${section.url}`)}
                animate={
                  activeSection === section.url
                    ? { borderColor: "#E80352" }
                    : { borderColor: "#292929" }
                }
                className="w-full pb-2 cursor-pointer px-1 h-[50px] text-white border-b-2 uppercase flex items-end"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-2">
                  {getIconForSection(section.url)}
                  <span className="truncate">{section.name}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">{children}</div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
