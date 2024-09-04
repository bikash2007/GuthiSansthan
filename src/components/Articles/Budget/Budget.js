import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useEditing } from "../../../context/EditingProvider";
import InstanceBudget from "./InstanceBudget";
import BudgetEdit from "./BudgetEdit";
import Budgetform from "./Budgetform";

export default function Budget() {
  const [budgetList, setBudgetList] = useState([]);
  const { isEditing } = useEditing();
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get("https://example.com/api/budgets/");
      setBudgetList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://example.com/api/budgets/${id}/`);
      setBudgetList(budgetList.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error("Error deleting the budget:", error);
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
    setIsEditFormVisible(false);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setIsEditFormVisible(true);
    setIsAddFormVisible(false);
  };

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="flex flex-col w-full px-4 py-6 text-white"
      >

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
        <div className="flex flex-col w-full h-full mt-3">
          <div className="relative flex flex-col flex-wrap h-full text-white">
            {budgetList.length > 0 ? (
              budgetList.map((budget) => (
                <InstanceBudget
                  key={budget.id}
                  id={budget.id}
                  title={budget.title}
                  amount={budget.amount}
                  file={budget.file}
                  onDelete={handleDelete}
                  onEdit={() => handleEdit(budget)}
                />
              ))
            ) : (
              <h1 className="font-bold text-center text-white">
                No Budget data at this moment
              </h1>
            )}
          </div>
        </div>
        {isAddFormVisible && <Budgetform />}
        {isEditFormVisible && (
          <BudgetEdit
            budget={editingBudget}
            onClose={() => {
              setIsEditFormVisible(false);
              setEditingBudget(null);
            }}
            onSave={fetchBudgets}
          />
        )}
      </motion.div>
    </div>
  );
}
