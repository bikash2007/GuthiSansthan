import React, { useState, useRef, useEffect } from "react";

export default function Report() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    reason: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Full name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.subject) newErrors.subject = "Branch is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.reason) newErrors.reason = "Reason for complaint is required";
    if (!formData.message) newErrors.message = "Complaint details are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div
      ref={formRef}
      className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-lg shadow-lg"
    >
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Complaint Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter your full name"
            className={`w-full p-3 border rounded-md ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className={`w-full p-3 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter your phone number"
            className={`w-full p-3 border rounded-md ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Branch and Department Fields */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Branch Field */}
          <div className="w-full md:w-1/1">
            <label
              htmlFor="subject"
              className="block mb-2 text-lg font-semibold text-gray-700"
            >
              Branch
            </label>
            <select
              name="subject"
              id="subject"
              className={`w-full p-3 border rounded-md ${
                errors.subject ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Branch
              </option>
              <option value="Branch1">Branch 1</option>
              <option value="Branch2">Branch 2</option>
              <option value="Branch3">Branch 3</option>
            </select>
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
            )}
          </div>

          {/* Department Field */}
        </div>

        {/* Reason Field */}
        <div>
          <label
            htmlFor="reason"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Reason For Complaint
          </label>
          <input
            type="text"
            name="reason"
            id="reason"
            placeholder="Write reason for a complaint"
            className={`w-full p-3 border rounded-md ${
              errors.reason ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            value={formData.reason}
            onChange={handleChange}
          />
          {errors.reason && (
            <p className="mt-1 text-sm text-red-500">{errors.reason}</p>
          )}
        </div>

        {/* Complaint Details Field */}
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Complaint Details
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Enter your message here"
            className={`w-full p-3 border rounded-md ${
              errors.message ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            value={formData.message}
            onChange={handleChange}
            rows="4"
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition duration-300 ${
              isSubmitting ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
          {isSubmitted && !isSubmitting && (
            <p className="mt-4 text-lg font-medium text-green-500">
              Message sent successfully!
            </p>
          )}
        </div>
      </form>
    </div>
  ); // Hide the form if it's closed
}
