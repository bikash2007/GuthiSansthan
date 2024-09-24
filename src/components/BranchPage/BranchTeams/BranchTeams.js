// src/components/BranchTeams.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEditing } from "../../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserCards from "./UserCards";
import { useSelector } from "react-redux";

const BranchTeams = ({ branchName, branchId }) => {
  const { isEditing } = useEditing();
  const [assignments, setAssignments] = useState([]);
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/branches/${branchId}/get-darbandi-assignment/`
        );
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [branchId]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6 p-4">
      <div className="gap-16 w-full flex overflow-x-scroll py-4">
        {assignments.map((assignment) => (
          <UserCards key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default BranchTeams;
