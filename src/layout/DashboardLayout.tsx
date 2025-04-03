import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import { SectionType } from "../types/types.ts";

const sections: SectionType[] = [
  { name: "Discover People", url: "discover-people" },
  { name: "News", url: "news" },
  { name: "Your Matches", url: "matches" },
  { name: "Liked People", url: "liked-people" },
];

const DashboardLayout = () => {
  return (
    <div className={"w-full h-[89.6vh] flex"}>
      <Sidebar sections={sections} linkPrefix={"dashboard"} />
      <div className={"w-full px-6 py-4"}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
