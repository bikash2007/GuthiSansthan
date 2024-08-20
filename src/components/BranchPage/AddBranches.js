import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { showConfirmBox } from "../AlertLoader/ConfirmBox";
import { showAlert } from "../AlertLoader";
import axios from "axios";

const AddBranches = () => {
  const [isBranchAdditionActivate, setIsBranchAdditionActivate] =
    useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchImage, setBranchImage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleImageChange = (e) => {
    setBranchImage(e.target.files[0]);
  };

  const checkConfirm = async () => {
    if (branchName === "") {
      showAlert("Enter the Branch Name", "red");
      return;
    }
    if (await showConfirmBox("Do you want to create a new Branch?")) {
      try {
        const formData = new FormData();
        formData.append("name", branchName);
        if (branchImage) {
          formData.append("image", branchImage);
        }

        const response = await axios.post(
          "https://ingnepal.org.np/api/branches/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          showAlert("Branch created successfully!", "green");
          setRedirect(true);
        }
      } catch (error) {
        showAlert("Failed to create branch", "red");
        console.error(error);
      }
    } else {
      setIsBranchAdditionActivate(false);
    }
  };

  if (redirect) {
    return <Navigate to="/branche-full-info" state={branchName} />;
  }

  return (
    <>
      {!isBranchAdditionActivate && (
        <div
          onClick={() => setIsBranchAdditionActivate(true)}
          className="w-[150px] h-[100px] md:w-[300px] md:h-[200px] flex items-center justify-center bg-gray-500 m-1 hover:scale-105 rounded-md hover:bg-gray-600 transition-all duration-300 cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} size="3x" className="text-white" />
        </div>
      )}

      {isBranchAdditionActivate && (
        <div className="flex justify-center items-center">
          <div className="flex flex-col bg-neutral-500/60 backdrop-blur-xl rounded-xl p-6 gap-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Branch Name"
                className="h-10 px-4 rounded-md border border-gray-300 focus:ring-[#30D5C8] focus:border-[#30D5C8]"
                onChange={(e) => setBranchName(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="h-10 px-4 rounded-md border border-gray-300 focus:ring-[#30D5C8] focus:border-[#30D5C8]"
              />
            </div>
            <div className="flex justify-center cursor-pointer">
              <div
                onClick={checkConfirm}
                className="px-6 py-2 rounded-xl text-white font-semibold bg-green-500 hover:bg-green-600 transition-all duration-300"
              >
                Create Branch
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBranches;
