import React from "react";
import logo from "../../../media/logo192.png";
import { useEditing } from "../../../context/EditingProvider";

const InstanceBudget = ({ id, title, amount, file, onDelete, onEdit }) => {
  const { isEditing } = useEditing();

  const handleClick = () => {
    if (file) {
      window.open(file, "_blank");
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this budget?")) {
      onDelete(id);
    }
  };

  return (
    <div className="relative w-full p-2 md:p-4">
      <div
        className="flex flex-col cursor-pointer md:w-[920px] w-full"
        onClick={handleClick}
        title="Click to view details"
      >
        <div className="flex items-center w-[400px] h-16 md:w-[920px] px-4 space-x-4 text-black transition-transform duration-300 ease-in-out bg-gray-300 border-2 border-slate-500 rounded-xl hover:scale-105">
          <h1 className="flex-1 text-sm font-semibold truncate sm:text-base md:text-lg">
            {title} - ${amount}
          </h1>
          <img src={logo} className="hidden w-12 h-12 sm:block" alt="Logo" />
        </div>
      </div>

      {isEditing && (
        <div className="absolute flex gap-2 top-6 right-28">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
            aria-label="Edit budget"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
            aria-label="Remove budget"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default InstanceBudget;
