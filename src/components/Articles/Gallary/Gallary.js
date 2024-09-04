import React, { useState, useEffect } from "react";
import InstanceGallary from "./InstanceGallary";
import { useEditing } from "../../../context/EditingProvider";
import Gallaryform from "./GallaryForm";

import EditGallary from "./EditGallary";

import { motion } from "framer-motion";
import axios from "axios";

export default function Gallary() {
  const [GallaryList, setGallaryList] = useState([]);
  const { isEditing } = useEditing();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingGallary, setEditingGallary] = useState(null);

  // Function to fetch Gallarys
  const fetchGallarys = async () => {
    try {
      const response = await axios.get("https://ingnepal.org.np/api/Gallarys/");
      setGallaryList(response.data);
    } catch (error) {
      console.error("Error fetching Gallarys:", error);
    }
  };

  useEffect(() => {
    fetchGallarys();
  }, []);

  // Toggle visibility of add form
  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/Gallarys/${id}/`);
      fetchGallarys(); // Refresh the list
    } catch (error) {
      console.error("Error deleting Gallary:", error);
    }
  };

  // Handle edit action
  const handleEdit = (Gallary) => {
    setEditingGallary(Gallary);
    setIsEditFormVisible(true);
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
                {isAddFormVisible ? "Cancel" : "Add Gallary"}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full h-full md:ml-5">
            <div className="relative flex flex-col flex-wrap h-full mt-3 text-white">
              {GallaryList.length > 0 ? (
                GallaryList.map((Gallary) => (
                  <InstanceGallary
                    key={Gallary.id}
                    id={Gallary.id}
                    imagevideo={Gallary.file} // Updated to use `Gallary.file`
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(Gallary)}
                  />
                ))
              ) : (
                <h1 className="font-bold text-center text-white">No Photo or Video at this moment</h1>
              )}
            </div>
          </div>
        </div>
        {isAddFormVisible && <Gallaryform />}
        {isEditFormVisible && (
          <EditGallary
            Gallary={editingGallary}
            onClose={() => {
              setIsEditFormVisible(false);
              setEditingGallary(null);
            }}
            onSave={() => {
              fetchGallarys(); // Refresh list after saving
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
