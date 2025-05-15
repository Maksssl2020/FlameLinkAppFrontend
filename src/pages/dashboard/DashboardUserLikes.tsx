import Page from "../../animations/Page.tsx";
import { HiOutlineHeart } from "react-icons/hi";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import useUserLikedUsers from "../../hooks/queries/useUserLikedUsers.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import LikedUserCard from "../../components/card/LikedUserCard.tsx";

const DashboardUserLikes = () => {
  const { userLikedUsers, fetchingUserLikedUsers } = useUserLikedUsers();

  if (fetchingUserLikedUsers) {
    return <Spinner />;
  }

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="People You Like" />

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
