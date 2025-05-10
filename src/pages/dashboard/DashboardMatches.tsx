import SectionContainer from "../../components/section/SectionContainer.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineSearch,
} from "react-icons/hi";
import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import Page from "../../animations/Page.tsx";

const MATCHES = [
  {
    id: 1,
    name: "Jessica Parker",
    age: 29,
    location: "Boston, USA",
    interests: ["Yoga", "Reading", "Travel"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchDate: "2 days ago",
    matchPercentage: 95,
    lastActive: "Online now",
  },
  {
    id: 2,
    name: "David Kim",
    age: 32,
    location: "Los Angeles, USA",
    interests: ["Photography", "Hiking", "Cooking"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchDate: "1 week ago",
    matchPercentage: 88,
    lastActive: "3 hours ago",
  },
  {
    id: 3,
    name: "Alicia Johnson",
    age: 27,
    location: "Denver, USA",
    interests: ["Music", "Art", "Fitness"],
    avatar: "/placeholder.svg?height=300&width=300",
    matchDate: "3 days ago",
    matchPercentage: 91,
    lastActive: "1 day ago",
  },
];

const DashboardMatches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState(MATCHES);

  const filteredMatches = matches.filter(
    (match) =>
      match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.interests.some((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="Your Matches">
          <div className="relative flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search matches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 pr-4 rounded-xl bg-black-200 border-2 border-gray-200 text-white focus:border-pink-100 outline-none transition-colors"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 size-5" />
            </div>
          </div>
        </SectionBanner>

        {filteredMatches.length > 0 ? (
          <div className="mt-6">
            {filteredMatches.map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black-200 rounded-xl border-2 border-gray-200 overflow-hidden mb-6 hover:border-pink-100 transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 lg:w-1/4">
                    <div className="relative">
                      <img
                        src={match.avatar || "/placeholder.svg"}
                        alt={match.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-pink-400 to-pink-200 text-black-100 font-bold px-3 py-1 rounded-full text-sm">
                        {match.matchPercentage}% Match
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {match.name}, {match.age}
                        </h3>
                        <div className="flex items-center text-gray-300 mt-1 text-sm">
                          <HiOutlineLocationMarker className="size-4 mr-1" />
                          <span>{match.location}</span>
                        </div>
                      </div>

                      <div className="mt-2 md:mt-0 flex flex-col items-start md:items-end">
                        <div className="flex items-center text-gray-300 text-sm">
                          <HiOutlineCalendar className="size-4 mr-1" />
                          <span>Matched {match.matchDate}</span>
                        </div>
                        <div className="text-pink-200 text-sm mt-1">
                          {match.lastActive}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 my-4">
                      {match.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-black-100 text-pink-200 rounded-full text-xs border border-gray-300"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-300 mb-6 flex-grow">
                      You and {match.name.split(" ")[0]} have a strong
                      connection based on shared interests. Start a conversation
                      to learn more about each other!
                    </p>

                    <div className="flex gap-3 mt-auto">
                      <AnimatedButton
                        className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-medium flex items-center justify-center gap-2"
                        hoverBackgroundColor="#E80352"
                        hoverTextColor="#FFFFFF"
                      >
                        <HiOutlineChat className="size-5" />
                        <span>Start Conversation</span>
                      </AnimatedButton>
                      <AnimatedButton
                        className="flex-1 py-3 rounded-lg border-2 border-gray-300 text-white font-medium flex items-center justify-center gap-2"
                        hoverBackgroundColor="transparent"
                        hoverBorderColor="#FE5487"
                        hoverTextColor="#FE5487"
                      >
                        <HiOutlineHeart className="size-5" />
                        <span>View Full Profile</span>
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-black-200 rounded-xl border-2 border-gray-200 p-10 mt-6">
            {searchQuery ? (
              <>
                <div className="size-20 rounded-full bg-black-100 flex items-center justify-center mb-4">
                  <HiOutlineSearch className="size-10 text-pink-200" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Matches Found
                </h3>
                <p className="text-gray-300 text-center max-w-md mb-6">
                  We couldn't find any matches for "{searchQuery}". Try a
                  different search term.
                </p>
                <AnimatedButton
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold"
                  hoverBackgroundColor="#E80352"
                  hoverTextColor="#FFFFFF"
                >
                  Clear Search
                </AnimatedButton>
              </>
            ) : (
              <>
                <div className="size-20 rounded-full bg-black-100 flex items-center justify-center mb-4">
                  <HiOutlineHeart className="size-10 text-pink-200" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Matches Yet
                </h3>
                <p className="text-gray-300 text-center max-w-md mb-6">
                  You don't have any matches yet. Explore more profiles and like
                  people to create potential matches!
                </p>
                <AnimatedButton
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold"
                  hoverBackgroundColor="#E80352"
                  hoverTextColor="#FFFFFF"
                >
                  Discover People
                </AnimatedButton>
              </>
            )}
          </div>
        )}
      </SectionContainer>
    </Page>
  );
};

export default DashboardMatches;
