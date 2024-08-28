import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEditing } from "../../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BranchTeams = ({ branchName, branchId }) => {
  const { isEditing } = useEditing();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://ingnepal.org.np/api/users/?search="
        );
        const filteredUsers = response.data.filter(
          (user) => user.profile && user.profile.branch === branchId
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [branchId]);

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/users/${userId}/`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6 p-4">
      {/* Add button if editing mode is active */}
      {isEditing && (
        <Link
          to="/admin-form"
          state={{ branchName }}
          className="w-full h-fit flex items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="p-5 m-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer"
            size="3x"
          />
        </Link>
      )}

      {/* Display user profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center px-0 py-11"
          >
            <div className="w-20 h-20 mb-4">
              <img
                src={user.profile?.photo || "https://via.placeholder.com/150"}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-gray-700 mb-2">{user.email}</p>

            {user.profile?.contact_no && (
              <p className="text-gray-500">
                Contact: {user.profile.contact_no}
              </p>
            )}

            {/* Remove button if editing mode is active */}
            {isEditing && (
              <button
                onClick={() => handleRemoveUser(user.id)}
                className="mt-4 text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faTrash} size="2x" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchTeams;
