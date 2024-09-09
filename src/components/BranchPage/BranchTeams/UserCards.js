// src/components/UserCards.js

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEditing } from "../../../context/EditingProvider";
import axios from "axios";

const UserCards = ({ user, branchId }) => {
  const { isEditing } = useEditing();

  const handleRemoveUser = async () => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/profiles/${user.id}/`);
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  // Extract the relevant fields from the nested structure
  const firstName =
    user.first_name?.Nepali || user.first_name?.English || "N/A";
  const lastName = user.last_name?.Nepali || user.last_name?.English || "N/A";
  const contactNo = user.contact_no || "N/A";
  const photoUrl = user.photo || "https://via.placeholder.com/150";

  return (
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
      {user.pan_no && (
        <p className="text-gray-700 mb-2">PAN No: {user.pan_no}</p>
      )}
      {user.bank_name?.Nepali && (
        <p className="text-gray-500">Bank: {user.bank_name.Nepali}</p>
      )}
      {user.address?.Nepali && (
        <p className="text-gray-500">Address: {user.address.Nepali}</p>
      )}
      {contactNo && <p className="text-gray-500">Contact: {contactNo}</p>}

      {isEditing && (
        <div className="flex space-x-2 mt-4">
          <Link
            to={`/edit-user/${user.id}`}
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faEdit} size="2x" />
          </Link>
          <button
            onClick={handleRemoveUser}
            className="text-red-500 hover:text-red-700 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faTrash} size="2x" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCards;
