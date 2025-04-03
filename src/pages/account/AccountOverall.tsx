import Page from "../../animations/Page.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";

const AccountOverall = () => {
  return (
    <Page>
      <div className={"w-full flex flex-col items-center h-auto"}>
        <SectionBanner title={"Manage your account"} />
      </div>
    </Page>
  );
};

export default AccountOverall;
