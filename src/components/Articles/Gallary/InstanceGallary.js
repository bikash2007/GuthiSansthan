import React from "react";
import { FaTimes, FaDownload, FaEye } from "react-icons/fa";
import { useEditing } from "../../../context/EditingProvider";

const InstanceGallary = ({ items, onDelete, onDownload }) => {
  const { isEditing } = useEditing();
  return (
    <div className="gallery-container">
      {items.map((item) => (
        <div key={item.id} className="gallery-item">
          {item.type === "video" ? (
            <video src={item.url} controls className="gallery-media" />
          ) : (
            <img src={item.url} alt={item.title} className="gallery-media" />
          )}
          <div className="gallery-controls">
            {isEditing && (
              <button
                className="control-button"
                onClick={() => onDelete(item.id)}
              >
                <FaTimes />
              </button>
            )}
            <button
              className="control-button"
              onClick={() => onDownload(item.url)}
            >
              <FaEye />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstanceGallary;
