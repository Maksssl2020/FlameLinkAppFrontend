import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header.tsx";
import { useEffect, useState } from "react";
import useAuthentication from "../hooks/useAuthentication.ts";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Layout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const authentication = useAuthentication();
  const location = useLocation();

  // Close sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-black-100">
      <Header
        toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Mobile sidebar overlay */}
      {authentication?.isAuthenticated && (
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black-100/60 backdrop-blur-sm z-20 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      )}

      <main className="flex-1 relative">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet context={{ isMobileSidebarOpen, setIsMobileSidebarOpen }} />
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
