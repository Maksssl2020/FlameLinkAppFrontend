import AnimatedButton from "../button/AnimatedButton.tsx";
import { IoCloseOutline } from "react-icons/io5";
import AgeFilterSelect from "../select/AgeFilterSelect.tsx";
import AnimatedOptionButton from "../button/AnimatedOptionButton.tsx";
import SelectWithSearchbar from "../select/SelectWithSearchbar.tsx";
import { useState } from "react";
import Spinner from "../spinner/Spinner.tsx";
import useInterestSelection from "../../hooks/useInterestSelection.ts";
import InterestCard from "../card/InterestCard.tsx";

type FilterPeoplePanelProps = {
  onClose?: () => void;
};

const FilterPeoplePanel = ({ onClose }: FilterPeoplePanelProps) => {
  const [minAgeValue, setMinAgeValue] = useState<number>(20);
  const [maxAgeValue, setMaxAgeValue] = useState<number>(minAgeValue + 1);
  const {
    fetchingInterests,
    selectedInterests,
    availableInterests,
    selectInterest,
  } = useInterestSelection();

  const handleMinAgeChange = (data: number) => {
    if (data >= maxAgeValue) {
      setMinAgeValue(data);
      setMaxAgeValue(data + 1);
    } else {
      setMinAgeValue(data);
    }
  };

  const handleMaxAgeChange = (data: number) => {
    if (data > minAgeValue) {
      setMaxAgeValue(data);
    }
  };

  if (fetchingInterests || !availableInterests) {
    return <Spinner />;
  }

  return (
    <div
      className={
        "w-[600px] h-[550px] flex flex-col gap-8 p-4 rounded-xl relative border-2 border-pink-100 bg-black-200"
      }
    >
      <AnimatedButton
        onClick={() => onClose?.()}
        className={
          "size-10 absolute right-2 top-2 rounded-full border-2 cursor-pointer text-white"
        }
      >
        <IoCloseOutline className={"size-7"} />
      </AnimatedButton>
      <h1 className={"text-3xl text-white self-center"}>Set Filter Options</h1>
      <div className={"w-full h-auto  flex flex-col gap-4"}>
        <div className={"flex justify-between text-white items-center"}>
          <label className={"text-xl"}>Preferred age</label>
          <div className={"flex items-center gap-2"}>
            <AgeFilterSelect
              selected={minAgeValue}
              onChange={handleMinAgeChange}
              backgroundColor={"#141414"}
            />
            <p className={"w-[8px] h-[2px] bg-white"} />
            <AgeFilterSelect
              selected={maxAgeValue}
              onChange={handleMaxAgeChange}
              min={minAgeValue + 1}
              backgroundColor={"#141414"}
            />
          </div>
        </div>
        <div
          className={
            "flex gap-1 w-full justify-between text-white items-center"
          }
        >
          <label className={"text-xl "}>Profile option</label>
          <div className={"flex gap-2"}>
            <AnimatedOptionButton
              selectedTextColor={"#141414"}
              backgroundColor={"#141414"}
              borderColor={"#292929"}
              isSelected={true}
              className={"rounded-xl border-2 px-4 h-[50px] font-bold"}
            >
              All
            </AnimatedOptionButton>
            <AnimatedOptionButton
              selectedTextColor={"#141414"}
              backgroundColor={"#141414"}
              borderColor={"#292929"}
              isSelected={false}
              className={"rounded-xl border-2 px-4 h-[50px] font-bold"}
            >
              With Images
            </AnimatedOptionButton>
            <AnimatedOptionButton
              selectedTextColor={"#141414"}
              backgroundColor={"#141414"}
              borderColor={"#292929"}
              isSelected={false}
              className={"rounded-xl border-2 px-4 h-[50px] font-bold"}
            >
              Without Images
            </AnimatedOptionButton>
          </div>
        </div>
        <div
          className={
            "flex justify-between gap-1 w-full text-white items-center"
          }
        >
          <label className={"text-xl"}>Specify interests</label>
          <SelectWithSearchbar
            dropdownData={availableInterests}
            onOptionClick={(value) => selectInterest(value)}
          />
        </div>
        <div
          className={
            "flex justify-between gap-1 w-full text-white items-center"
          }
        >
          <label className={"text-xl flex items-center gap-2"}>
            Specified interests:{" "}
            <span className={"text-pink-100 font-bold"}>
              {selectedInterests.length > 0 ? selectedInterests.length : "None"}
            </span>
          </label>
        </div>
        <div
          className={
            "w-full h-full mt-2 gap-2 overflow-y-auto flex flex-wrap pt-4 border-t-2 border-pink-100"
          }
        >
          {selectedInterests.map((interest, index) => (
            <InterestCard
              onClick={() => selectInterest(interest)}
              key={index}
              interestName={interest}
              isSelected={false}
              backgroundColor={"#141414"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPeoplePanel;
