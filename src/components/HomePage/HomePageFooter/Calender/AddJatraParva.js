import { faArrowLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { AddJatra } from "../../../JataraMandir/Parva/AddJatra";
import AddParva from "./AddParva";

const AddJatraParva = ({ setJatraOpen }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="fixed bg-zinc-700/30 backdrop-blur-sm left-0 flex z-20 top-0 items-center justify-center gap-8 w-[100%] h-[100%]">
      <div className="bg-gray-400/40 relative flex z-30 items-center justify-center gap-8 w-[90%] h-[80%] overflow-auto">
        {/* Close button */}
        <FontAwesomeIcon
          size="1.5x"
          icon={faClose}
          className="text-zinc-800 cursor-pointer hover:text-red-700 z-50 absolute scale-150 top-1 right-3"
          onClick={() => setJatraOpen(false)}
        />

        {/* Back button for going back to the selection */}
        {isSelected && (
          <FontAwesomeIcon
            size="1.5x"
            icon={faArrowLeft}
            className="text-zinc-800 cursor-pointer z-50 hover:text-red-700 absolute scale-150 top-1 left-3"
            onClick={() => setIsSelected(false)}
          />
        )}

        {/* Initial selection: Choose between Jatra or Parva */}
        {!isSelected && (
          <>
            <button
              onClick={() => setIsSelected("jatra")}
              className="px-3 py-1 bg-gray-900 rounded-md text-xl font-semibold hover:scale-110 transition-all duration-150 ease-linear text-white"
            >
              Add Jatra
            </button>
            <button
              onClick={() => setIsSelected("parva")}
              className="px-3 py-1 bg-gray-900 rounded-md text-xl font-semibold hover:scale-110 transition-all duration-150 ease-linear text-white"
            >
              Add Parva
            </button>
          </>
        )}

        {/* Jatra form */}
        {isSelected === "jatra" && <AddJatra />}

        {/* Parva form */}
        {isSelected === "parva" && <AddParva />}
      </div>
    </div>
  );
};

export default AddJatraParva;
