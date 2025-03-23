import { GridLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className={"fixed inset-0 z-20 flex items-center justify-center"}>
      <div className={"fixed inset-0 z-20 backdrop-blur-2xl"} />
      <div className={"z-20"}>
        <GridLoader color={"#E80352"} size={36} />
      </div>
    </div>
  );
};

export default Spinner;
