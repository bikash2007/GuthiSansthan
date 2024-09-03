import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InstanceDownload from "./InstanceDownload";
import { useEditing } from "../../../context/EditingProvider";
import Downloadform from "./Downloadform";
import EditDownload from "./EditDownload"; // Import EditDownload component

export default function Download() {
  const [downloadList, setDownloadList] = useState([]);
  const { isEditing } = useEditing();
  const [isHidden, setIsHidden] = useState(true);
  const [editingDownload, setEditingDownload] = useState(null); // State for selected download
  const [showEditForm, setShowEditForm] = useState(false); // State to control showing EditDownload form

  useEffect(() => {
    // Fetch data from API
    const fetchDownloads = async () => {
      try {
        const response = await fetch("https://ingnepal.org.np/api/downloads/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDownloadList(data);
      } catch (error) {
        console.error("Error fetching download data:", error);
      }
    };

    fetchDownloads();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const toggleDescription = () => {
    setIsHidden(!isHidden);
  };

  const handleEdit = (download) => {
    setEditingDownload(download); // Set the selected download for editing
    setShowEditForm(true); // Show the EditDownload form
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://ingnepal.org.np/api/downloads/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setDownloadList((prevList) =>
          prevList.filter((item) => item.id !== id)
        );
        alert("Download deleted successfully!");
      } else {
        alert("Failed to delete download.");
      }
    } catch (error) {
      console.error("Error deleting download:", error);
      alert("Error deleting download.");
    }
  };

  const handleSave = () => {
    setShowEditForm(false); // Hide the EditDownload form after saving
    // Optionally refresh the download list here if needed
    // fetchDownloads(); // Uncomment if you want to fetch the list again
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="w-full p-4 mt-2 overflow-hidden rounded-md bg-gray-800"
      >
        <div className="flex flex-col">
          {isEditing && (
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={toggleDescription}
                className="px-4 py-2 text-xl text-white bg-green-600 rounded-md cursor-pointer hover:bg-green-700"
              >
                Add Download
              </button>
            </div>
          )}
          <div className="flex flex-col w-full mt-3 text-white">
            {downloadList.length > 0 ? (
              downloadList.map((item) => (
                <InstanceDownload
                  key={item.id}
                  title={item.title}
                  image={item.file}
                  id={item.id}
                  onDelete={handleDelete}
                  onEdit={() => handleEdit(item)} // Pass the item to handleEdit
                />
              ))
            ) : (
              <h1 className="font-bold text-center">
                No Downloads at this moment
              </h1>
            )}
          </div>
        </div>
        {!isHidden && <Downloadform />}
        {showEditForm && (
          <EditDownload
            download={editingDownload}
            onClose={() => setShowEditForm(false)} // Close the edit form
            onSave={handleSave} // Refresh the list or any other actions on save
          />
        )}
      </motion.div>
    </div>
  );
}
