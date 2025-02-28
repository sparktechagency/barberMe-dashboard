import React from "react";
import { Table, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useReservationsQuery } from "../../redux/apiSlices/orderSlice";

const RunningOrders = () => {
  const { data: reservations, isLoading } = useReservationsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const allReservations = reservations?.data?.reservations;
  // //console.log(allReservations);

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Customer Name",
      dataIndex: ["customer", "name"],
      key: "customer",
      render: (name, record) => (
        <span className="flex items-center gap-1">
          <img
            src={
              record?.customer?.profile?.startsWith("http")
                ? record?.customer?.profile
                : `${import.meta.env.VITE_BASE_URL}${record?.customer?.profile}`
            }
            alt="Customer"
            className="w-8 h-8 rounded-full"
          />
          <p>{name}</p>
        </span>
      ),
    },

    {
      title: "Service Name",
      dataIndex: ["service", "category", "name"],
      key: "serviceName",
    },
    {
      title: "Barber Name",
      dataIndex: ["barber", "name"],
      key: "barber",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "Pending"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "Upcoming"
              ? "bg-blue-200 text-blue-800"
              : status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "txid",
      key: "txid",
      render: (txid) => (
        <Tooltip title={txid}>
          <p className="max-w-xs truncate">{txid?.slice(0, 8)}...</p>
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString("en-GB"), // Formatting date
    },
  ];

  const handleDelete = (key) => {
    //console.log(`Deleting order with key: ${key}`);
    // Add logic to delete the order here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold  my-5">Orders</h1>
      <Table columns={columns} dataSource={allReservations} rowKey="_id" />
    </div>
  );
};

export default RunningOrders;
