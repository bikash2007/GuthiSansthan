import React from "react";
import { Link } from "react-router-dom";
import { useEditing } from "../../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BranchTeams = ({ branchName }) => {
  const { isEditing } = useEditing();
  return (
    <div className="w-full  h-full flex flex-col items-center justify-center">
      {isEditing && (
        <Link
          to="/admin-form"
          state={{ branchName }}
          className="w-full h-fit flex items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="p-5 m-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer no-underline"
            size="3x"
          />
        </Link>
      )}
    </div>
  );
};

export default BranchTeams;
