import React, { useState } from "react";
import { Table, Space, Modal } from "antd";
import randomImg from "../../assets/randomProfile2.jpg";
import { useGetAllBerbersQuery } from "../../redux/apiSlices/userSlice";
import moment from "moment";
import { FaEye, FaLock } from "react-icons/fa6";

const Vendors = () => {
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState(null);

  console.log(selectedBarber);

  const { data: getBarbers, isLoading } = useGetAllBerbersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const berbersList = getBarbers?.data?.users;

  const showModal = (record) => {
    setSelectedBarber(record);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedBarber(null);
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            src={
              record?.profile
                ? record?.profile?.startsWith("http")
                  ? record?.profile
                  : `${import.meta.env.VITE_BASE_URL}${record?.profile}`
                : randomImg
            }
            alt="Profile"
          />
          {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      align: "center",
    },
    {
      title: "Barber Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => (
        <p>{moment(record?.createdAt).format("DD/MM/YYYY")}</p>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (text, record) => (
    //     <Space>
    //       <FaEye
    //         size={20}
    //         className="cursor-pointer"
    //         onClick={() => showModal(record)}
    //       />
    //       <FaLock className="cursor-pointer text-red-500" size={20} />
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold my-5">Barbers</h1>
      <Table
        className="bg-white"
        pagination={{ pageSize: pageSize }}
        columns={columns}
        dataSource={berbersList}
        rowKey="_id"
      />

      <Modal
        title="Barber Details"
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
      >
        {selectedBarber && (
          <div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="w-40 h-40 rounded-full mb-3"
                src={
                  selectedBarber?.profile
                    ? selectedBarber?.profile?.startsWith("http")
                      ? selectedBarber?.profile
                      : `${import.meta.env.VITE_BASE_URL}${
                          selectedBarber?.profile
                        }`
                    : randomImg
                }
                alt="Profile"
              />
              <p className="text-2xl font-semibold">{selectedBarber.name}</p>
              <p className="text-gray-500 text-lg">{selectedBarber.email}</p>
            </div>
            <p className="my-2 text-lg">
              <strong>Role:</strong> {selectedBarber.role}
            </p>
            <p className="my-2 text-lg">
              <strong>Discount:</strong> {selectedBarber.discount}%
            </p>
            <p className="my-2 text-lg">
              <strong>Barber Since:</strong>{" "}
              {moment(selectedBarber?.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Vendors;
