import React from "react"; // Add this if not already present
import { useEditing } from "../../../context/EditingProvider"; // Adjust the path based on your project structure
import { ViewEditButton } from "./ViewEditButton"; // Adjust the path based on your project structure

export const InstanceNotice = ({ title, text, image, id, onDelete }) => {
  const { isEditing } = useEditing();

  return (
    <div
      className={` p-3 w-full relative  bg-gray-900 rounded-lg shadow-lg ${
        isEditing ? "" : ""
      } mb-2 hover:shadow-xl  transition-shadow duration-300 ease-in-out`}
    >
      <a href={`${image}`} target="_main">
        <div className="flex w-full flex-col-reverse md:flex-row items-center md:items-start justify-start gap-3">
          <img
            src={image}
            className="lg:w-3/5 md:w-1/2 w-[90%] aspect-auto object-cover rounded-lg border-2 border-gray-700 shadow-sm"
          />
          <div className="flex flex-col justify-between flex-1">
            <h3 className="font-bold text-white text-2xl">{title}</h3>
            <p className="text-gray-400 text-sm mt-2">{text}</p>
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
