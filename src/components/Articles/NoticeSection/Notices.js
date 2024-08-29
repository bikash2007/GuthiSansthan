import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { useEditing } from "../../../context/EditingProvider";
import { InstanceNotice } from "./InstanceNotice"; // Adjust the path based on your project structure

export const Notices = () => {
  const [notices, setNotices] = useState([]);
  const { isEditing } = useEditing();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          "https://ingnepal.org.np/api/notices/"
        );
        if (response.status === 200) {
          setNotices(response.data);
        } else {
          throw new Error("Failed to fetch notices");
        }
      } catch (error) {
        toast.error("An error occurred while fetching notices.");
        console.error(error);
      }
    };

    fetchNotices();
  }, []);

  const handleDeleteNotice = async (id) => {
    try {
      const response = await axios.delete(
        `https://ingnepal.org.np/api/notices/${id}/`
      );
      if (response.status === 204) {
        setNotices((prevNotices) =>
          prevNotices.filter((notice) => notice.id !== id)
        );
        toast.success("Notice deleted successfully.");
      } else {
        throw new Error("Failed to delete notice");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the notice.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
        {isEditing && (
                <div className="flex items-center justify-center mt-4">
                    <Link
                        to="/noticeform"
                        className="px-4 py-2 text-lg text-white no-underline bg-green-600 rounded-md cursor-pointer top-3 hover:bg-green-700"
                    >
                        Add Notice
                    </Link>
                </div>
            )}
      <div className="flex flex-col w-full h-full ml-5 ">
       
        <div className="relative flex flex-col flex-wrap h-full gap-2 px-3 mt-3 text-white">
          {notices.length > 0 ? (
            notices.map((item) => (
              <InstanceNotice
                key={item.id}
                title={item.title}
                text={item.text}
                image={item.image}
                id={item.id}
                onDelete={handleDeleteNotice}
              />
            ))
          ) : (
            <>
          
            <h1 className="text-4xl font-semibold text-center text-cyan-600">
              No notices at this moment
            </h1>
            <h1></h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
