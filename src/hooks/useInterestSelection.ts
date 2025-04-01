import { useEffect, useState } from "react";
import useInterestsQuery from "./queries/useInterestsQuery.ts";

function useInterestSelection(initSelectedInterests?: string[] | undefined) {
  const { interests, fetchingInterests } = useInterestsQuery();
  const [availableInterests, setAvailableInterests] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initSelectedInterests ?? [],
  );

  useEffect(() => {
    if (interests) {
      const mappedInterests = interests.map(
        (interest) => interest.interestName,
      );
      setAvailableInterests(mappedInterests);
    }
  }, [interests]);

  const selectInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      setAvailableInterests([...availableInterests, interest]);
    } else {
      setSelectedInterests([...selectedInterests, interest]);
      setAvailableInterests(availableInterests.filter((i) => i !== interest));
    }
  };

  return {
    interests,
    fetchingInterests,
    availableInterests,
    selectedInterests,
    selectInterest,
  };
}

export default useInterestSelection;
