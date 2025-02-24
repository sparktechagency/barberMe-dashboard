import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Upload } from "antd";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../../redux/api/baseApi";
import moment from "moment";
import { FaEye, FaTrash } from "react-icons/fa6";
import { FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const { Search } = Input;

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const allCategories = categories?.data || [];

  const filteredCategories = allCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Add/Edit Modal
  const showModal = (record) => {
    setEditingCategory(record);
    setIsModalVisible(true);
    setImageFile(null); // Reset image file state

    if (record) {
      form.setFieldsValue({
        name: record.name,
        image: record.image
          ? [{ uid: "-1", url: `${imageUrl}${record.image}` }]
          : [],
      });
    } else {
      form.resetFields();
    }
  };

  const showViewModal = (record) => {
    setSelectedCategory(record);
    setIsViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
    setImageFile(null);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);

    // Append the selected image file if available
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingCategory) {
        const res = await updateCategory({
          id: editingCategory._id,
          data: formData,
        }).unwrap();
        if (res.success) {
          toast.success("Category updated successfully");
          handleCancel();
        }
      } else {
        const res = await createCategory(formData).unwrap();
        if (res.success) {
          toast.success("Category created successfully");
          handleCancel();
        }
      }
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id).unwrap();
      if (res.success) {
        toast.success("Category deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            src={
              record?.image?.startsWith("http")
                ? record?.image
                : `${imageUrl}${record?.image}`
            }
            alt={record.name}
          />
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Subcategories",
      dataIndex: "subCategory",
      key: "subCategory",
      render: (subCategories) => (
        <span>{subCategories?.length || 0} Items</span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY HH:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <span className="flex items-center gap-2">
          <FaEye
            size={20}
            className="cursor-pointer text-green-500"
            onClick={() => showViewModal(record)}
          />
          <FaEdit
            size={20}
            className="cursor-pointer text-blue-500"
            onClick={() => showModal(record)}
          />
          <FaTrash
            size={20}
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(record._id)}
          />
        </span>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center my-10">
        <h1 className="text-4xl font-bold">Categories</h1>
      </div>
      <Search
        placeholder="Search categories or subcategories"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <div className="flex justify-between items-center">
        <p className="my-3">
          Total Services:{" "}
          <span className="font-semibold">
            {filteredCategories.length} Items
          </span>{" "}
          Found
        </p>
        <Button
          className="px-4 py-5 bg-primary text-white"
          icon={<FaPlus />}
          onClick={() => showModal()}
        >
          Create Category
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredCategories} rowKey="id" />
      <Modal
        title={editingCategory ? "Edit Category" : "Create Category"}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload Image"
            rules={
              editingCategory
                ? []
                : [{ required: true, message: "Please upload an image" }]
            }
          >
            <Upload
              beforeUpload={(file) => {
                setImageFile(file);
                form.setFieldsValue({
                  image: [{ uid: "-1", url: URL.createObjectURL(file) }],
                });
                return false;
              }}
              onRemove={() => {
                setImageFile(null);
                form.setFieldsValue({ image: [] }); // Clear the form value
              }}
              listType="picture-card"
              fileList={
                imageFile
                  ? [{ uid: "-1", url: URL.createObjectURL(imageFile) }]
                  : editingCategory?.image
                  ? [{ uid: "-1", url: `${imageUrl}${editingCategory.image}` }]
                  : []
              }
            >
              Upload
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Category Details"
        open={isViewModalVisible}
        onCancel={handleViewModalCancel}
        footer={null} // No footer buttons
      >
        {selectedCategory && (
          <div>
            <div className="flex items-center justify-center flex-col">
              <img
                src={
                  selectedCategory.image
                    ? `${imageUrl}${selectedCategory.image}`
                    : "default-image-url.jpg"
                }
                alt={selectedCategory.name}
                className="w-40 h-40 rounded-full"
              />
              <div className="my-3">
                <p className="text-xl font-bold text-center">
                  {selectedCategory.name}
                </p>
                <p>
                  Created At:{" "}
                  {moment(selectedCategory.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">Sub Categories</h1>
              <ul>
                {selectedCategory?.subCategory?.map((subCategory) => (
                  <li key={subCategory._id}>
                    {selectedCategory.subCategory.indexOf(subCategory) + 1}.{" "}
                    {subCategory.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Category;
