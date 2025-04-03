import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import { SectionType } from "../types/types.ts";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import useAuthentication from "../hooks/useAuthentication.ts";
import { useMemo } from "react";

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
      ? [...sections, ...adminSections]
      : sections;
  }, [authentication]);

  return (
    <div className={"w-full h-[89.6vh] flex"}>
      <Sidebar sections={allSections} linkPrefix={"account"}>
        <AnimatedButton
          type={"button"}
          onClick={() => navigate("dashboard/discover-people")}
          className={
            "w-full uppercase font-bold h-[50px] border-2 rounded-xl cursor-pointer text-white"
          }
        >
          Dashboard
        </AnimatedButton>
      </Sidebar>
      <div className={"w-full h-full px-4 py-2 overflow-hidden"}>
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
