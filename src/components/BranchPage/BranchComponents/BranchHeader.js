import { faAdd, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEditing } from "../../../context/EditingProvider";
import axios from "axios";
import { toast } from "react-toastify";

export const BranchHeader = ({ branchHead, branchName, branchImg }) => {
  const [isHeaderEditing, setIsHeaderEditing] = useState(false);
  const [branchImage, setBranchImage] = useState(branchImg);
  const [img1, setImg1] = useState(branchHead?.profile?.photo || "");
  const { isEditing, setIsEditing } = useEditing();
  const [branchDetail, setBranchDetail] = useState({
    name: branchName,
    address: "",
    contact: "",
    branchHeadName: `${branchHead?.first_name || ""} ${
      branchHead?.last_name || ""
    }`,
    branchHeadPost: "Branch Head",
  });

  const handleImg1 = () => {
    const file = document.getElementById("branch-addition-head-1").files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = URL.createObjectURL(new Blob([e.target.result]));
        setImg1(url);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleChange = (key, e) => {
    setBranchDetail((prevData) => ({ ...prevData, [key]: e.target.value }));
  };

  const handleSubmit = () => {};

  return (
    <div className="relative w-full p-4 flex flex-col gap-4 mb-6">
      {isEditing && (
        <>
          <div className="absolute top-4 left-4 flex gap-2">
            {!isHeaderEditing && (
              <button
                onClick={() => setIsHeaderEditing(true)}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
            )}
            {isHeaderEditing && (
              <button
                onClick={() => setIsHeaderEditing(false)}
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                View
              </button>
            )}
            {isHeaderEditing && (
              <button
                className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
                onClick={handleSubmit}
              >
                Save
              </button>
            )}
          </div>

          <div
            className={`${isHeaderEditing ? "" : "hidden"} flex flex-col gap-6`}
          >
            <div className="flex flex-col items-center">
              <input
                placeholder="Office Name"
                value={branchDetail.name}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full max-w-xs"
                onChange={(e) => handleChange("name", e)}
              />
              <input
                placeholder="Office Address"
                value={branchDetail.address}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full max-w-xs"
                onChange={(e) => handleChange("address", e)}
              />
              <input
                placeholder="Contact Number"
                value={branchDetail.contact}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full max-w-xs"
                onChange={(e) => handleChange("contact", e)}
              />
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                {img1 && (
                  <button
                    className="mb-2 py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    onClick={() => setImg1("")}
                  >
                    Remove
                  </button>
                )}
                <label
                  htmlFor="branch-addition-head-1"
                  className="relative flex items-center justify-center w-24 h-24 md:w-36 md:h-36 bg-gray-200 border border-gray-300 rounded-full overflow-hidden cursor-pointer hover:bg-gray-300 transition"
                >
                  {img1 ? (
                    <img
                      src={img1}
                      className="object-cover w-full h-full"
                      alt="Branch Head"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faAdd}
                      size="3x"
                      className="text-gray-500"
                    />
                  )}
                </label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  id="branch-addition-head-1"
                  className="hidden"
                  onChange={handleImg1}
                />
                <input
                  type="text"
                  onChange={(e) => handleChange("branchHeadName", e)}
                  className="p-2 text-lg border border-gray-300 rounded-md outline-none mt-2"
                  placeholder="Branch Head Name"
                />
                <input
                  type="text"
                  onChange={(e) => handleChange("branchHeadPost", e)}
                  className="p-2 text-lg border border-gray-300 rounded-md outline-none mt-2"
                  placeholder="Branch Head Post"
                />
              </div>

              <div className="flex items-center justify-center w-full">
                <div
                  className="relative w-[150px] h-[100px] md:w-[300px] md:h-[200px] bg-cover bg-center rounded-md overflow-hidden border border-gray-300"
                  style={{ backgroundImage: `url(${branchImage})` }}
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
                      className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                      onClick={() => setBranchImage("")}
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
                  onChange={(e) =>
                    setBranchImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}

      {!isHeaderEditing && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">{branchDetail.name}</h1>
          <h4 className="text-xl text-gray-700">{branchDetail.address}</h4>
          <p className="text-lg text-gray-500">{branchDetail.contact}</p>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 md:w-36 md:h-36 bg-gray-200 border border-gray-300 rounded-full overflow-hidden">
                {img1 && (
                  <img
                    src={img1}
                    className="object-cover w-full h-full"
                    alt="Branch Head"
                  />
                )}
              </div>
              <h3 className="mt-2 text-xl font-medium">
                {branchDetail.branchHeadName}
              </h3>
              <h4 className="text-lg text-gray-700">
                {branchDetail.branchHeadPost}
              </h4>
            </div>
            <div
              className="relative w-[150px] h-[100px] md:w-[300px] md:h-[200px] bg-cover bg-center rounded-md overflow-hidden border border-gray-300"
              style={{ backgroundImage: `url(${branchImage})` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
