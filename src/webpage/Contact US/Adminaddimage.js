import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Adminadd({ spokespersonId }) { // Assuming spokespersonId is passed as a prop
  const [spokesperson, setSpokesperson] = useState({
    role: '',
    name: '',
    phone: '',
    image: ''
  });

  // Fetch existing data if spokespersonId is provided
  useEffect(() => {
    if (spokespersonId) {
      axios.get(`/api/spokesperson/${spokespersonId}`)
        .then(response => {
          const data = response.data;
          setSpokesperson({
            role: data.role || '',
            name: data.name || '',
            phone: data.phone || '',
            image: data.image || ''
          });
        })
        .catch(error => {
          console.error("There was an error fetching the spokesperson data!", error);
        });
    }
  }, [spokespersonId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpokesperson({
      ...spokesperson,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setSpokesperson({
      ...spokesperson,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('role', spokesperson.role);
    formData.append('name', spokesperson.name);
    formData.append('phone', spokesperson.phone);
    formData.append('image', spokesperson.image);

    if (spokespersonId) {
      // Update existing spokesperson
      axios.put(`/api/spokesperson/${spokespersonId}`, formData)
        .then(response => {
          alert('Spokesperson information updated successfully');
        })
        .catch(error => {
          console.error("There was an error updating the spokesperson data!", error);
        });
    } else {
      // Create new spokesperson
      axios.post('/api/spokesperson', formData)
        .then(response => {
          alert('Spokesperson information added successfully');
        })
        .catch(error => {
          console.error("There was an error adding the spokesperson data!", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div>
        <label className="block text-gray-700">Role:</label>
        <input 
          type="text" 
          name="role" 
          value={spokesperson.role} 
          onChange={handleChange} 
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter Role"
        />
      </div>
      <div>
        <label className="block text-gray-700">Name:</label>
        <input 
          type="text" 
          name="name" 
          value={spokesperson.name} 
          onChange={handleChange} 
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter Name"
        />
      </div>
      <div>
        <label className="block text-gray-700">Phone:</label>
        <input 
          type="text" 
          name="phone" 
          value={spokesperson.phone} 
          onChange={handleChange} 
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter Phone"
        />
      </div>
      <div>
        <label className="block text-gray-700">Image:</label>
        <input 
          type="file" 
          name="image" 
          onChange={handleImageChange} 
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        {spokespersonId ? 'Update Information' : 'Add Information'}
      </button>
    </form>
  );
}
