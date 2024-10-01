import React, { useEffect, useState } from "react";
import GallaryForm from "./GallaryForm";
import { useEditing } from "../../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Gallary = () => {
  const { isEditing } = useEditing();
  const [galleryItems, setGalleryItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  // Fetch gallery items from API
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch(`${baseUrl}api/gallery/`);
        const data = await response.json();
        setGalleryItems(data);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
        setError("Failed to load gallery items.");
      }
    };

    fetchGalleryItems();
  }, []);

  // Function to handle deleting an item
  const handleDelete = async (id) => {
    try {
      await fetch(`${baseUrl}api/gallery/${id}/`, {
        method: "DELETE",
      });
      setGalleryItems(galleryItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete the item.");
    }
  };

  // Function to handle downloading an image or video
  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 min-h-screen">
      {isEditing && (
        <>
          {error && (
            <div className="mb-4 p-4 bg-red-200 text-red-800 rounded-lg">
              {error}
            </div>
          )}
          <button
            className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "Add New Item"}
          </button>
          {showForm && <GallaryForm />}
        </>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${
          galleryItems.length < 3 ? "justify-center" : ""
        }`}
      >
        {galleryItems.map((item) => (
          <div key={item.id} className="w-full flex justify-center">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="h-48 w-full overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                )}
                {item.video && (
                  <video
                    src={item.video}
                    controls
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.credit}</p>
                <div className="flex justify-between mt-4">
                  {item.image && (
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleDownload(item.image)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  )}
                  {item.video && (
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleDownload(item.video)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  )}
                  {isEditing && (
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallary;
