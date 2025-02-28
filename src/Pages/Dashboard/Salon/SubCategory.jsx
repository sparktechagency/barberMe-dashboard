import React, { useState } from "react";

import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "../../../redux/apiSlices/categorySlice";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";

const { Search } = Input;

const SubCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { data: subCategories, isLoading } = useGetAllSubCategoriesQuery();
  const { data: categories, isLoading: categoryLoading } =
    useGetAllCategoriesQuery();
  const [createSubCategory, { isLoading: creating }] =
    useCreateSubCategoryMutation();
  const [deleteSubCategory, { isLoading: deleting }] =
    useDeleteSubCategoryMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const subCategoriesData = subCategories?.data || [];
  const categoriesData = categories?.data || [];
  // //console.log(subCategoriesData);

  const filteredSubCategories = subCategoriesData?.filter((subCategory) =>
    subCategory?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Subcategory Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <RiDeleteBin5Line
            onClick={() => handleDeleteSubCategory(record._id)}
            size={24}
            className="text-red-600 cursor-pointer"
          />
        </div>
      ),
    },
  ];
  const handleAddSubCategory = () => {
    setIsModalVisible(true); // Open the modal
  };

  const handleModalCancel = () => {
    form.resetFields(); // Reset form fields
    setIsModalVisible(false); // Close the modal
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newSubCategory = {
        title: values.title,
        category: values.categoryId,
      };
      const res = await createSubCategory(newSubCategory).unwrap();
      if (res.success) {
        toast.success("Subcategory added successfully");
        form.resetFields();
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleDeleteSubCategory = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this subcategory?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await deleteSubCategory(id).unwrap();
          //console.log("Subcategory deleted successfully");
        } catch (error) {
          console.error("Error deleting subcategory:", error);
        }
      },
    });
  };

  return (
    <div className="">
      <h1 className="text-4xl text-center font-semibold my-10">
        Subcategories
      </h1>
      <div className="flex justify-between mb-4">
        <Search
          placeholder="Search subcategories or categories"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 20 }}
        />
      </div>
      <div className="flex justify-between items-center my-5">
        <p className="my-3">
          Total Services:{" "}
          <span className="font-semibold">
            {subCategoriesData.length} Items
          </span>{" "}
          Found
        </p>
        <Button type="primary" onClick={handleAddSubCategory}>
          Add Subcategory
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredSubCategories}
        rowKey="_id"
      />

      <Modal
        title="Add Subcategory"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Subcategory Title"
            rules={[
              {
                required: true,
                message: "Please enter the subcategory title!",
              },
            ]}
          >
            <Input placeholder="Enter subcategory title" />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select placeholder="Select category">
              {categoriesData?.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubCategory;
