import ApiUsage from "./ApiUsage";
import Metrics from "./Metrics";
import PaymentOptions from "./PaymentOptions";

const SettingsLayout = () => {
  return (
    <div className="   md:px-[2rem] pt-[1rem] ">
      <div>
        {/*  */}
        <PaymentOptions />
        <ApiUsage />
        <Metrics />
      </div>
    </div>
  );
};
export default SettingsLayout;
