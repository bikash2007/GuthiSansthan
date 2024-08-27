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
    branchHeadPost: "",
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
    <div className="container-fluid">
      <div className="row">
        <div className="w-full col-4 col-md-3 bg-slate-500 md:h-[400px] h-[350px] flex flex-col ">
          <h4 className="pt-2 text-xl font-bold md:text-3xl text-cyan-400">
            {branchDetail.branchHeadPost}
          </h4>
          <div className="flex flex-col items-center justify-center ">
            <div
              className="relative w-24 h-24 mt-3 overflow-hidden bg-gray-200 bg-cover border border-gray-300 rounded-full md:w-44 md:h-44 "
              style={{
                backgroundImage: ` ${img1 ? `url(${img1})` : ""}`,
              }}
            >
              {/* {img1 && (
                  <img
                    src={img1}
                    className="w-full h-full "
                    alt="Branch Head"
                  />
                )} */}
            </div>
            <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
              {branchDetail.branchHeadName}
            </h3>
          </div>
        </div>
        <div
          className="relative flex flex-col w-full md:h-[400px] h-[350px] gap-4 p-8 mb-6 overflow-hidden text-white bg-center bg-cover col-8 col-md-9"
          style={{ backgroundImage: `url(${branchImage})` }}
        >
          <div className="absolute inset-0 z-10 bg-black/50"></div>
          {isEditing && (
            <>
              <div className="absolute z-20 flex gap-2 top-4 left-4">
                {!isHeaderEditing && (
                  <button
                    onClick={() => setIsHeaderEditing(true)}
                    className="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
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
                } flex flex-col gap-6`}
              >
                <div className="z-20 flex flex-col items-center">
                  <input
                    placeholder="Office Name"
                    value={branchDetail.name}
                    className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleChange("name", e)}
                  />
                  <input
                    placeholder="Office Address"
                    value={branchDetail.address}
                    className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleChange("address", e)}
                  />
                  <input
                    placeholder="Contact Number"
                    value={branchDetail.contact}
                    className="w-full max-w-xs p-2 mb-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleChange("contact", e)}
                  />
                </div>

                <div className="z-20 flex gap-6">
                  <div className="flex flex-col items-center">
                    {img1 && (
                      <button
                        className="px-3 py-1 mb-2 text-white transition bg-red-600 rounded-md hover:bg-red-700"
                        onClick={() => setImg1("")}
                      >
                        Remove
                      </button>
                    )}
                    <label
                      htmlFor="branch-addition-head-1"
                      className="relative flex items-center justify-center w-24 h-24 overflow-hidden transition bg-gray-200 border border-gray-300 rounded-full cursor-pointer md:w-36 md:h-36 hover:bg-gray-300"
                    >
                      {img1 ? (
                        <img
                          src={img1}
                          className="w-full h-full "
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

                  <div className="z-20 flex flex-col">
                    <button
                      className="px-3 py-1 rounded-lg bg-cyan-600"
                      onClick={() => setAddHead(true)}
                    >
                      Add Headperson
                    </button>
                    {addHead && <BranchSearchBar headUserId={headUserId} />}
                  </div>

                  <div className="z-20 flex items-center justify-center w-full">
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
                          className="absolute text-red-600 top-2 right-2 hover:text-red-700"
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
            <div className="z-20 flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold text-orange-400 md:text-5xl drop-shadow-lg">
                Guthi Sansthan,<br></br>
                {branchDetail.name}
              </h1>
              <h4 className="text-xl text-gray-300">{branchDetail.address}</h4>
              <p className="text-lg text-gray-400">{branchDetail.contact}</p>
              <div className="flex gap-6"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
