import React, { useState } from "react";

export default function Lawform() {
  const [formData, setFormData] = useState({
    title: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("file", formData.file);

    try {
      const response = await fetch("https://ingnepal.org.np/api/laws/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        window.location.reload(); // Refresh the page on successful upload
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-full max-w-xl p-6 transition-shadow duration-300 ease-in-out rounded-lg shadow-lg bg-gray-600/30 backdrop-blur-xl hover:shadow-2xl">
        <h3 className="mb-5 text-2xl font-semibold text-center text-white font-poppins">
          Upload Your Document
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="pdfTitle"
              className="block text-sm font-medium text-white font-poppins"
            >
              PDF Title
            </label>
            <input
              type="text"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md text-base font-poppins text-gray-700 bg-white focus:ring-[#30D5C8] focus:border-[#30D5C8] hover:border-[#2ab2aa] transition-colors duration-300"
              id="pdfTitle"
              name="title"
              placeholder="Enter PDF Title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="photoUpload"
              className="block text-sm font-medium text-white font-poppins"
            >
              Upload PDF
            </label>
            <input
              type="file"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md text-base font-poppins text-gray-700 bg-white focus:ring-[#30D5C8] focus:border-[#30D5C8] hover:border-[#2ab2aa] transition-colors duration-300"
              id="photoUpload"
              name="file"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-green-700 rounded-md shadow-lg hover:bg-green-800 hover:shadow-xl font-poppins"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
