import { faAdd, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEditing } from "../../../context/EditingProvider";
import axios from "axios";
import BranchSearchBar from "./BranchSearchBar";
import { useNavigate } from "react-router-dom";

export const BranchHeader = ({
  branchHead,
  branchName,
  branchImg,
  branchId,
}) => {
  const [isHeaderEditing, setIsHeaderEditing] = useState(false);
  const [branchImage, setBranchImage] = useState(branchImg);
  const [img1, setImg1] = useState(branchHead?.profile?.photo || "");
  const { isEditing } = useEditing();
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

  const handleSubmit = async () => {
    // Implement your submit logic here
  };

  const [addHead, setAddHead] = useState(false);
  const headUserId = (id) => {
    patchBranchHead(id);
  };
  const navigate = useNavigate();
  const patchBranchHead = async (id) => {
    const formData = new FormData();
    formData.append("branch_head", id);
    console.log("bbb", branchId);
    try {
      const response = await axios.patch(
        `https://ingnepal.org.np/api/branches/${branchId}/`,
        formData
      );
      if (response.status === 200) {
        alert("Successfully created branch head");
        navigate("/branches");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="relative bg-cover bg-center text-white w-full p-8 flex flex-col gap-4 mb-6 rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${branchImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      {isEditing && (
        <>
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {!isHeaderEditing && (
              <button
                onClick={() => setIsHeaderEditing(true)}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
            )}
            {isHeaderEditing && (
              <>
                <button
                  onClick={() => setIsHeaderEditing(false)}
                  className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  View
                </button>
                <button
                  onClick={handleSubmit}
                  className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
                >
                  Save
                </button>
              </>
            )}
          </div>

          <div
            className={`${
              isHeaderEditing ? "z-20" : "hidden"
            } flex flex-col gap-6`}
          >
            <div className="flex flex-col items-center z-20">
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

            <div className="flex gap-6 z-20">
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
                      className=" w-full h-full"
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
              </div>

              <div className="flex flex-col z-20">
                <button
                  className="bg-cyan-600 px-3 py-1 rounded-lg"
                  onClick={() => setAddHead(true)}
                >
                  Add Headperson
                </button>
                {addHead && <BranchSearchBar headUserId={headUserId} />}
              </div>

              <div className="flex items-center justify-center w-full z-20">
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
        <div className="flex flex-col items-center gap-4 z-20">
          <h1 className="text-5xl font-bold text-orange-400 drop-shadow-lg">
            Guthi Sansthan,<br></br>
            {branchDetail.name}
          </h1>
          <h4 className="text-xl text-gray-300">{branchDetail.address}</h4>
          <p className="text-lg text-gray-400">{branchDetail.contact}</p>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div
                className="relative w-24 h-24 md:w-36 md:h-36 bg-ce bg-cover bg-gray-200 border border-gray-300 rounded-full overflow-hidden"
                style={{
                  backgroundImage: ` ${img1 ? `url(${img1})` : ""}`,
                }}
              >
                {/* {img1 && (
                  <img
                    src={img1}
                    className=" w-full h-full"
                    alt="Branch Head"
                  />
                )} */}
              </div>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {branchDetail.branchHeadName}
              </h3>
              <h4 className="text-xl text-cyan-400 font-bold">
                {branchDetail.branchHeadPost}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
