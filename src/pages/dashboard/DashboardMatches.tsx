import SectionContainer from "../../components/section/SectionContainer.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import { HiOutlineHeart, HiOutlineSearch } from "react-icons/hi";
import { useState } from "react";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import Page from "../../animations/Page.tsx";
import useUserMatchesQuery from "../../hooks/queries/useUserMatchesQuery.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import MatchedUserCard from "../../components/card/MatchedUserCard.tsx";

const DashboardMatches = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { userMatches, fetchingUserMatches } = useUserMatchesQuery();

  const filteredMatches = userMatches?.filter(
    (userMatch) =>
      userMatch.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userMatch.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userMatch.interests.some((interest) =>
        interest.interestName.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  if (fetchingUserMatches || !userMatches) {
    return <Spinner />;
  }

  console.log(userMatches);

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

        {filteredMatches && filteredMatches.length > 0 ? (
          <div className="mt-6">
            {filteredMatches.map((match) => (
              <MatchedUserCard matchedUser={match} />
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
