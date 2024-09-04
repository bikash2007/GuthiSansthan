import React from "react";
import { useEditing } from "../../../context/EditingProvider";

const InstanceGallary = ({ id, title, link, onDelete, onEdit }) => {
  const { isEditing } = useEditing();

  const handleClick = () => {
    window.open(link, "_blank");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this video or photo?")) {
      onDelete(id);
    }
  };

  return (
    <div className="relative w-full p-2 md:p-4">
      <div
        className="flex flex-col cursor-pointer md:w-[920px] w-full"
        onClick={handleClick}
        title="Click to view photo or video"
      >
        <div className="flex items-center w-full h-auto p-4 space-x-4 transition-transform duration-300 ease-in-out bg-white border border-gray-200 shadow-lg rounded-xl hover:scale-105">
          <img 
            src={link} 
            className="object-cover w-16 h-16 rounded-lg" 
            alt="Thumbnail" 
          />
          <div className="flex-grow">
            {link.endsWith(".mp4") ? (
              <video className="w-full h-auto rounded-lg" controls>
                <source src={link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={link} 
                className="object-cover w-full h-full rounded-lg" 
                alt="Gallery Item"
              />
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="absolute flex gap-2 right-4 top-4 md:top-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="px-4 py-2 text-sm text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
            aria-label="Edit"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm text-white transition bg-red-600 rounded-lg shadow-md hover:bg-red-700"
            aria-label="Delete"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default InstanceGallary;
