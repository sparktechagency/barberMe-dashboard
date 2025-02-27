import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import FaqModal from "../../ui/FAQ/FaqModal";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
} from "../../../redux/apiSlices/faqSlice";
import toast from "react-hot-toast";

const Faq = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [deleteFaq] = useDeleteFaqMutation();

  // console.log(modalData);

  const { data: faqs, isLoading } = useGetFaqQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const faqData = faqs?.data;
  console.log(faqData);

  const handleDelete = async (id) => {
    try {
      const res = await deleteFaq(id).unwrap();
      if (res.success) {
        toast.success("Faq deleted successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="">
      <div className=" mb-4 flex justify-end pe-5 items-center w-full">
        <button
          onClick={() => setOpenAddModel(true)}
          className="flex items-center gap-1 px-4 py-2 text-white bg-primary rounded hover:bg-secondary hover:text-black transition-colors"
        >
          <FaPlus />
          Add FAQ
        </button>
      </div>

      <div className=" pb-6 px-4 rounded-md">
        {faqData?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start gap-4 py-4 px-4 rounded-lg bg-white mb-3"
          >
            <GoQuestion color="#8b0000" size={25} className="mt-3" />
            <div className="flex-1">
              <p className="text-base font-medium rounded-xl py-2 px-4 flex items-center gap-8">
                <span className="flex-1">{item?.question}</span>
              </p>
              <div className=" rounded-xl py-2 px-4 mt-4">
                <p className="text-[#919191] leading-6">{item?.answer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <CiEdit
                onClick={() => {
                  setOpenAddModel(true);
                  setModalData(item);
                }}
                className="text-2xl cursor-pointer text-[#00809E]"
              />
              <RxCross2
                onClick={() => handleDelete(item?._id)}
                className="text-2xl cursor-pointer text-red-600"
              />
            </div>
          </div>
        ))}
      </div>

      <FaqModal
        setOpenAddModel={setOpenAddModel}
        openAddModel={openAddModel}
        modalData={modalData}
        setModalData={setModalData}
      />
    </div>
  );
};

export default Faq;
