// src/components/BranchTeams.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEditing } from "../../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserCards from "./UserCards";

const BranchTeams = ({ branchName, branchId }) => {
  const { isEditing } = useEditing();
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6 p-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <UserCards key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default BranchTeams;
