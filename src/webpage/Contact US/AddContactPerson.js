import React, { useState } from "react";
import axios from "axios";

const AddContactPerson = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      English: "",
      Nepali: "",
      Newari: "",
      Mithila: "",
    },
    photo: null,
    position: {
      English: "",
      Nepali: "",
      Newari: "",
      Mithila: "",
    },
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [key, subKey] = name.split(".");

    if (subKey) {
      setFormData((prevData) => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          [subKey]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append nested objects as JSON strings if backend expects it
    data.append("name", JSON.stringify(formData.name));
    data.append("position", JSON.stringify(formData.position));
    data.append("photo", formData.photo);
    data.append("contact", formData.contact);

    // Debug: log formData to check if it is being correctly constructed
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "https://ingnepal.org.np/api/contacts/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Contact person added successfully!");
        setIsFormVisible(false); // Hide form after successful submission
      } else {
        alert("Failed to add contact person.");
      }
    } catch (error) {
      console.error("Error adding contact person:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Person
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Inputs */}
          <input
            type="text"
            name="name.English"
            placeholder="Name (English)"
            value={formData.name.English}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="name.Nepali"
            placeholder="Name (Nepali)"
            value={formData.name.Nepali}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="name.Newari"
            placeholder="Name (Newari)"
            value={formData.name.Newari}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="name.Mithila"
            placeholder="Name (Mithila)"
            value={formData.name.Mithila}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />

          {/* Photo Input */}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border rounded-md"
          />

          {/* Position Inputs */}
          <input
            type="text"
            name="position.English"
            placeholder="Position (English)"
            value={formData.position.English}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="position.Nepali"
            placeholder="Position (Nepali)"
            value={formData.position.Nepali}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="position.Newari"
            placeholder="Position (Newari)"
            value={formData.position.Newari}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="position.Mithila"
            placeholder="Position (Mithila)"
            value={formData.position.Mithila}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />

          {/* Contact Input */}
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AddContactPerson;
