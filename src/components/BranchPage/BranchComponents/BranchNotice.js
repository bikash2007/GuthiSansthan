import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEditing } from "../../../context/EditingProvider";
import { InstanceNotice } from "../../Articles/NoticeSection/InstanceNotice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const BranchNotice = ({ branchName, branchId }) => {
  const { isEditing } = useEditing();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchBranchAllNotice();
  }, [baseUrl, branchId]); // Add dependencies to prevent infinite calls

  const fetchBranchAllNotice = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/branches/${branchId}/get-notices/`
      );
      setNotices(response.data); // axios stores data in response.data
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  return (
    <div className="w-full  h-full flex flex-col items-center justify-center">
      {notices && notices.length > 0 ? (
        notices.map((item, index) => (
          <InstanceNotice
            key={index} // Use a unique key for each item in the list
            title={item.title}
            text={item.text}
            image={item.image}
          />
        ))
      ) : (
        <h1 className="font-semibold text-cyan-600 text-center text-4xl">
          No notices at this moment
        </h1>
      )}
      {isEditing && (
        <Link
          to="/super-user/add-notices"
          state={{ branchName }}
          className="w-full h-fit flex items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="p-5 m-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer no-underline"
            size="3x"
          />
        </Link>
      )}
    </div>
  );
};
