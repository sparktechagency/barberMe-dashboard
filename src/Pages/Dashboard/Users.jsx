import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import { useGetAllCustomersQuery } from "../../redux/apiSlices/userSlice";
import moment from "moment";
import { FaEye, FaLock } from "react-icons/fa6";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const { data: getUsers, isLoading } = useGetAllCustomersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const usersList = getUsers?.data?.users;
  console.log(usersList);

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
      render: (text, record) => {
        return (
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
              alt=""
            />
            {text}
          </span>
        );
      },
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
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record.id}`}>
            <FaEye size={20} />
          </Link>
          <FaLock className="cursor-pointer text-red-500" size={20} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold  my-5">Users</h1>
      <Table
        columns={columns}
        dataSource={usersList}
        rowKey="_id"
        pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default Users;
