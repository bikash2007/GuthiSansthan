import React, { useState } from 'react';

export default function AdminForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    Contact_no: '',
    branch: '',
    photo: null
  });

  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.Contact_no) newErrors.Contact_no = 'Contact number is required';
    if (!/^\d{10}$/.test(formData.Contact_no)) newErrors.Contact_no = 'Contact number must be 10 digits';
    
    if (formData.photo) {
      const file = formData.photo;
      if (!file.type.startsWith('image/')) newErrors.photo = 'File must be an image';
      if (file.size > 5 * 1024 * 1024) newErrors.photo = 'File size must be less than 5MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
=======
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl">
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6">
        <h2 className="col-span-full text-3xl font-extrabold text-gray-900 mb-6">Admin Form</h2>

        {/* Username */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your username"
            value={formData.username} 
            onChange={handleChange}
<<<<<<< HEAD
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
=======
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          />
          {errors.username && <p className="mt-1 text-red-600 text-sm">{errors.username}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password"
            value={formData.password} 
            onChange={handleChange}
<<<<<<< HEAD
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
=======
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          />
          {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password}</p>}
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input 
            type="text" 
            id="first_name" 
            name="first_name" 
            placeholder="Enter your first name"
            value={formData.first_name} 
            onChange={handleChange}
<<<<<<< HEAD
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
=======
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          />
          {errors.first_name && <p className="mt-1 text-red-600 text-sm">{errors.first_name}</p>}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input 
            type="text" 
            id="last_name" 
            name="last_name" 
            placeholder="Enter your last name"
            value={formData.last_name} 
            onChange={handleChange}
<<<<<<< HEAD
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
=======
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          />
          {errors.last_name && <p className="mt-1 text-red-600 text-sm">{errors.last_name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email"
            value={formData.email} 
            onChange={handleChange}
<<<<<<< HEAD
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
=======
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          />
          {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
        </div>

        {/* Contact Number */}
        <div className="space-y-2">
          <label htmlFor="Contact_no" className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input 
            type="text" 
            id="Contact_no" 
            name="Contact_no" 
            placeholder="Enter your contact number"
            value={formData.Contact_no} 
            onChange={handleChange}
<<<<<<< HEAD
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
=======
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          />
          {errors.Contact_no && <p className="mt-1 text-red-600 text-sm">{errors.Contact_no}</p>}
        </div>

        {/* Branch */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
          <input 
            type="text" 
            id="branch" 
            name="branch" 
<<<<<<< HEAD
            placeholder="Enter branch name"
            value={formData.branch} 
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
=======
            placeholder="Enter branch number"
            value={formData.branch} 
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          />
        </div>

        {/* Photo */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
          <input 
            type="file" 
            id="photo" 
            name="photo"
            onChange={handleChange}
<<<<<<< HEAD
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
=======
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          />
          {errors.photo && <p className="mt-1 text-red-600 text-sm">{errors.photo}</p>}
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button 
            type="submit" 
<<<<<<< HEAD
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
=======
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
>>>>>>> 997c049aaef6048a443df0095315356ab1e25d66
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
