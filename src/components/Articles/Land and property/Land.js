import React, { useState, useEffect } from "react";

import { useEditing } from "../../../context/EditingProvider";
import { motion } from "framer-motion";
import axios from "axios";
import Instanceland from "./Instanceland";
import LandEdit from "./LandEdit";
import Landform from "./Landform";

export default function Land() {
  const [landList, setLandList] = useState([]);
  const { isEditing } = useEditing();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingLand, setEditingLand] = useState(null);

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      const response = await axios.get("https://ingnepal.org.np/api/rates/");
      setLandList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/rates/${id}/`);
      setLandList(landList.filter((land) => land.id !== id));
    } catch (error) {
      console.error("Error deleting the land:", error);
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
    setIsEditFormVisible(false);
  };

  const handleEdit = (land) => {
    setEditingLand(land);
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
                {isAddFormVisible ? "Cancel" : "Add Land"}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full h-full md:ml-5">
            <div className="relative flex flex-col flex-wrap h-full mt-3 text-white">
              {landList.length > 0 ? (
                landList.map((land) => (
                  <Instanceland
                    key={land.id}
                    id={land.id}
                    title={land.title}
                    link={land.file}
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(land)}
                  />
                ))
              ) : (
                <h1 className="font-bold text-center text-white">
                  No Land data at this moment
                </h1>
              )}
            </div>
          </div>
        </div>
        {isAddFormVisible && <Landform />}
        {isEditFormVisible && (
          <LandEdit
            land={editingLand}
            onClose={() => {
              setIsEditFormVisible(false);
              setEditingLand(null);
            }}
            onSave={() => {
              fetchLands();
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
