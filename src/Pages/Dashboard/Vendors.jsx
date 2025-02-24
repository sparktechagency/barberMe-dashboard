import React, { useState } from "react";
import { Table, Button, Space, Avatar, Select } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import { useGetAllBerbersQuery } from "../../redux/apiSlices/userSlice";
import moment from "moment";
import { FaEye, FaLock } from "react-icons/fa6";

const Vendors = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const { data: getBarbers, isLoading } = useGetAllBerbersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const berbersList = getBarbers?.data?.users;
  console.log(berbersList);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
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
      title: "discount",
      dataIndex: "discount",
      key: "discount",
      align: "center",
    },
    {
      title: "Barber Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => (
        <p>{moment(record?.createdAt).format("DD/MM/YYYY")} </p>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/barber/profile/${record.id}`}>
            <FaEye size={20} />
          </Link>

          <FaLock className="cursor-pointer text-red-500" size={20} />
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <>
      <h1 className="text-2xl font-semibold  my-5">Barbers</h1>
      <Table
        className="bg-white"
        pagination={{
          pageSize: pageSize,
        }}
        columns={columns}
        dataSource={berbersList}
        rowKey="_id"
      />
    </>
  );
};

export default Vendors;
