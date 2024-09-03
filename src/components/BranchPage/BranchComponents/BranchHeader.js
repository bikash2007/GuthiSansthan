import { faAdd, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEditing } from "../../../context/EditingProvider";
import axios from "axios";
import BranchSearchBar from "./BranchSearchBar";
import { useNavigate } from "react-router-dom";
import logo from "../../../media/logo192.png";
import "./Branchhead.css";
import BranchHeaderEdit from "./BranchHeaderEdit";

export const BranchHeader = ({
  branchHead,
  branchName,
  branchImg,
  branchId,
  branchDetails,
}) => {
  // Added useState for isHeaderEditing
  const [isHeaderEditing, setIsHeaderEditing] = useState(false);
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

  const [img1, setImg1] = useState(branchHead?.profile?.photo || "");

  return (
    <div
      className="bg-cover bg-center container-fluid w-full"
      style={{ backgroundImage: `url(${branchImg})` }}
    >
      <div className="row">
        <div className="w-full col-5 col-sm-5 col-md-3   md:h-[430px] s h-[375px] flex flex-col items-center headimage">
          <div className="flex flex-col items-center justify-center ">
            <div
              className="relative w-24 h-24 mt-3  bg-black bg-cover md:w-[230px] md:h-[230px] headimage-container md:me-[70px] me-[50px] "
              style={{
                backgroundImage: `${img1 ? `url(${img1})` : ""}`,
              }}
            ></div>
            <h4 className="pt-2 mb-0 text-sm font-bold md:text-xl text-cyan-400 md:me-[70px] me-[50px]">
              {branchDetail.branchHeadPost}
              कार्यालय प्रमुख
            </h4>
            <h3 className="pt-0 mt-2 mb-1 text-sm font-bold text-white md:text-2xl md:me-[70px] me-[50px]">
              {branchDetail.branchHeadName}
            </h3>
            <h4 className="pt-0 mb-0 text-sm font-bold md:text-[15px] text-cyan-400 md:me-[70px] me-[50px]">
              {branchDetail.branchHeadPost}
              {branchId === 27 && "प्रशासक"}
            </h4>
            <h4 className="pt-0 mb-0 text-sm font-bold md:text-[15px] text-cyan-400 md:me-[70px] me-[50px]">
              {branchHead?.profile?.contact_no}
            </h4>
          </div>
        </div>

        <div className="relative flex flex-col w-full md:h-[400px] h-[350px] gap-4 p-8 mb-6 overflow-hidden text-white bg-center  col-7 col-sm-7 col-md-9">
          <div className="relative flex flex-col w-full md:h-[400px] h-[350px] gap-4 p-8 mb-6  text-white bg-center col-8 col-md-9">
            <div className="container relative top-0  z-20 flex  w-full  md:flex-row md:pt-0 md:mt-0 text-cyan-400">
              <div className="md:text-left w-full flex">
                <div className="flex flex-col">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      className="w-[50px]  md:w-[90px] "
                      src={logo}
                      alt="Logo"
                    />
                    <h1 className="text-sm font-bold text-white md:text-2xl drop-shadow-lg">
                      गुठी संस्थान
                      <br />
                    </h1>
                  </div>
                  <h1 className="font-bold text-white text-2xl md:text-4xl drop-shadow-lg">
                    {branchName}
                  </h1>
                </div>
              </div>

              <div className="w-full text-center md:w-1/6 md:text-left md:absolute md:top-0 md:end-0">
                <h1 className="text-sm font-bold text-white md:text-2xl drop-shadow-lg">
                  Phone.No: {branchDetails.contact_no}
                </h1>
                <h1 className="text-sm font-bold  text-white md:text-2xl drop-shadow-lg">
                  Email: {branchDetails.email}
                </h1>
                {branchDetails.location?.Nepali && (
                  <h1 className="text-sm font-bold text-white md:text-2xl drop-shadow-lg">
                    Location: {branchDetails.location.Nepali}
                  </h1>
                )}
              </div>
              {isEditing && <BranchHeaderEdit branchDetails={branchDetails} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
