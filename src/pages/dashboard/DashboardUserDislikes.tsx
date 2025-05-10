"use client";

import Page from "../../animations/Page.tsx";
import { useState } from "react";
import { HiOutlineFilter, HiOutlineX } from "react-icons/hi";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../../components/spinner/Spinner.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import DislikedUserCard from "../../components/card/DislikedUserCard.tsx";

// Mock data for disliked users
const DISLIKED_USERS = [
  {
    id: 1,
    name: "Thomas Wright",
    age: 33,
    location: "Boston, USA",
    interests: ["Gaming", "Technology", "Movies"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 45,
    dislikedAt: "2 days ago",
  },
  {
    id: 2,
    name: "Rebecca Johnson",
    age: 29,
    location: "Chicago, USA",
    interests: ["Shopping", "Fashion", "Parties"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 32,
    dislikedAt: "1 week ago",
  },
  {
    id: 3,
    name: "Daniel Martinez",
    age: 35,
    location: "Miami, USA",
    interests: ["Clubbing", "Cars", "Sports"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 28,
    dislikedAt: "3 days ago",
  },
  {
    id: 4,
    name: "Olivia Thompson",
    age: 27,
    location: "Seattle, USA",
    interests: ["Reality TV", "Shopping", "Social Media"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 40,
    dislikedAt: "5 days ago",
  },
  {
    id: 5,
    name: "Jason Lee",
    age: 31,
    location: "Los Angeles, USA",
    interests: ["Partying", "Fast Food", "Video Games"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 35,
    dislikedAt: "2 weeks ago",
  },
  {
    id: 6,
    name: "Sarah Miller",
    age: 28,
    location: "Denver, USA",
    interests: ["Reality Shows", "Gossip", "Fashion"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 38,
    dislikedAt: "4 days ago",
  },
  {
    id: 7,
    name: "Kevin Wilson",
    age: 34,
    location: "Phoenix, USA",
    interests: ["Gambling", "Drinking", "Sports Cars"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 25,
    dislikedAt: "1 week ago",
  },
  {
    id: 8,
    name: "Amanda Garcia",
    age: 26,
    location: "Portland, USA",
    interests: ["Social Media", "Selfies", "Shopping"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 30,
    dislikedAt: "3 days ago",
  },
];

const ITEMS_PER_PAGE = 8;

const DashboardUserDislikes = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allDislikedUsers, setAllDislikedUsers] = useState(DISLIKED_USERS);
  const [sortBy, setSortBy] = useState<"recent" | "match">("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate pagination
  const totalPages = Math.ceil(allDislikedUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const dislikedUsers = allDislikedUsers.slice(startIndex, endIndex);

  const handleRemoveDislike = (userId: number) => {
    setAllDislikedUsers(allDislikedUsers.filter((user) => user.id !== userId));
  };

  const handleUndoDislike = (userId: number) => {
    // In a real app, this would call an API to undo the dislike
    // For now, we'll just remove it from the list
    setIsLoading(true);
    setTimeout(() => {
      setAllDislikedUsers(
        allDislikedUsers.filter((user) => user.id !== userId),
      );
      setIsLoading(false);
    }, 500);
  };

  const handleSort = (type: "recent" | "match") => {
    setSortBy(type);
    if (type === "match") {
      setAllDislikedUsers(
        [...allDislikedUsers].sort(
          (a, b) => b.matchPercentage - a.matchPercentage,
        ),
      );
    } else {
      setAllDislikedUsers([...DISLIKED_USERS]); // Reset to original order (most recent first)
    }
    setIsFilterOpen(false);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="People You Disliked">
          <div className="relative">
            <AnimatedButton
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="size-12 rounded-xl cursor-pointer border-2 border-pink-100 bg-black-200 text-white hover:bg-pink-100 hover:text-black-100 transition-all flex items-center justify-center"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              <HiOutlineFilter className="size-6" />
            </AnimatedButton>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-black-200 border-2 border-pink-100 rounded-xl shadow-lg overflow-hidden z-10"
                >
                  <div className="py-2">
                    <button
                      onClick={() => handleSort("recent")}
                      className={`w-full px-4 py-3 text-left hover:bg-black-100 transition-colors flex items-center gap-2 ${
                        sortBy === "recent" ? "text-pink-200" : "text-white"
                      }`}
                    >
                      <span>Most Recent</span>
                      {sortBy === "recent" && (
                        <span className="ml-auto">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => handleSort("match")}
                      className={`w-full px-4 py-3 text-left hover:bg-black-100 transition-colors flex items-center gap-2 ${
                        sortBy === "match" ? "text-pink-200" : "text-white"
                      }`}
                    >
                      <span>Highest Match</span>
                      {sortBy === "match" && <span className="ml-auto">✓</span>}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionBanner>

        {allDislikedUsers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {dislikedUsers.map((user) => (
                <DislikedUserCard
                  key={user.id}
                  user={user}
                  onRemoveDislike={handleRemoveDislike}
                  onUndoDislike={handleUndoDislike}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center bg-black-200 rounded-xl border-2 border-gray-200 p-10 mt-6">
            <div className="size-20 rounded-full bg-black-100 flex items-center justify-center mb-4">
              <HiOutlineX className="size-10 text-pink-200" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Dislikes Yet
            </h3>
            <p className="text-gray-300 text-center max-w-md mb-6">
              You haven't disliked anyone yet. When you dislike someone, they'll
              appear here.
            </p>
            <AnimatedButton
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              Discover People
            </AnimatedButton>
          </div>
        )}
      </SectionContainer>
    </Page>
  );
};

export default DashboardUserDislikes;
