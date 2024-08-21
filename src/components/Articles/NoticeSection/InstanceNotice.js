import React from "react"; // Add this if not already present
import { useEditing } from "../../../context/EditingProvider"; // Adjust the path based on your project structure
import { ViewEditButton } from "./ViewEditButton"; // Adjust the path based on your project structure

export const InstanceNotice = ({ title, text, image, id, onDelete }) => {
  const { isEditing } = useEditing();

  return (
    <div
      className={` p-3 w-full relative  ${isEditing ? "" : ""
        } mb-2  transition-shadow duration-300 ease-in-out`}
    >
      <a href={`${image}`} target="_main">
        <div className="flex flex-col gap-3">


          <div className="w-full md:w-[55%] h-[30px]  border-2 border-slate-500 rounded-xl  md:ms-8  hover:shadow-gray-800 shadow-md hover:scale-105 bg-gray-300">
            <div className=" row">

  <span className="flex justify-start col-md-6">
  <h1 className="text-[16px] ms-2">{text}</h1>
  </span>

<span className="flex justify-end col-md-6">
<h1 className="text-[15px]   me-2">Date: 2024-12-12{}</h1>
    </span>   
            </div>
          </div>

    










        </div>
      </a>

      
      {isEditing && (
        <div className="absolute top-2 right-2">
          <ViewEditButton onDelete={() => onDelete(id)} />
        </div>
      )}
    </div>
  );
};


