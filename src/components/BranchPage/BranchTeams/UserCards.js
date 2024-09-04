// src/components/UserCards.js

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEditing } from "../../../context/EditingProvider";
import axios from "axios";

const UserCards = ({ user }) => {
  const { isEditing } = useEditing();

  const handleRemoveUser = async () => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/users/${user.id}/`);
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className="bg-green-300/30 backdrop-blur-3xl shadow-xl shadow-zinc-700 rounded-lg overflow-hidden flex flex-col items-center min-w-80  py-6 flex-wrap ">
      <img
        src={user.profile?.photo || "https://via.placeholder.com/150"}
        alt={`${user.first_name} ${user.last_name}`}
        height={200}
        width={200}
        className=" object-cover rounded-full"
      />

      <h3 className="text-lg  mt-3 font-semibold mb-2">
        {user.first_name} {user.last_name}
      </h3>
      <p className="text-gray-700 mb-2">{user.email}</p>

      {user.profile?.contact_no && (
        <p className="text-gray-500">Contact: {user.profile.contact_no}</p>
      )}

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
