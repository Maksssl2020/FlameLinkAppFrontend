import Page from "../animations/Page.tsx";
import { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/modal/Modal.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import FilterPeoplePanel from "../components/panel/FilterPeoplePanel.tsx";

const DiscoverPeople = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Page>
      <div className={"w-full h-full"}>
        <div
          className={
            "w-full h-[75px] flex items-end border-b-2 p-2 border-gray-200"
          }
        >
          <h1 className={"text-4xl uppercase text-gradient "}>
            Find a matching soul
          </h1>
          <div className={"w-auto text-white h-full flex ml-auto"}>
            <AnimatedButton
              onClick={() => setIsModalOpen(true)}
              className={"size-12 rounded-xl cursor-pointer border-2 mt-auto"}
            >
              <VscSettings className={"size-7"} />
            </AnimatedButton>
          </div>
        </div>
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

export default DiscoverPeople;
