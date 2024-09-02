import React from "react";
import logo from "../../../media/logo192.png";
import { useEditing } from "../../../context/EditingProvider";

const Law = ({ id, title, link, onDelete, onEdit }) => {
  const { isEditing } = useEditing();

  const handleClick = () => {
    window.open(link, "_blank");
  };

  return (
    <div className="relative w-full p-4">
      <div
        className="flex flex-col cursor-pointer"
        onClick={handleClick}
        title="Click to view PDF"
      >
        <div className="w-full max-w-lg h-16 border-2 border-slate-500 rounded-xl bg-gray-300 transition-transform duration-300 ease-in-out hover:scale-105 text-black flex items-center px-4">
          <h1 className="text-sm md:text-lg font-semibold truncate">{title}</h1>
          <img src={logo} className="w-12 h-12 ml-auto" alt="Logo" />
        </div>
      </div>
      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from bubbling up to the parent div
              onEdit(id);
            }}
            className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
            aria-label="Edit law"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from bubbling up to the parent div
              onDelete(id);
            }}
            className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
            aria-label="Remove law"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Law;
