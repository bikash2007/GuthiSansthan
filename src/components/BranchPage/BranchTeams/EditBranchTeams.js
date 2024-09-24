import {
  faArrowLeft,
  faBackspace,
  faBackward,
  faCancel,
  faClose,
  faEdit,
  faTentArrowTurnLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import EmployeeForm from "../../AdminForm/EmployeeForm";
import SelectEmployee from "./SelectEmployee";

const EditBranchTeams = ({ setIsOpen }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="fixed bg-zinc-700/30 backdrop-blur-sm left-0 flex z-20 top-0 items-center justify-center gap-8 w-[100%] h-[100%]">
      <div className=" bg-gray-400/40 relative  flex z-30  items-center justify-center gap-8 w-[90%] h-[80%] overflow-auto">
        <FontAwesomeIcon
          size="1.5x"
          icon={faClose}
          className="text-zinc-800 hover:text-red-700 absolute scale-150 top-1 right-3"
          onClick={() => setIsOpen(false)}
        />
        {isSelected && (
          <FontAwesomeIcon
            size="1.5x"
            icon={faArrowLeft}
            className="text-zinc-800 hover:text-red-700 absolute scale-150 top-1 left-3"
            onClick={() => setIsSelected(false)}
          />
        )}
        {!isSelected && (
          <>
            <button
              onClick={() => {
                setIsSelected(2);
              }}
              className="px-3 py-1 bg-gray-900 rounded-md text-xl font-semibold hover:scale-110 transition-all duration-150 ease-linear text-white"
            >
              Existing employee
            </button>
            <button
              onClick={() => {
                setIsSelected(1);
              }}
              className="px-3 py-1 bg-gray-900 rounded-md text-xl font-semibold hover:scale-110 transition-all duration-150 ease-linear text-white"
            >
              Create employee profile
            </button>
          </>
        )}
        {isSelected == 2 && (
          <div className="pt-44">
            <SelectEmployee />
          </div>
        )}
        {isSelected == 1 && (
          <div className="flex gap-3 relative">
            <EmployeeForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBranchTeams;
