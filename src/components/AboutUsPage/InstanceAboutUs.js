import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEditing } from "../../context/EditingProvider";

const InstanceAboutUs = ({ title, text, img, onRemove }) => {
  const [isOpen, setOpen] = useState(false);
  const { isEditing } = useEditing();

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative h-[100px] w-[150px] rounded-md overflow-hidden cursor-pointer lg:w-[200px] lg:h-[150px] bg-center bg-cover flex justify-center items-end"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="bg-zinc-900/40 w-full h-full absolute"></div>
        <p className="text-white font-semibold z-10 p-2">{title}</p>
        {isEditing && (
          <button
            className="absolute z-20 top-0 right-0 px-2 bg-red-500 text-white"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from also opening the modal
              if (onRemove) onRemove();
            }}
          >
            Remove
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-800/50">
          <div className="relative w-3/4 max-w-4xl bg-white/40 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faClose}
              size={"2x"}
              className="absolute top-4 right-4 cursor-pointer text-red-600"
              onClick={() => setOpen(false)}
            />
            <div className="mb-4">
              <img
                src={img}
                alt={title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default InstanceAboutUs;
