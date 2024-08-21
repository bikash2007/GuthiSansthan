import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoticeForm = () => {
  const titleRef = useRef();
  const textRef = useRef();
  const photoRef = useRef();
  // const urgentRef = useRef(false);
  // const popUpRef = useRef(false);
  // const branchRef = useRef();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const title = titleRef.current.value;
    const text = textRef.current.value;
    const image = photoRef.current.files[0];
    // const urgent = urgentRef.current.checked;
    // const display_popup = popUpRef.current.checked;
    // const branch = branchRef.current.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("image", image);
    // formData.append("urgent", urgent);
    // formData.append("display_popup", display_popup);
    // formData.append('branch', branch);

    try {
      const response = await axios.post(
        "https://ingnepal.org.np/api/notices/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Successfully added!");
        navigate("/");
      } else {
        toast.error("Failed to add notice.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notice Form</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Text
            </label>
            <textarea
              ref={textRef}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Photo
            </label>
            <input
              ref={photoRef}
              type="file"
              className="w-full text-gray-700 border border-gray-300 rounded-md file:bg-gray-100 file:border-0 file:mr-4 file:py-2 file:px-4 file:text-gray-800 file:font-medium hover:file:bg-gray-200"
              accept="image/*"
              required
            />
          </div>

          {/* Uncomment if needed
          <div className="flex items-center gap-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <input ref={urgentRef} type="checkbox" className="mr-2" />
              Urgent
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <input ref={popUpRef} type="checkbox" className="mr-2" />
              Pop up
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
            <input
              ref={branchRef}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter branch"
              required
            />
          </div> */}

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NoticeForm;
