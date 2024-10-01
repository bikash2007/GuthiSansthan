import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddParva = () => {
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    tithi_from: "",
    tithi_to: "",
    description: "",
    guthi_name: "",
    guthi_address: "",
    contactperson: "",
    contact_no: "",
    status: false,
    festival: null,
  });
  const token = sessionStorage.getItem("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(`${baseUrl}api/parvas/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Parva added successfully!");
        setFormData({
          name: "",
          start_date: "",
          end_date: "",
          tithi_from: "",
          tithi_to: "",
          description: "",
          guthi_name: "",
          guthi_address: "",
          contactperson: "",
          contact_no: "",
          status: false,
          festival: null,
        });
      } else {
        setSubmitMessage("Error adding Parva. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to add Parva. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 mt-96 bg-white rounded-lg shadow-lg  relative ">
      <h2 className="text-2xl font-bold mb-6 text-center mt-64 text-cyan-600">
        Add Parva
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            required
          />
        </div>

        {/* Tithi From */}
        <div>
          <label className="block text-gray-700">Tithi From</label>
          <input
            type="text"
            name="tithi_from"
            value={formData.tithi_from}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            placeholder="Enter Tithi"
          />
        </div>

        {/* Tithi To */}
        <div>
          <label className="block text-gray-700">Tithi To</label>
          <input
            type="text"
            name="tithi_to"
            value={formData.tithi_to}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            placeholder="Enter Tithi"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            placeholder="Enter description"
          />
        </div>

        {/* Guthi Name */}
        <div>
          <label className="block text-gray-700">Guthi Name</label>
          <input
            type="text"
            name="guthi_name"
            value={formData.guthi_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
          />
        </div>

        {/* Guthi Address */}
        <div>
          <label className="block text-gray-700">Guthi Address</label>
          <input
            type="text"
            name="guthi_address"
            value={formData.guthi_address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
          />
        </div>

        {/* Contact Person */}
        <div>
          <label className="block text-gray-700">Contact Person</label>
          <input
            type="text"
            name="contactperson"
            value={formData.contactperson}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            required
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            required
          />
        </div>

        {/* Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring focus:ring-cyan-300"
          />
          <label className="ml-2 text-gray-700">Status</label>
        </div>

        {/* Festival (optional) */}
        <div>
          <label className="block text-gray-700">Festival (Optional)</label>
          <input
            type="text"
            name="festival"
            value={formData.festival || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            placeholder="Enter Festival ID (if any)"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-cyan-600 text-white rounded-md font-semibold hover:bg-cyan-700 focus:ring focus:ring-cyan-300"
          >
            {isSubmitting ? "Submitting..." : "Add Parva"}
          </button>
        </div>

        {/* Submission Message */}
        {submitMessage && (
          <div className="mt-4 text-center text-cyan-700 font-semibold">
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddParva;
