import Page from "../../animations/Page.tsx";
import { useState } from "react";
import { HiOutlineFilter, HiOutlineHeart } from "react-icons/hi";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import { AnimatePresence, motion } from "framer-motion";
import useUserLikedUsers from "../../hooks/queries/useUserLikedUsers.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import LikedUserCard from "../../components/card/LikedUserCard.tsx";

const LIKED_USERS = [
  {
    id: 1,
    name: "Emma Wilson",
    age: 28,
    location: "New York, USA",
    interests: ["Photography", "Travel", "Cooking"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 85,
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 31,
    location: "San Francisco, USA",
    interests: ["Hiking", "Music", "Technology"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 78,
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    age: 26,
    location: "Miami, USA",
    interests: ["Dancing", "Art", "Fitness"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 92,
  },
  {
    id: 4,
    name: "James Taylor",
    age: 30,
    location: "Chicago, USA",
    interests: ["Reading", "Movies", "Coffee"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 73,
  },
  {
    id: 5,
    name: "Olivia Park",
    age: 27,
    location: "Seattle, USA",
    interests: ["Yoga", "Painting", "Traveling"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchPercentage: 88,
  },
];

const DashboardUserLikes = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [likedUsers, setLikedUsers] = useState(LIKED_USERS);
  const [sortBy, setSortBy] = useState<"recent" | "match">("recent");

  const { userLikedUsers, fetchingUserLikedUsers } = useUserLikedUsers();

  const handleSort = (type: "recent" | "match") => {
    setSortBy(type);
    if (type === "match") {
      setLikedUsers(
        [...likedUsers].sort((a, b) => b.matchPercentage - a.matchPercentage),
      );
    } else {
      setLikedUsers([...LIKED_USERS]);
    }
    setIsFilterOpen(false);
  };

  if (fetchingUserLikedUsers) {
    return <Spinner />;
  }

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="People You Like">
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

        {userLikedUsers && userLikedUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {userLikedUsers.map((user) => (
              <LikedUserCard user={user} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-black-200 rounded-xl border-2 border-gray-200 p-10 mt-6">
            <div className="size-20 rounded-full bg-black-100 flex items-center justify-center mb-4">
              <HiOutlineHeart className="size-10 text-pink-200" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Likes Yet</h3>
            <p className="text-gray-300 text-center max-w-md mb-6">
              You haven't liked anyone yet. Explore and discover people who
              share your interests!
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

export default DashboardUserLikes;
