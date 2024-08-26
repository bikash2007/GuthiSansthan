import React, { useState } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { MdAddCall, MdOutlineMail } from 'react-icons/md';

export default function Addtop() {
  const [contactInfo, setContactInfo] = useState({
    address: '123 Main St, Cityville',
    phone: '+123456789',
    email: 'info@example.com'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the updated information can be added here, such as sending it to a backend or local storage.
    alert('Contact information updated successfully!');
  };

  return (
    <div className="w-full">
     
     <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
<div className="flex items-center gap-4 px-5 py-2 text-md">
    <IoLocationSharp className="w-8 h-8 text-green-600" />
    <input
            type="text"
            id="address"
            name="address"
            value={contactInfo.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          />
  </div>

  <div className="flex items-center gap-4 px-5 py-2 text-md">
        <MdAddCall className="w-6 h-6 text-blue-600" />
          <input
            type="text"
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4 px-5 py-2 text-md">
        <MdOutlineMail className="w-6 h-6 text-red-600" />
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
