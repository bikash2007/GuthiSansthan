import React, { useState, useEffect } from "react";
import InstanceLaw from "./InstanceLaw";
import { useEditing } from "../../../context/EditingProvider";
import Lawform from "./Lawform";
import EditLaw from "./EditLaw";
import { motion } from "framer-motion";
import axios from "axios";

export default function Law() {
  const [lawList, setLawList] = useState([]);
  const { isEditing } = useEditing();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingLaw, setEditingLaw] = useState(null);

  useEffect(() => {
    fetchLaws();
  }, []);

  const fetchLaws = async () => {
    try {
      const response = await axios.get("https://ingnepal.org.np/api/laws/");
      setLawList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/laws/${id}/`);
      setLawList(lawList.filter((law) => law.id !== id));
    } catch (error) {
      console.error("Error deleting the law:", error);
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
    setIsEditFormVisible(false);
  };

  const handleEdit = (law) => {
    setEditingLaw(law);
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
                {isAddFormVisible ? "Cancel" : "Add Law"}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full h-full md:ml-5">
            <div className="relative flex flex-col flex-wrap h-full mt-3 text-white">
              {lawList.length > 0 ? (
                lawList.map((law) => (
                  <InstanceLaw
                    key={law.id}
                    id={law.id}
                    title={law.title}
                    link={law.file}
                    onDelete={handleDelete}
                    onEdit={() => handleEdit(law)}
                  />
                ))
              ) : (
                <h1 className="font-bold text-center text-white">No Law at this moment</h1>
              )}
            </div>
          </div>
        </div>
        {isAddFormVisible && <Lawform />}
        {isEditFormVisible && (
          <EditLaw
            law={editingLaw}
            onClose={() => {
              setIsEditFormVisible(false);
              setEditingLaw(null);
            }}
            onSave={() => {
              fetchLaws();
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
