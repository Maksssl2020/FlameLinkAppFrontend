import Page from "../../animations/Page.tsx";
import { useEffect, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/modal/Modal.tsx";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import FilterPeoplePanel from "../../components/panel/FilterPeoplePanel.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import useMatchingUsersQuery from "../../hooks/queries/useMatchingUsersQuery.ts";
import { User, UserParams } from "../../types/userTypes.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import useAuthentication from "../../hooks/useAuthentication.ts";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import DiscoverUserCard from "../../components/card/DiscoverUserCard.tsx";
import { motion } from "framer-motion";
import { HiOutlineUsers } from "react-icons/hi2";
import Pagination from "../../components/pagination/Pagination.tsx";

const DashboardDiscoverPeople = () => {
  const { username } = useAuthentication();
  const [currentPage, setCurrentPage] = useState(0);

  const [userParams, setUserParams] = useState<UserParams>({
    userUsername: username ?? "",
    minAge: 20,
    maxAge: 70,
    pageNumber: currentPage,
    pageSize: 20,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { matchingUsers, fetchingMatchingUsers } =
    useMatchingUsersQuery(userParams);

  useEffect(() => {
    setUserParams({ ...userParams, pageNumber: currentPage });
  }, [currentPage]);

  if (fetchingMatchingUsers) {
    return <Spinner />;
  }

  console.log(userParams);

  return (
    <Page>
      <SectionContainer>
        <SectionBanner title="Find a matching soul">
          <AnimatedButton
            onClick={() => setIsModalOpen(true)}
            className="size-12 rounded-xl cursor-pointer border-2 border-pink-100 bg-black-200 text-white hover:bg-pink-100 hover:text-black-100 transition-all"
            hoverBackgroundColor="#E80352"
            hoverTextColor="#FFFFFF"
          >
            <VscSettings className="size-7" />
          </AnimatedButton>
        </SectionBanner>

        {matchingUsers && matchingUsers.users.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {matchingUsers.users.map((user: User) => (
                <DiscoverUserCard key={user.userName} user={user} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={matchingUsers.pagination.totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center bg-black-200 rounded-xl border-2 border-gray-200 p-10 mt-6"
          >
            <div className="size-20 rounded-full bg-black-100 flex items-center justify-center mb-4">
              <HiOutlineUsers className="size-10 text-pink-200" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Matches Found
            </h3>
            <p className="text-gray-300 text-center max-w-md mb-6">
              We couldn't find any users matching your criteria. Try adjusting
              your filters to see more people.
            </p>
            <AnimatedButton
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold"
              hoverBackgroundColor="#E80352"
              hoverTextColor="#FFFFFF"
            >
              Adjust Filters
            </AnimatedButton>
          </motion.div>
        )}
      </SectionContainer>

      <AnimatePresence>
        {isModalOpen && (
          <Modal>
            <FilterPeoplePanel
              onClose={() => setIsModalOpen(false)}
              initialFilters={userParams}
              onSubmit={(userParams) => setUserParams(userParams)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default DashboardDiscoverPeople;
