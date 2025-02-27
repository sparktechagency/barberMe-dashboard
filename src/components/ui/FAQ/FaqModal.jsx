import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import {
  useCreateFaqMutation,
  useUpdateFaqMutation,
} from "../../../redux/apiSlices/faqSlice";
import toast from "react-hot-toast";

const FaqModal = ({
  setModalData,
  modalData,
  openAddModel,
  setOpenAddModel,
}) => {
  const [form] = Form.useForm();

  console.log(modalData);

  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();

  useEffect(() => {
    if (modalData) {
      form.setFieldsValue({
        question: modalData?.question,
        answer: modalData?.answer,
      });
    }
  }, [modalData]);

  const onFinish = async (values) => {
    if (modalData) {
      console.log(modalData);

      const data = {
        ...values,
      };

      try {
        const res = await updateFaq({ data, id: modalData?._id }).unwrap();
        console.log(res);
        if (res.success) {
          toast.success("Faq updated successfully");
          setOpenAddModel(false);
          setModalData(null);
          form.resetFields();
        }
      } catch (error) {
        toast.error(error?.data?.message);
      }
    } else {
      try {
        const res = await createFaq(values).unwrap();
        console.log(res);
        if (res.success) {
          toast.success("Faq added successfully");
          setOpenAddModel(false);
          setModalData(null);
          form.resetFields();
        }
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };
  return (
    <Modal
      centered
      open={openAddModel}
      onCancel={() => {
        setOpenAddModel(false);
        setModalData(null);
        form.resetFields();
      }}
      width={500}
      footer={false}
    >
      <div className="p-6">
        <h1
          className=" text-[20px] font-medium"
          style={{ marginBottom: "12px" }}
        >
          {modalData ? "Update FAQ" : "Add FAQ"}
        </h1>
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            name="question"
            style={{ marginBottom: "16px" }}
            label={<p style={{ display: "block" }}>Question</p>}
          >
            <Input
              type="Text"
              placeholder="Enter Question"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="answer"
            style={{ marginBottom: "16px" }}
            label={<p style={{ display: "block" }}>Answer</p>}
          >
            <Input.TextArea
              type="Text"
              placeholder="Enter answer"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "152px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                resize: "none",
              }}
            />
          </Form.Item>
          <Form.Item className=" text-end">
            <button
              type="primary"
              htmlType="submit"
              className="bg-primary text-white w-[120px] h-[42px] rounded-lg"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default FaqModal;
