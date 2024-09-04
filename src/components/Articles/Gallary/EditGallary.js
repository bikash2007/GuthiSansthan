import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EditGallary = ({ Gallary, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    file: null,
    previewUrl: "",
  });

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (Gallary) {
      setFormData({
        title: Gallary.title,
        file: null,
        previewUrl: Gallary.file ? Gallary.file : "", // Assuming Gallary.file is a URL to the current file
      });
    }

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [Gallary, onClose]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newFile = files ? files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newFile,
      previewUrl: newFile ? URL.createObjectURL(newFile) : prevData.previewUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    if (formData.file) data.append("file", formData.file);

    try {
      const response = await axios.patch(
        `https://ingnepal.org.np/api/Gallarys/${Gallary.id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Gallary updated successfully!");
        onSave(); // Trigger a refresh or update action in the parent component
        onClose(); // Close the edit form
      } else {
        alert("Failed to update Gallary.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating Gallary.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <div ref={wrapperRef} className="w-full max-w-xl p-6 transition-shadow duration-300 ease-in-out rounded-lg shadow-lg bg-gray-600/30 backdrop-blur-xl hover:shadow-2xl">
        <h3 className="mb-5 text-2xl font-semibold text-center text-white font-poppins">
          Edit Video or Image
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fileUpload"
              className="block text-sm font-medium text-white font-poppins"
            >
              Upload Photo or Video
            </label>
            <input
              type="file"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md text-base font-poppins text-gray-700 bg-white focus:ring-[#30D5C8] focus:border-[#30D5C8] hover:border-[#2ab2aa] transition-colors duration-300"
              id="fileUpload"
              name="file"
              onChange={handleChange}
            />
          </div>
          {formData.previewUrl && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white">Preview:</h4>
              {formData.previewUrl.endsWith(".mp4") ? (
                <video className="w-full h-auto mt-2" controls>
                  <source src={formData.previewUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={formData.previewUrl} className="w-full h-auto mt-2" alt="Preview" />
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-green-700 rounded-md shadow-lg hover:bg-green-800 hover:shadow-xl font-poppins"
          >
            Update
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 mt-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-red-700 rounded-md shadow-lg hover:bg-red-800 hover:shadow-xl font-poppins"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditGallary;
