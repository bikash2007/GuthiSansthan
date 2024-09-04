import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEditing } from "../../context/EditingProvider";
import { useSelectLanguage } from "../../context/LanguageChoice"; // Import the language context
import EditAboutUs from "./EditAboutUs"; // Import the EditAboutUs component

const InstanceAboutUs = ({ title, text, img, onRemove, id }) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditingMode, setEditingMode] = useState(false);
  const { isEditing } = useEditing();
  const { selectLanguage } = useSelectLanguage(); // Get the selected language

  const handleEditToggle = () => {
    setEditingMode(!isEditingMode);
  };

  useEffect(() => {
    console.log("isEditingMode:", isEditingMode);
  }, [isEditingMode]);

  return (
    <>
      <div className="relative w-[150px] rounded-md overflow-hidden cursor-pointer lg:w-[200px] bg-center bg-cover flex flex-col justify-center items-end">
        <div
          onClick={() => setOpen(true)}
          className="w-full bg-center bg-cover h-[100px] lg:h-[150px]"
          style={{ backgroundImage: `url(${img})` }}
        >
          {isEditing && (
            <>
              <button
                className="absolute z-20 top-0 right-0 px-2 bg-red-500 text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from also opening the modal
                  if (onRemove) onRemove();
                }}
              >
                Remove
              </button>
              {isEditingMode ? (
                <button
                  className="absolute z-20 top-0 left-0 px-2 bg-red-500 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditToggle(); // Toggle edit mode
                  }}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="absolute z-20 top-0 left-0 px-2 bg-green-500 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditToggle(); // Toggle edit mode
                  }}
                >
                  Edit
                </button>
              )}
            </>
          )}
        </div>
        <p className="w-full bg-blue-900 text-white font-semibold z-10 p-2">
          {title[selectLanguage]} {/* Display title in selected language */}
        </p>
      </div>

      {isOpen && !isEditingMode && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-neutral-800/50 overflow-auto p-4">
          <div className="relative w-full max-w-3xl md:max-w-4xl bg-white/40 backdrop-blur-lg p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <FontAwesomeIcon
              icon={faClose}
              size={"2x"}
              className="absolute top-4 right-4 cursor-pointer text-red-600"
              onClick={() => setOpen(false)}
            />
            <div className="mb-4">
              <img
                src={img}
                alt={title[selectLanguage]}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {title[selectLanguage]} {/* Display title in selected language */}
            </h2>
            <p className="text-gray-700">
              {text[selectLanguage]} {/* Display text in selected language */}
            </p>
          </div>
        </div>
      )}

      {isOpen && isEditingMode && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-800/50">
          <div className="relative w-3/4 max-w-4xl bg-white/40 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <FontAwesomeIcon
              icon={faClose}
              size={"2x"}
              className="absolute top-4 right-4 cursor-pointer text-red-600"
              onClick={() => setOpen(false)}
            />
            <EditAboutUs
              content={{ title, text, img, id }}
              toggleEditMode={handleEditToggle}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InstanceAboutUs;
