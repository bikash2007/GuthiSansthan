import { faAdd, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEditing } from "../../../context/EditingProvider";
import axios from "axios";
import BranchSearchBar from "./BranchSearchBar";
import { useNavigate } from "react-router-dom";
import logo from "../../../media/logo192.png";
import "./Branchhead.css";

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
    <div
      className="bg-cover container-fluid"
      style={{ backgroundImage: `url(${branchImage})` }}
    >
      <div className="row">
        <div className="w-full col-4 col-md-3 bg-black md:h-[430px] h-[450px] flex flex-col items-center headimage">
          <div className="flex flex-col items-center justify-center">
            <div
              className="relative w-24 h-24 mt-3 overflow-hidden bg-black bg-cover md:w-[230px] md:h-[230px] headimage-container me-[70px] "
              style={{
                backgroundImage: `${img1 ? `url(${img1})` : ""}`,
              }}
            >
              {/* {img1 && (
        <img
          src={img1}
          className="object-cover w-full h-full"
          alt="Branch Head"
        />
      )} */}
            </div>
            <h4 className="pt-2 mb-0 text-xl font-bold md:text-xl text-cyan-400 me-[70px] ">
              {branchDetail.branchHeadPost}
              कार्यालय प्रमुख
            </h4>
            <h3 className="pt-0 mt-2 mb-1 text-xl font-bold text-white md:text-2xl me-[70px]">
              {branchDetail.branchHeadName}
            </h3>
            <h4 className="pt-0 mb-0 text-xl font-bold md:text-[15px] text-cyan-400 me-[70px]">
              {branchDetail.branchHeadPost}
              सहायक प्रशासक
            </h4>
            <h4 className="pt-0 mb-0 text-xl font-bold md:text-[15px] text-cyan-400 me-[70px]">
              {branchDetail.branchHeadPost}
              ९८५१० - #####
            </h4>
          </div>
        </div>

        <div className="relative flex flex-col w-full md:h-[400px] h-[350px] gap-4 p-8 mb-6 overflow-hidden text-white bg-center  col-8 col-md-9">
          <div className="absolute inset-0 z-10 "></div>
          {isEditing && (
            <>
              <div className="absolute z-50 flex gap-2 left-4">
                {!isHeaderEditing && (
                  <button
                    onClick={() => setIsHeaderEditing(true)}
                    className="z-50 px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 "
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
                <div className="z-20 flex items-center justify-center md:h-[380px]  ms-3 ">
                  <div className="flex items-end justify-end col-md-3 ">
                    <div className="z-20 flex flex-col items-center justify-center ">
                      <div
                        className="relative w-[150px] h-[100px] md:w-[200px] md:h-[200px] bg-cover bg-center rounded-md overflow-hidden border"
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
                      <h1 className="px-6 py-2 mt-2 text-sm bg-blue-500 rounded-3">
                        background Image
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 col-md-9 ms-2">
                    <div className="z-20 flex flex-col ">
                      <button
                        className="px-3 py-1 rounded-lg bg-cyan-600"
                        onClick={() => setAddHead(true)}
                      >
                        Add Headperson
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
                  </div>
                </div>
              </div>
            </>
          )}

          {!isHeaderEditing && (
            <div className="container top-0 z-20 flex pt-0 mt-0 position-absolute">
              <div className="flex items-center justify-center col-md-2">
                <img className="w-[90px] h-[90px] rounded-full" src={logo} />
              </div>
              <div className=" col-md-9">
                <div className="flex flex-col  me-[140px] ">
                  <h1 className="flex flex-col items-center justify-center pb-0 mb-0 text-2xl font-bold text-white md:text-2xl drop-shadow-lg ">
                    गुठी संस्थान,<br></br>
                  </h1>
                  <h1 className="py-0 my-0 text-2xl font-bold text-white md:text-4xl drop-shadow-lg">
                    {/* {branchDetail.name}  */}
                    {branchName}
                  </h1>

                  <h1 className="pb-0 mt-1 mb-0 text-2xl font-bold text-white md:text-xl drop-shadow-lg">
                    {/* काठमाडौं */}
                  </h1>
                </div>
              </div>

              <div className="top-0 flex flex-col items-start justify-start col-md-3 position-absolute end-0 ">
                {/* <h1 className="pb-0 mb-0 text-2xl font-bold text-white md:text-sm drop-shadow-lg">
                       Phone.No:1234567890      
              </h1>
              <h1 className="pb-0 mb-0 text-2xl font-bold text-white md:text-sm drop-shadow-lg">
                       Email:info@ghuti.com
              </h1>
              <h1 className="pb-0 mb-0 text-2xl font-bold text-white md:text-sm drop-shadow-lg">
                       
                       Location:Kathmandu      
              </h1> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
