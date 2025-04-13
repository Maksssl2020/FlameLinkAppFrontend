import Page from "../../animations/Page.tsx";
import { UserProfile } from "../../types/userProfileTypes.ts";

type AccountProfilePreviewSectionProps = {
  userProfile: UserProfile;
};

const AccountProfilePreviewSection = ({
  userProfile,
}: AccountProfilePreviewSectionProps) => {
  return (
    <Page className={"w-full h-full grid grid-cols-3 gap-4"}>
      <div className={"w-full text-white h-auto flex flex-col gap-4"}>
        <div className={"text-2xl"}>{userProfile.displayName}</div>
        <div>{userProfile.age}</div>
        <div className={"w-full h-[400px] border-2 rounded-xl"}>
          {userProfile.mainPhoto ? (
            <img
              className={"w-full h-full object-cover rounded-lg"}
              src={`data:image/jpeg;base64,${userProfile.mainPhoto?.imageData}`}
              alt={userProfile.id.toString()}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className={"col-span-2  w-full h-auto"}></div>
    </Page>
  );
};

export default AccountProfilePreviewSection;
