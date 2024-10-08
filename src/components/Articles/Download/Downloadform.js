import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Downloadform() {
  const [formData, setFormData] = useState({
    title: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    const data = new FormData();
    data.append("title", formData.title);
    if (formData.file) data.append("file", formData.file);

    try {
      const response = await fetch(`${baseUrl}api/downloads/`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Download added successfully!");
        window.location.reload(); // Refresh the page on successful upload
      } else {
        alert("Failed to add download.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding download.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-full max-w-xl p-6 transition-shadow duration-300 ease-in-out rounded-lg shadow-lg bg-gray-600/30 backdrop-blur-xl hover:shadow-2xl">
        <h3 className="mb-5 text-2xl font-semibold text-center text-white font-poppins">
          Upload Your Download
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="downloadTitle"
              className="block text-sm font-medium text-white font-poppins"
            >
              Download Title
            </label>
            <input
              type="text"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md text-base font-poppins text-gray-700 bg-white focus:ring-[#30D5C8] focus:border-[#30D5C8] hover:border-[#2ab2aa] transition-colors duration-300"
              id="downloadTitle"
              name="title"
              placeholder="Enter Download Title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading} // Disable input if loading
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fileUpload"
              className="block text-sm font-medium text-white font-poppins"
            >
              Upload File
            </label>
            <input
              type="file"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md text-base font-poppins text-gray-700 bg-white focus:ring-[#30D5C8] focus:border-[#30D5C8] hover:border-[#2ab2aa] transition-colors duration-300"
              id="fileUpload"
              name="file"
              onChange={handleChange}
              disabled={loading} // Disable input if loading
            />
          </div>

          <button
            type="submit"
            className={`w-full px-6 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-green-700 rounded-md shadow-lg hover:bg-green-800 hover:shadow-xl font-poppins ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button if loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Submitting...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
