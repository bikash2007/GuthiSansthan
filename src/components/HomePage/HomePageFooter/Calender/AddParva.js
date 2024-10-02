import React, { useState, useEffect } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
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
    festival: null,
  });
  const token = sessionStorage.getItem("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  const [festivalOptions, setfestivalOptions] = useState([]);

  // Fetch festival options (example API call)
  useEffect(() => {
    const fetchfestivalOptions = async () => {
      try {
        const response = await fetch(`${baseUrl}api/festivals/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setfestivalOptions(data);
      } catch (error) {
        console.error("Error fetching festival options:", error);
      }
    };

    fetchfestivalOptions();
  }, [baseUrl, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNepaliDateChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
    <div className="w-full max-w-lg mx-auto p-6 mt-96 bg-white rounded-lg shadow-lg relative">
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
          <NepaliDatePicker
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            value={formData.start_date}
            onChange={(value) => handleNepaliDateChange("start_date", value)}
            options={{ calenderLocale: "ne", valueLocale: "en" }}
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-700">End Date</label>
          <NepaliDatePicker
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            value={formData.end_date}
            onChange={(value) => handleNepaliDateChange("end_date", value)}
            options={{ calenderLocale: "ne", valueLocale: "en" }}
          />
        </div>

        {/* festival Dropdown */}
        <div>
          <label className="block text-gray-700">Jatra</label>
          <select
            name="festival"
            value={formData.festival}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
            required
          >
            <option value="">Select festival</option>
            {festivalOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
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
          />
        </div>

        {/* Contact No */}
        <div>
          <label className="block text-gray-700">Contact No</label>
          <input
            type="text"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-cyan-300"
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
