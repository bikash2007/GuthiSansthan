import React, { useState, useEffect } from "react";
import axios from "axios";

const EditLocation = ({ contactInfo }) => {
  // Initialize state with contactInfo values
  const [formData, setFormData] = useState({
    contact_no: "",
    location: "",
    location_url: "",
    email: "",
  });

  // Populate formData if contactInfo is available
  useEffect(() => {
    if (contactInfo) {
      setFormData({
        contact_no: contactInfo.contact_no || "",
        location: contactInfo.location || "",
        location_url: contactInfo.location_url || "",
        email: contactInfo.email || "",
      });
    }
  }, [contactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "https://ingnepal.org.np/api/guthi-contact/1/", // Ensure this endpoint is correct
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Data successfully updated!");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="contact_no"
          placeholder="Contact Number"
          value={formData.contact_no}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="location_url"
          placeholder="Location URL"
          value={formData.location_url}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditLocation;
