import React, { useState, useRef } from 'react';

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
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!image) newErrors.photo = 'Photo is required';

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
      // Handle form submission logic here (e.g., API call)
    }
  };

  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgname = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = Math.max(img.width, img.height);
          canvas.width = maxSize;
          canvas.height = maxSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(
            img,
            (maxSize - img.width) / 2,
            (maxSize - img.height) / 2
          );
          canvas.toBlob(
            (blob) => {
              const file = new File([blob], imgname, {
                type: "image/png",
                lastModified: Date.now(),
              });

              setImage(file);
              setFormData(prevData => ({
                ...prevData,
                photo: file
              }));
            },
            "image/jpeg",
            0.8
          );
        };
      };
    }
  };

  const handleUploadButtonClick = (file) => {
    var myHeaders = new Headers();
    const token = "adhgsdaksdhk938742937423";
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const profileurl = JSON.parse(result);
        setImage(profileurl.img_url);
        setFormData(prevData => ({
          ...prevData,
          photo: profileurl.img_url
        }));
      })
      .catch((error) => console.log("error", error));
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleDelete = () => {
    setImage(null);
    setFormData(prevData => ({
      ...prevData,
      photo: null
    }));
  }

  return (
    <div className="max-w-4xl p-8 mx-auto bg-gray-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 md:gap-x-6">
        <h2 className="mb-6 text-3xl font-extrabold text-gray-900 col-span-full">Admin Form</h2>

<div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6'>
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full px-4 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
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
            className="block w-full px-4 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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
            className="block w-full px-4 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
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
            className="block w-full px-4 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
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
            className="block w-full px-4 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
            className="block w-full px-4 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.Contact_no && <p className="mt-1 text-sm text-red-600">{errors.Contact_no}</p>}
        </div>
        </div>
        {/* Username */}
        {/* Branch */}
        <div className="space-y-2 col-12">
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
          <input
            type="text"
            id="branch"
            name="branch"
            placeholder="Enter your branch"
            value={formData.branch}
            onChange={handleChange}
            className="block w-full px-4 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.branch && <p className="mt-1 text-sm text-red-600">{errors.branch}</p>}
        </div>

        {/* Image Upload */}
        <div className='flex flex-col items-center justify-center'>
          <label htmlFor="Contact_no" className="block mb-2 text-sm font-medium text-gray-700">Photo</label>
          <div className="image-upload-container w-[300px] h-[250px] border-2 border-solid border-gray-400 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-full box-decoration">
              <label
                htmlFor="image-upload-input"
                className="absolute inset-0 flex items-center justify-center font-semibold text-center text-gray-700 transition-opacity duration-300 cursor-pointer image-upload-label bg-opacity-70 hover:bg-opacity-80"
              >
                {image ? image.name : "Choose an image"}
              </label>
              <div onClick={handleClick} className="relative w-full h-full cursor-pointer">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    className="object-cover w-full h-full rounded-lg img-display-after"
                  />
                ) : (
                  <img
                    src="./photo.png"
                    style={{ display: "none" }}
                    className="object-cover w-full h-full rounded-lg img-display-before"
                  />
                )}
                <input
                  id="image-upload-input"
                  type="file"
                  onChange={handleImageChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </div>
              {image && (
                <button
                  onClick={handleDelete}
                  className="absolute px-2 py-1 text-white transition-colors duration-200 bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                >
                  X
                </button>
              )}
            </div>
            {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
          </div>
        </div>





        
       

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
