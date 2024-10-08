import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEditing } from "../../../context/EditingProvider";
import axios from "axios";
import { useSelectLanguage } from "../../../context/LanguageChoice";
import { useSelector } from "react-redux";
import { EditBgImage } from "../../EditComponents";
import EditBranchTeams from "./EditBranchTeams";

const UserCards = ({ assignment }) => {
  const { isEditing } = useEditing();
  const { selectLanguage } = useSelectLanguage();
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  const handleRemoveAssignment = async () => {
    try {
      await axios.delete(`${baseUrl}api/darbandi/${assignment.darbandi.id}/`);
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error removing assignment:", error);
    }
  };

  const profile = assignment.profile || {};
  const post = assignment.darbandi.post || {};
  const language = selectLanguage || "English"; // Default to "English" if selectLanguage is undefined
  const firstName = profile.first_name?.[language] || ""; // Safeguard property access
  const lastName = profile.last_name?.[language] || ""; // Safeguard property access

  const photoUrl = profile.photo || "https://via.placeholder.com/150";
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <EditBranchTeams setIsOpen={setIsOpen} />}

      <div className="bg-green-300/30 backdrop-blur-3xl shadow-xl shadow-zinc-700 rounded-lg overflow-hidden flex flex-col items-center min-w-80 py-6 flex-wrap">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          height={200}
          width={200}
          className="object-cover rounded-full"
        />
        <h3 className="text-lg mt-3 font-semibold mb-2">
          {firstName} {lastName}
        </h3>
        <p className="text-gray-700 mb-2">
          {post.name?.[language] || "N/A"} {/* Safeguard property access */}
        </p>

        {isEditing && (
          <div className="flex space-x-2 mt-4">
            <FontAwesomeIcon
              onClick={() => setIsOpen(true)}
              className="crusor-pointer"
              icon={faEdit}
              size="2x"
            />
            <button
              onClick={handleRemoveAssignment}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faTrash} size="2x" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCards;
