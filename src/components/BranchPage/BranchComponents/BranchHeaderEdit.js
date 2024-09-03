import React, { useState } from "react";
import { useEditing } from "../../../context/EditingProvider";
import BranchSearchBar from "./BranchSearchBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";

const BranchHeaderEdit = ({ branchDetails }) => {
  const [isHeaderEditing, setIsHeaderEditing] = useState(false);
  const [branchDetail, setBranchDetail] = useState({
    name: branchDetails.name || "",
    contact_no: branchDetails.contact_no || "",
    location: branchDetails.location || {
      English: "",
      Mithila: "",
      Nepali: "",
      Newari: "",
    },
    location_url: branchDetails.location_url || "",
    email: branchDetails.email || "",
  });
  const [branchImage, setBranchImage] = useState(null);
  const [addHead, setAddHead] = useState(false);

  const { isEditing } = useEditing();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBranchImage(file);
    }
  };

  const handleChange = (key, e) => {
    setBranchDetail((prevData) => ({ ...prevData, [key]: e.target.value }));
  };

  const handleLocationChange = (lang, e) => {
    setBranchDetail((prevData) => ({
      ...prevData,
      location: { ...prevData.location, [lang]: e.target.value },
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", branchDetail.name);
    formData.append("contact_no", branchDetail.contact_no);
    formData.append("location", JSON.stringify(branchDetail.location));
    formData.append("location_url", branchDetail.location_url);
    formData.append("email", branchDetail.email);

    if (branchImage) {
      formData.append("image", branchImage);
    }

    try {
      const response = await axios.patch(
        `https://ingnepal.org.np/api/branches/${branchDetails.id}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        alert("Successfully updated branch details");
        navigate("/branches");
      }
    } catch (error) {
      console.error("Error updating branch details:", error);
    }
  };

  const headUserId = (id) => {
    patchBranchHead(id);
  };

  const patchBranchHead = async (id) => {
    const formData = new FormData();
    formData.append("branch_head", id);

    try {
      const response = await axios.patch(
        `https://ingnepal.org.np/api/branches/${branchDetails.id}/`,
        formData
      );
      if (response.status === 200) {
        alert("Successfully updated branch head");
        navigate("/branches");
      }
    } catch (error) {
      console.error("Error updating branch head:", error);
    }
  };

  return (
    <>
      <div className="absolute z-50 flex gap-2 left-4">
        {!isHeaderEditing && (
          <button
            onClick={() => setIsHeaderEditing(true)}
            className="z-50 px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
        )}
        {isHeaderEditing && (
          <>
            <button
              onClick={() => setIsHeaderEditing(false)}
              className="px-4 py-2 text-white transition bg-green-600 rounded-md hover:bg-green-700"
            >
              View
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white transition bg-yellow-600 rounded-md hover:bg-yellow-700"
            >
              Save
            </button>
          </>
        )}
      </div>

      <div
        className={`${
          isHeaderEditing ? "z-20" : "hidden"
        }  flex flex-col gap-6`}
      >
        <div className="z-20  w-full flex items-center justify-center md:h-[380px] ms-3">
          <div className="flex items-end justify-end col-md-3">
            <div className="z-20 flex flex-col items-center justify-center">
              <div
                className="relative w-[150px] h-[100px] md:w-[200px] md:h-[200px] bg-cover bg-center rounded-md overflow-hidden border"
                style={{
                  backgroundImage: branchImage
                    ? `url(${URL.createObjectURL(branchImage)})`
                    : "",
                }}
              >
                {!branchImage && (
                  <label
                    htmlFor="branch-new-image"
                    className="flex items-center justify-center w-full h-full bg-gray-300 opacity-75 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="3x"
                      className="text-gray-500"
                    />
                  </label>
                )}
                {branchImage && (
                  <button
                    className="absolute text-red-600 top-2 right-2 hover:text-red-700"
                    onClick={() => {
                      setBranchImage(null);
                      URL.revokeObjectURL(URL.createObjectURL(branchImage)); // Clean up the object URL
                    }}
                  >
                    <FontAwesomeIcon icon={faClose} size="2x" />
                  </button>
                )}
              </div>
              <input
                id="branch-new-image"
                className="hidden"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange}
              />
              <h1 className="px-6 py-2 mt-2 text-sm bg-blue-500 rounded-3">
                Background Image
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 col-md-9 ms-2">
            <div className="z-20 flex flex-col">
              <button
                className="px-3 py-1 rounded-lg bg-cyan-600"
                onClick={() => setAddHead(!addHead)}
              >
                {addHead ? "Close" : "Add Headperson"}
              </button>
              {addHead && <BranchSearchBar headUserId={headUserId} />}
            </div>
            <div>
              <input
                placeholder="Office Name"
                value={branchDetail.name}
                className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                onChange={(e) => handleChange("name", e)}
              />
              <input
                placeholder="Contact Number"
                value={branchDetail.contact_no}
                className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                onChange={(e) => handleChange("contact_no", e)}
              />
              <input
                placeholder="Location URL"
                value={branchDetail.location_url}
                className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                onChange={(e) => handleChange("location_url", e)}
              />
              <input
                placeholder="Email"
                value={branchDetail.email}
                className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                onChange={(e) => handleChange("email", e)}
              />
              <div className="flex flex-col gap-2 mt-4">
                <div>
                  <input
                    placeholder="Location (English)"
                    value={branchDetail.location.English}
                    className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleLocationChange("English", e)}
                  />
                  <input
                    placeholder="Location (Nepali)"
                    value={branchDetail.location.Nepali}
                    className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleLocationChange("Nepali", e)}
                  />
                  <input
                    placeholder="Location (Mithila)"
                    value={branchDetail.location.Mithila}
                    className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleLocationChange("Mithila", e)}
                  />
                </div>
                <input
                  placeholder="Location (Newari)"
                  value={branchDetail.location.Newari}
                  className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                  onChange={(e) => handleLocationChange("Newari", e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchHeaderEdit;
