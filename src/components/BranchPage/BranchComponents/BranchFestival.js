import { useEditing } from "../../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import { ParvaInstance } from "../../JataraMandir/Parva/ParvaInstance";
import { useEffect, useState } from "react";
import axios from "axios";
export const BranchFestival = ({ branchName, branchId }) => {
  const { isEditing, setIsEditing } = useEditing();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const [festival, setFestival] = useState([]);

  useEffect(() => {
    fetchBranchAllParva();
  }, [baseUrl, branchId]); // Added dependency array

  const fetchBranchAllParva = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/branches/${branchId}/get-festivals/`
      );
      setFestival(response.data); // Axios stores data in response.data
    } catch (error) {
      console.error("Error fetching festivals:", error);
    }
  };

  return (
    <>
      <div className="w-full  rounded-md h-fit flex items-center justify-center flex-wrap px-2 gap-4">
        {festival ? (
          festival.map((item) => (
            <ParvaInstance
              startDate={item.start_date}
              endDate={item.end_date}
              loc={item.location}
              img={item.image}
              name={item.name}
              detail={item.description}
              qr={item.qr_code}
            />
          ))
        ) : (
          <h1 className="font-semibold text-cyan-600 text-center text-4xl">
            No Jatra Parva in this moment
          </h1>
        )}
        {/* {isEditing && (
          <AddParva
            fetchAllParva={fetchBranchAllParva}
            parvaAddingUrl={baseUrl}
          />
        )} */}
      </div>
    </>
  );
};
