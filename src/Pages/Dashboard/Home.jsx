import React from "react";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";
import logo from "../../assets/barberMeLogo.png";
import UserEngagement from "../../components/ui/Home/UserEngagement";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import Professionals from "../../components/ui/Home/Professionals";

const Home = () => {
  const orderSummary = {
    doneByProfessionals: 65,
    doneByFreelancers: 35,
  };

  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  return (
    <div>
      <GeneralStateSection />
      <div className="md:flex w-full items-center gap-3 mt-3">
        <div className="w-full bg-white border rounded-2xl p-5 flex flex-col justify-center">
          <p className="text-lg font-bold px-4">Sales and Revenue Tracking</p>
          <SalesTrackingChart />
        </div>
      </div>
      <div className="w-full md:flex gap-3">
        <div className="md:w-full my-3 ">
          <UserEngagement />
        </div>
      </div>
    </div>
  );
};

export default Home;
