import React from "react";
import { FaTimes, FaEye } from "react-icons/fa";
import { useEditing } from "../../../context/EditingProvider";

const InstanceGallary = ({ items, onDelete, onDownload }) => {
  const { isEditing } = useEditing();

  return (
    <div className="flex flex-wrap justify-center min-h-screen">
      {items.map((item) => (
        <div
          key={item.id}
          className="w-full sm:w-1/2 md:w-1/3 p-2"
          style={{ maxWidth: "calc(33.33% - 10px)" }}
        >
          <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            {item.type === "video" ? (
              <video
                src={item.url}
                controls
                className="w-full h-48 object-cover"
              />
            ) : (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="absolute bottom-2 right-2 flex space-x-2">
              {isEditing && (
                <button
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  onClick={() => onDelete(item.id)}
                >
                  <FaTimes />
                </button>
              )}
              <button
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                onClick={() => onDownload(item.url)}
              >
                <FaEye />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstanceGallary;
