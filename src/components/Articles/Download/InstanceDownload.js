import React from "react";
import logo from "../../../media/logo192.png"; // Make sure this path is correct
import { useEditing } from "../../../context/EditingProvider";

const InstanceDownload = ({ id, title, image, onDelete, onEdit }) => {
  const { isEditing } = useEditing();

  const handleClick = () => {
    if (image) {
      window.open(image, "_blank");
    } else {
      alert("Not available!");
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this download?")) {
      onDelete(id);
    }
  };

  return (
    <div className="relative w-full p-2 md:p-4">
      <div
        className="flex flex-col cursor-pointer md:w-[920px] w-full"
        onClick={handleClick}
        title="Click to view PDF"
      >
        <div className="flex items-center w-[400px] h-16 md:w-[85%] px-4 space-x-4 text-white transition-transform duration-300 ease-in-out bg-gray-300/30 backdrop-blur-xl border-1 border-slate-500 rounded-xl hover:scale-105">
          <h1 className="flex-1 text-sm font-semibold truncate sm:text-base md:text-lg">
            {title}
          </h1>
          <img src={logo} className="hidden w-12 h-12 sm:block" alt="Logo" />
        </div>
      </div>

      {isEditing && (
        <div className="absolute flex gap-2 right-4 top-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            className="px-3 py-2 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
            aria-label="Edit download"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 text-xs text-white bg-red-600 rounded hover:bg-red-700"
            aria-label="Remove download"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default InstanceDownload;
