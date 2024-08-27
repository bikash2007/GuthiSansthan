import React, { useState } from 'react';

export default function Add() {
  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone: '',
    email: ''
  });

  const [spokesperson, setSpokesperson] = useState({
    name: '',
    role: '',
    phone: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in contactInfo) {
      setContactInfo({ ...contactInfo, [name]: value });
    } else if (name in spokesperson) {
      setSpokesperson({ ...spokesperson, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend or update state)
    console.log('Contact Info:', contactInfo);
    console.log('Spokesperson Info:', spokesperson);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Contact US</h2>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={contactInfo.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={contactInfo.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={contactInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="name">
            Spokesperson Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={spokesperson.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="role">
            Spokesperson Role
          </label>
          <input
            type="text"
            name="role"
            id="role"
            value={spokesperson.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="spokespersonPhone">
            Spokesperson Phone
          </label>
          <input
            type="text"
            name="phone"
            id="spokespersonPhone"
            value={spokesperson.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="image">
            Spokesperson Image URL
          </label>
          <input
            type="file"
            name="image"
            id="image"
            value={spokesperson.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 text-xl font-bold text-white transition-transform duration-300 ease-in-out transform bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-2xl hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
