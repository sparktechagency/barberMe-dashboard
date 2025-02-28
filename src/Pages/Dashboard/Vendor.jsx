import React from "react";
import { Avatar, Card, Table, Space, Button } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";

const Vendor = () => {
  const barber = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "+123456789",
    address: "123 Main St, Cityville",
    experienceLevel: "Senior",
    rating: 4.8,
    totalServices: 120,
    totalEarnings: "$6000",
    status: "Active",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    reviews: [
      {
        id: "r1",
        customerName: "Alice Johnson",
        rating: 5,
        comment: "Great service, very professional!",
        date: "2023-12-12",
      },
      {
        id: "r2",
        customerName: "Bob Smith",
        rating: 4,
        comment: "Good experience overall.",
        date: "2023-12-10",
      },
      {
        id: "r3",
        customerName: "Charlie Brown",
        rating: 3,
        comment: "Service was okay, could be better.",
        date: "2023-12-09",
      },
    ],
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <span className="text-yellow-500 font-bold">{rating} / 5</span>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            className="border border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
            onClick={() => handleReviewAction(record.id, "approve")}
          >
            Approve
          </Button>
          <Button
            className="border border-red-600 text-red-700 hover:bg-red-600 hover:text-white"
            onClick={() => handleReviewAction(record.id, "reject")}
          >
            Reject
          </Button>
          <Button
            className="border border-gray-600 text-gray-700 hover:bg-gray-600 hover:text-white"
            onClick={() => handleReviewAction(record.id, "delete")}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleReviewAction = (reviewId, action) => {
    //console.log(`${action} review with ID: ${reviewId}`);
    // Implement the logic for approving, rejecting, or deleting the review
  };

  return (
    <div className=" mx-auto p-4">
      <div className="mb-4">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className=" border-4 p-1 rounded-full">
              <img
                src={barber.profileImg || randomImg}
                alt={barber.name}
                size={100}
                className="border-2 w-[200px] h-[200px] rounded-full  border-gray-300"
              />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {barber.name}
              </h2>
              <p className="text-gray-600 text-lg font-semibold">
                {barber.email}
              </p>
            </div>
          </div>
          <div className="ml-4 text-xl flex flex-col gap-1">
            <p className="text-gray-600">
              <span className="font-semibold">Experience Level:</span>{" "}
              {barber.experienceLevel}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Phone Number:</span>{" "}
              {barber.phoneNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Address: </span>
              {barber.address}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Services</span>{" "}
              {barber.totalServices}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Earnings:</span>{" "}
              {barber.totalEarnings}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold"> Status:</span>{" "}
              <span
                className={`px-2 py-1  ${
                  barber.status === "Active"
                    ? "text-green-500"
                    : barber.status === "Inactive"
                    ? "text-red-500"
                    : "text-orange-500"
                }`}
              >
                {barber.status}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Average Rating:</span>{" "}
              {barber.rating}
            </p>
          </div>
        </div>
      </div>

      <Card title="Customer Reviews" className="shadow-lg mt-20">
        <Table
          columns={columns}
          dataSource={barber.reviews}
          rowKey={(record) => record.id}
        />
      </Card>
    </div>
  );
};

export default Vendor;
