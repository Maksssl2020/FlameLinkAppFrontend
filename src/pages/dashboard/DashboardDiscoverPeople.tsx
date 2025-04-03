import Page from "../../animations/Page.tsx";
import { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/modal/Modal.tsx";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import FilterPeoplePanel from "../../components/panel/FilterPeoplePanel.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";

const DashboardDiscoverPeople = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Page>
      <div className={"w-full h-full"}>
        <SectionBanner title={"Find a matching soul"}>
          <AnimatedButton
            onClick={() => setIsModalOpen(true)}
            className={"size-12 rounded-xl cursor-pointer border-2 mt-auto"}
          >
            <VscSettings className={"size-7"} />
          </AnimatedButton>
        </SectionBanner>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal>
            <FilterPeoplePanel onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default DashboardDiscoverPeople;
