import AnimatedButton from "../button/AnimatedButton.tsx";
import {
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineUser,
  HiOutlineX,
} from "react-icons/hi";
import { RxExit } from "react-icons/rx";

import useAuthentication from "../../hooks/useAuthentication.ts";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.ts";
import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineCog, HiOutlineFire } from "react-icons/hi2";

type HeaderProps = {
  toggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
};

const Header = ({ toggleMobileSidebar, isMobileSidebarOpen }: HeaderProps) => {
  const authentication = useAuthentication();
  const logout = useAuthStore().logout;
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const logoutConfirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsLogoutConfirmOpen(false);
  };

  return (
    <header
      className={`w-full h-[100px] flex border-b-2 items-center px-4 sm:px-6 lg:px-8 border-gray-200 sticky top-0 z-40 transition-all duration-200 ${
        scrolled ? "bg-black-200/90 backdrop-blur-md shadow-md" : "bg-black-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <HiOutlineFire className="size-8 text-pink-200" />
        <h1 className="text-2xl font-bold text-gradient">FlameLink</h1>
      </div>

      <div className="ml-auto w-auto h-full flex gap-3 items-center">
        {authentication?.isAuthenticated ? (
          <>
            <div className="relative" ref={profileMenuRef}>
              <AnimatedButton
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="size-14 cursor-pointer rounded-full border-2 border-gray-300 text-white flex items-center justify-center"
                hoverBackgroundColor="transparent"
                hoverBorderColor="#FE5487"
                hoverTextColor="#FE5487"
              >
                <HiOutlineUser className="size-8 stroke-[1.5]" />
              </AnimatedButton>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-white font-medium truncate">
                          {authentication?.username || "User"}
                        </p>
                        <p className="text-gray-300 text-sm truncate">
                          {authentication?.username || "user@example.com"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigate("/account/overall");
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-pink-100 hover:text-black-100 transition-colors flex items-center gap-2"
                      >
                        <HiOutlineCog className="size-5" />
                        <span>Account Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsLogoutConfirmOpen(true);
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-pink-100 hover:text-black-100 transition-colors flex items-center gap-2"
                      >
                        <RxExit className="size-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatedButton
              onClick={() => setIsLogoutConfirmOpen(true)}
              className="size-14 cursor-pointer rounded-full border-2 border-gray-300 text-white flex items-center justify-center"
              hoverBackgroundColor="transparent"
              hoverBorderColor="#FE5487"
              hoverTextColor="#FE5487"
            >
              <RxExit className="size-7" />
            </AnimatedButton>
          </>
        ) : (
          <>
            <AnimatedButton
              onClick={() => navigate("/sign-in")}
              className="bg-transparent border-2 border-gray-300 text-white font-medium px-6 py-2 rounded-xl"
              hoverBackgroundColor="transparent"
              hoverBorderColor="#FE5487"
              hoverTextColor="#FE5487"
            >
              Sign In
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigate("/sign-up/step/1")}
              className="bg-pink-100 text-black-100 font-medium px-6 py-2 rounded-xl"
            >
              Sign Up
            </AnimatedButton>
          </>
        )}
      </div>

      {/* Logout confirmation dialog */}
      <AnimatePresence>
        {isLogoutConfirmOpen && (
          <motion.div
            className="fixed inset-0 bg-black-100/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={logoutConfirmRef}
              className="bg-gray-100 border-2 border-pink-100 rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Sign Out</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex gap-3 justify-end">
                <AnimatedButton
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="bg-transparent border-2 border-gray-300 text-white font-medium px-6 py-2 rounded-xl"
                  hoverBackgroundColor="transparent"
                  hoverBorderColor="#FE5487"
                  hoverTextColor="#FE5487"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-medium px-6 py-2 rounded-xl"
                >
                  Sign Out
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
