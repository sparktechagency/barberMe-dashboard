import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

import logo from "../../../assets/barberMeLogo.png";
import toast from "react-hot-toast";
import {
  useAboutUsQuery,
  useCreateAboutUsMutation,
} from "../../../redux/apiSlices/privacyPolicySlice";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: aboutUs, isLoading, refetch } = useAboutUsQuery();

  const [updateAboutUs] = useCreateAboutUsMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const aboutUsData = aboutUs?.data?.content;

  // //console.log(aboutUsData);

  const aboutUsDataSave = async () => {
    const data = {
      content: content,
    };

    try {
      const res = await updateAboutUs(data).unwrap();
      if (res.success) {
        toast.success("About Us updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>About Us</h1>

      <JoditEditor
        ref={editor}
        value={aboutUsData}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={aboutUsDataSave}
          type="submit"
          className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
