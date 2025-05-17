import AnimatedButton from "../button/AnimatedButton.tsx";
import { IoCloseOutline } from "react-icons/io5";
import AgeFilterSelect from "../select/AgeFilterSelect.tsx";
import AnimatedOptionButton from "../button/AnimatedOptionButton.tsx";
import SelectWithSearchbar from "../select/SelectWithSearchbar.tsx";
import { useState } from "react";
import Spinner from "../spinner/Spinner.tsx";
import useInterestSelection from "../../hooks/useInterestSelection.ts";
import InterestCard from "../card/InterestCard.tsx";
import { UserParams, UserParamsImagesOptions } from "../../types/userTypes.ts";
import useAuthentication from "../../hooks/useAuthentication.ts";
import { useUserFilterParamsStore } from "../../store/userFilterParamsStore.ts";

type FilterPeoplePanelProps = {
  onClose?: () => void;
  initialFilters: UserParams;
  onSubmit?: (params: UserParams) => void;
};

const allImagesOptions: UserParamsImagesOptions[] = ["All", "With", "Without"];

const FilterPeoplePanel = ({
  onClose,
  onSubmit,
  initialFilters,
}: FilterPeoplePanelProps) => {
  const { username } = useAuthentication();
  const { setUserParams } = useUserFilterParamsStore.getState();
  const [selectedUserParamsImagesOption, setSelectedUserParamsImagesOption] =
    useState<UserParamsImagesOptions>(initialFilters.userParamsImagesOptions);

  const [minAgeValue, setMinAgeValue] = useState<number>(
    initialFilters?.minAge ?? 20,
  );
  const [maxAgeValue, setMaxAgeValue] = useState<number>(
    initialFilters?.maxAge ?? minAgeValue + 1,
  );
  const {
    fetchingInterests,
    selectedInterests,
    availableInterests,
    selectInterest,
  } = useInterestSelection(initialFilters.interests);

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

  const handleSubmitFilters = () => {
    const params: UserParams = {
      userUsername: username ?? "",
      minAge: minAgeValue,
      maxAge: maxAgeValue,
      pageSize: 20,
      interests: selectedInterests.length > 0 ? selectedInterests : undefined,
      userParamsImagesOptions: selectedUserParamsImagesOption,
      pageNumber: 0,
    };

    setUserParams(params);
    onSubmit?.(params);
    onClose?.();
  };

  if (fetchingInterests || !availableInterests) {
    return <Spinner />;
  }

  return (
    <div className="w-[600px] max-w-full h-auto flex flex-col gap-8 p-6 rounded-xl relative border-2 border-pink-100 bg-black-200 shadow-lg shadow-pink-100/10">
      <AnimatedButton
        onClick={() => onClose?.()}
        className="size-10 absolute right-3 top-3 rounded-full border-2 border-pink-100 cursor-pointer text-white "
        hoverBackgroundColor="#E80352"
        hoverTextColor="#FFFFFF"
      >
        <IoCloseOutline className="size-7" />
      </AnimatedButton>
      <h1 className="text-3xl text-white self-center font-bold">
        Set Filter Options
      </h1>
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
            {allImagesOptions.map((data, index) => (
              <AnimatedOptionButton
                key={index}
                isSelected={selectedUserParamsImagesOption === data}
                selectedTextColor={"#141414"}
                backgroundColor={"#141414"}
                borderColor={"#292929"}
                onClick={() => setSelectedUserParamsImagesOption(data)}
                className={"rounded-xl border-2 px-4 h-[50px] font-bold"}
              >
                {data}
              </AnimatedOptionButton>
            ))}
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
      <AnimatedButton
        onClick={handleSubmitFilters}
        className="w-full h-[55px] mt-auto bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold rounded-xl text-xl"
        hoverBackgroundColor="#E80352"
        hoverTextColor="#FFFFFF"
      >
        Apply Filters
      </AnimatedButton>
    </div>
  );
};

export default FilterPeoplePanel;
