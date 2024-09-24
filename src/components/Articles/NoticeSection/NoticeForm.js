import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/poppins"; // Ensure Poppins font is imported

const NoticeForm = () => {
  const titleRef = useRef();
  const textRef = useRef();
  const photoRef = useRef();
  const branchRef = useRef(); // Reference for branch dropdown
  const [branches, setBranches] = useState([]); // State to hold branch data
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // Fetch branches when component mounts
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "https://ingnepal.org.np/api/branches/"
        );
        setBranches(response.data); // Set the branch data from the API
      } catch (error) {
        console.error("Error fetching branches:", error);
        toast.error("Failed to load branches.");
      }
    };

    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const text = textRef.current.value;
    const image = photoRef.current.files[0];
    const branchId = branchRef.current.value; // Get selected branch ID

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("image", image);
    formData.append("branch", branchId); // Add selected branch to form data

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
    <div className="flex items-center justify-center mt-3">
      <div className="w-full max-w-xl px-6 py-6 transition-shadow duration-300 ease-in-out rounded-lg shadow-lg bg-gray-600/30 backdrop-blur-xl hover:shadow-2xl">
        <h1 className="mt-4 mb-6 text-4xl font-bold text-center text-white font-poppins">
          Notice Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-white font-poppins">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-[#30D5C8] focus:border-[#30D5C8] text-base font-poppins hover:border-[#2ab2aa] transition-colors duration-300"
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white font-poppins">
              Text
            </label>
            <textarea
              ref={textRef}
              rows="4"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-[#30D5C8] focus:border-[#30D5C8] text-base font-poppins hover:border-[#2ab2aa] transition-colors duration-300"
              placeholder="Enter text"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white font-poppins">
              Upload File
            </label>
            <input
              ref={photoRef}
              type="file"
              className="mt-2 block w-full text-white px-4 py-2 border border-gray-300 rounded-md shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#30D5C8] text-base font-poppins hover:border-[#2ab2aa] transition-colors duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-white font-poppins">
              Branch
            </label>
            <select
              ref={branchRef}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-[#30D5C8] focus:border-[#30D5C8] text-base font-poppins hover:border-[#2ab2aa] transition-colors duration-300"
              required
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-xl font-bold text-white transition-all duration-300 ease-in-out bg-green-700 rounded-md shadow-lg hover:bg-green-800 hover:shadow-xl font-poppins"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NoticeForm;
