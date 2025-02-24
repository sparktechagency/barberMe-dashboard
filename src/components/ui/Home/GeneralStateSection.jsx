import { FaUsers } from "react-icons/fa6";
import salongoLogo from "../../../assets/salon-go-logo.png";
import { useGeneralStatsQuery } from "../../../redux/apiSlices/dashboardSlice";

const GeneralStateSection = () => {
  const { data: generalState, isLoading } = useGeneralStatsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={salongoLogo} alt="" />
      </div>
    );
  }

  const state = generalState?.data;

  console.log(state);

  return (
    <div className="grid md:grid-cols-4 gap-3 md:h-[80px]">
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total Customers</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalCustomers}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">New Berbers</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalBarbers}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total Revenue</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalRevenue}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-2xl text-base">Total Income</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalIncome}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GeneralStateSection;
