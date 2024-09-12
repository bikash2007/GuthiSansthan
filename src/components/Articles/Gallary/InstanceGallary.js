import React from "react";
import { FaTimes, FaDownload } from "react-icons/fa";

const InstanceGallary = ({ items, onDelete, onDownload }) => {
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
            <button
              className="control-button"
              onClick={() => onDelete(item.id)}
            >
              <FaTimes />
            </button>
            <button
              className="control-button"
              onClick={() => onDownload(item.url)}
            >
              <FaDownload />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstanceGallary;
