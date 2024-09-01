// src/components/EditBranchTeams.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBranchTeams = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_no: "",
    photo: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://ingnepal.org.np/api/users/${userId}/`
        );
        const user = response.data;
        setFormData({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          contact_no: user.profile?.contact_no || "",
          photo: user.profile?.photo || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `https://ingnepal.org.np/api/users/?search=${userId}/`,
        formData
      );
      navigate(-1);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contact No</label>
          <input
            type="text"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Photo URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBranchTeams;
