import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BudgetEdit = ({ budget, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    file: null,
  });
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  useEffect(() => {
    if (budget) {
      setFormData({
        title: budget.title,
        amount: budget.amount,
        file: null,
      });
    }
  }, [budget]);

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
    data.append("amount", formData.amount);
    if (formData.file) data.append("file", formData.file);

    try {
      const response = await axios.patch(
        `${baseUrl}api/budgets/${budget.id}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Budget data updated successfully!");
        onSave();
        onClose();
      } else {
        alert("Failed to update budget data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating budget data.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-full max-w-xl p-6 transition-shadow duration-300 ease-in-out rounded-lg shadow-lg bg-gray-600/30 backdrop-blur-xl hover:shadow-2xl">
        <h3 className="mb-5 text-2xl font-semibold text-center text-white font-poppins">
          Edit Budget Data
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white font-poppins"
            >
              Budget Title
            </label>
            <input
              type="text"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md text-base font-poppins text-gray-700 bg-white focus:ring-[#30D5C8] focus:border-[#30D5C8] hover:border-[#2ab2aa] transition-colors duration-300"
              id="title"
              name="title"
              placeholder="Enter Budget Title"
              value={formData.title}
              onChange={handleChange}
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
            />
          </div>

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

export default BudgetEdit;
