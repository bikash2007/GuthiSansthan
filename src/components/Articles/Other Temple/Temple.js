import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useEditing } from "../../../context/EditingProvider";
import InstanceTemple from "./InstanceTemple";
import EditTemple from "./EditTemple";
import Templeform from "./Templeform";

export default function Temple() {
  const [templeList, setTempleList] = useState([]);
  const { isEditing } = useEditing();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingTemple, setEditingTemple] = useState(null);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const response = await axios.get(
        "https://ingnepal.org.np/api/circulars/"
      );
      setTempleList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/circulars/${id}/`);
      setTempleList(templeList.filter((temple) => temple.id !== id));
    } catch (error) {
      console.error("Error deleting the temple:", error);
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
    setIsEditFormVisible(false);
  };

  const handleEdit = (temple) => {
    setEditingTemple(temple);
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
                {isAddFormVisible ? "Cancel" : "Add "}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full h-full md:ml-5">
            <div className="relative flex flex-col flex-wrap h-full mt-3 text-white">
              {templeList.length > 0 ? (
                templeList.map((temple) => (
                  <InstanceTemple
                    key={temple.id}
                    id={temple.id}
                    title={temple.title}
                    link={temple.file}
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(temple)}
                  />
                ))
              ) : (
                <h1 className="font-bold text-center text-white">
                  No Temple data at this moment
                </h1>
              )}
            </div>
          </div>
        </div>
        {isAddFormVisible && <Templeform />}
        {isEditFormVisible && (
          <EditTemple
            temple={editingTemple}
            onClose={() => {
              setIsEditFormVisible(false);
              setEditingTemple(null);
            }}
            onSave={() => {
              fetchTemples();
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
