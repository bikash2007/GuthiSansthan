import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InstanceDownload from "./InstanceDownload";
import { useEditing } from "../../../context/EditingProvider";
import Downloadform from "./Downloadform";
import EditDownload from "./EditDownload";
import { useSelector } from "react-redux";

export default function Download() {
  const [downloadList, setDownloadList] = useState([]);
  const { isEditing } = useEditing();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingDownload, setEditingDownload] = useState(null);

  useEffect(() => {
    fetchDownloads();
  }, []);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const fetchDownloads = async () => {
    try {
      const response = await fetch(`${baseUrl}api/downloads/`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDownloadList(data);
    } catch (error) {
      console.error("Error fetching download data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}api/downloads/${id}/`, {
        method: "DELETE",
      });
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

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
    setIsEditFormVisible(false);
  };

  const handleEdit = (download) => {
    setEditingDownload(download);
    setIsEditFormVisible(true);
    setIsAddFormVisible(false);
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="w-full p-2 mt-2 overflow-hidden rounded-md"
      >
        <div className="flex flex-col">
          {isEditing && (
            <div className="flex items-center justify-center mt-4">
              <div
                onClick={toggleAddForm}
                className="px-4 py-2 text-lg text-white bg-green-600 rounded-md cursor-pointer sm:text-xl hover:bg-green-700"
              >
                {isAddFormVisible ? "Cancel" : "Add Download"}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full h-full md:ml-5">
            <div className="relative flex flex-col flex-wrap h-full mt-3 text-white">
              {downloadList.length > 0 ? (
                downloadList.map((item) => (
                  <InstanceDownload
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.file}
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(item)}
                  />
                ))
              ) : (
                <h1 className="font-bold text-center text-white">
                  No Downloads at this moment
                </h1>
              )}
            </div>
          </div>
        </div>
        {isAddFormVisible && <Downloadform />}
        {isEditFormVisible && (
          <EditDownload
            download={editingDownload}
            onClose={() => {
              setIsEditFormVisible(false);
              setEditingDownload(null);
            }}
            onSave={() => {
              fetchDownloads();
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
