import Page from "../animations/Page.tsx";

const SignUpThirdStep = () => {
  return (
    <Page>
      <div
        className={
          "w-[700px] gap-12 px-4 py-8 flex items-center flex-col h-auto border-2 border-pink-100 rounded-xl"
        }
      >
        <h1 className={"text-4xl text-white"}>
          Sign Up on{" "}
          <span className={"text-gradient font-bold"}>FlameLink</span>
        </h1>
        <div></div>
      </div>
    </Page>
  );
};

export default SignUpThirdStep;
