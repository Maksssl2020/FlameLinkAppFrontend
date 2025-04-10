import AnimatedButton from "../button/AnimatedButton.tsx";
import { HiOutlineUser } from "react-icons/hi";
import { RxExit } from "react-icons/rx";

import useAuthentication from "../../hooks/useAuthentication.ts";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.ts";

const Header = () => {
  const authentication = useAuthentication();
  const logout = useAuthStore().logout;
  const navigate = useNavigate();

  return (
    <div
      className={
        "w-full h-[100px] flex border-b-2 items-center px-4 border-gray-200"
      }
    >
      <h1 className={"font-bold text-4xl text-gradient"}>FlameLink</h1>
      <div className={"ml-auto w-auto h-full flex gap-3 items-center"}>
        {authentication?.isAuthenticated && (
          <AnimatedButton
            onClick={() => navigate("/account/overall")}
            className={
              "size-14 cursor-pointer rounded-full border-2 text-white"
            }
          >
            <HiOutlineUser className={"size-8 stroke-[1.5]"} />
          </AnimatedButton>
        )}
        {authentication?.isAuthenticated && (
          <AnimatedButton
            onClick={() => {
              logout();
              navigate("/");
            }}
            className={
              "size-14 cursor-pointer rounded-full border-2 text-white"
            }
          >
            <RxExit className={"size-7"} />
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default Header;
