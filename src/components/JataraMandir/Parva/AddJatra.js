import React, { useRef, useState, useEffect } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import axios
import { showAlert } from "../../AlertLoader";
import { useSelector } from "react-redux";

export const AddJatra = ({ fetchAllParva, parvaAddingUrl }) => {
  const nameRef = useRef();
  const branchRef = useRef();
  const photoRef = useRef();
  const desRef = useRef();
  const qrRef = useRef();
  const token = sessionStorage.getItem("token");
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [addParvaActivate, setAddParvaActivate] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading
  const [branches, setBranches] = useState([]); // Store branches
  const [selectedBranch, setSelectedBranch] = useState(""); // Selected branch
  const isMobile = useMediaQuery("(max-width:800px)");

  // Fetch branches from the API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "https://ingnepal.org.np/api/branches/"
        );
        setBranches(response.data); // Assuming response is in proper format
      } catch (error) {
        console.error("Error fetching branches:", error);
        showAlert("Error fetching branches", "red");
      }
    };

    fetchBranches();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleQrChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrPreview(URL.createObjectURL(file));
    } else {
      setQrPreview(null);
    }
  };

  const handleSubmit = async () => {
    const name = nameRef.current.value.trim();
    const location = selectedBranch; // Use selected branch from dropdown
    const image = photoRef.current ? photoRef.current.files[0] : null;
    const qrcode = qrRef.current ? qrRef.current.files[0] : null;
    const description = desRef.current.value.trim();

    // Validate if required fields are filled
    if (!name || !startDate || !endDate || !description) {
      showAlert("Please fill out all required fields.", "red");
      return;
    }

    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("location", location);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("description", description);
    formData.append("qr_code", qrcode);

    try {
      const response = await axios.post(`${baseUrl}api/festivals/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      showAlert("Jatra added successfully!", "green");
      window.location.reload();
      fetchAllParva();
      setAddParvaActivate(false);

      // Clear the form after submission
      nameRef.current.value = "";
      setSelectedBranch("");
      if (photoRef.current) photoRef.current.value = "";
      if (qrRef.current) qrRef.current.value = "";
      desRef.current.value = "";
      setStartDate("");
      setEndDate("");
      setImagePreview(null);
      setQrPreview(null);
    } catch (error) {
      console.error("Error:", error);
      showAlert("There was an error submitting the form.", "red");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="flex w-full h-fit items-center justify-center mt-96">
        <div className="flex flex-col w-[90%] mt-64 bg-white/50 backdrop-blur-sm rounded-lg lg:w-[50%] p-3 gap-2 mb-12">
          <h1 className="font-semibold tracking-wider my-2">Jatra Form</h1>
          <div className="flex flex-col flex-wrap py-1 border-y-2 border-b-zinc-700/5 lg:flex-row gap-2 items-center">
            <label className="font-semibold text-lg">Jatra Name:</label>
            <input
              type="text"
              ref={nameRef}
              className="w-full lg:w-2/3 h-12 rounded-md px-3 py-2 border border-zinc-900"
              required
            />
          </div>

          <div className="flex flex-col flex-wrap py-1 border-y-2 border-b-zinc-700/5 lg:flex-row gap-2 items-center">
            <label className="font-semibold text-lg">
              Branch location (optional):
            </label>
            <select
              className="w-full lg:w-2/3 h-12 rounded-md px-3 py-2 border border-zinc-900"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-wrap py-1 border-y-2 border-b-zinc-700/5 lg:flex-row gap-2 items-center">
            <label className="font-semibold text-lg">Starting date (BS):</label>
            <NepaliDatePicker
              inputClassName="form-control"
              className=""
              value={startDate}
              onChange={(value) => setStartDate(value)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
              required
            />
          </div>

          <div className="flex flex-col flex-wrap py-1 border-y-2 border-b-zinc-700/5 lg:flex-row gap-2 items-center">
            <label className="font-semibold text-lg">Ending date (BS):</label>
            <NepaliDatePicker
              inputClassName="form-control"
              className=""
              value={endDate}
              onChange={(value) => setEndDate(value)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
              required
            />
          </div>

          <div className="flex flex-col flex-wrap py-1 border-y-2 border-b-zinc-700/5 lg:flex-row gap-2 items-center">
            <label className="font-semibold text-lg">
              Upload Images (optional):
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                    onClick={() => {
                      setImagePreview(null);
                      if (photoRef.current) photoRef.current.value = null;
                    }}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
              ) : (
                <div className="w-full min-w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md">
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="3x"
                    className="text-gray-500"
                  />
                </div>
              )}
              <input
                type="file"
                ref={photoRef}
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-wrap flex-col py-1 border-y-2 border-b-zinc-700/5 lg:flex-row gap-2 items-center">
            <label className="font-semibold text-lg">Description:</label>
            <textarea
              ref={desRef}
              className="w-full lg:w-2/3 rounded-md h-44 px-2 py-3 border border-cyan-400"
              required
            />
          </div>

          <div className="flex flex-col flex-wrap py-1 border-y-2 border-b-zinc-700/5 lg:flex-row gap-2 items-center">
            <label className="font-semibold text-lg">
              Upload QR code (optional):
            </label>
            <div className="relative">
              {qrPreview ? (
                <div className="relative">
                  <img
                    src={qrPreview}
                    alt="QR Code Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                    onClick={() => {
                      setQrPreview(null);
                      if (qrRef.current) qrRef.current.value = null;
                    }}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
              ) : (
                <div className="w-full min-w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md">
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="3x"
                    className="text-gray-500"
                  />
                </div>
              )}
              <input
                type="file"
                ref={qrRef}
                accept=".png,.jpg,.jpeg"
                onChange={handleQrChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
            className="bg-primary text-white p-2 rounded-md hover:bg-opacity-80 w-fit self-center px-12 mt-3"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};
