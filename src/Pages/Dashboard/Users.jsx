import React, { useState } from "react";
import { Table, Space, Modal } from "antd";
import randomImg from "../../assets/randomProfile2.jpg";
import { useGetAllCustomersQuery } from "../../redux/apiSlices/userSlice";
import moment from "moment";
import { FaEye, FaLock } from "react-icons/fa6";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const { data: getUsers, isLoading } = useGetAllCustomersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const usersList = getUsers?.data?.users || [];

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
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
            alt="User"
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
      title: "Customer Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => (
        <p>{moment(record?.createdAt).format("DD/MM/YYYY")}</p>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_, record) => (
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
      <h1 className="text-2xl font-semibold my-5">Users</h1>
      <Table
        columns={columns}
        dataSource={usersList}
        rowKey="_id"
        pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
      />

      {/* User Details Modal */}
      <Modal
        title="User Details"
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                className="w-16 h-16 rounded-full"
                src={
                  selectedUser.profile
                    ? selectedUser.profile.startsWith("http")
                      ? selectedUser.profile
                      : `${import.meta.env.VITE_BASE_URL}${
                          selectedUser.profile
                        }`
                    : randomImg
                }
                alt="User"
              />
              <div>
                <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                <p className="text-gray-500">{selectedUser.email}</p>
              </div>
            </div>
            <p>
              <strong>Customer Since:</strong>{" "}
              {moment(selectedUser.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Users;
