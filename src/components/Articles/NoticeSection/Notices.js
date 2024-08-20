import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { InstanceNotice } from "./InstanceNotice"; // Adjust the path based on your project structure

export const Notices = () => {
  const [notices, setNotices] = useState([]);

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
    <div className="w-full flex justify-center h-full">
      <div className="flex flex-col h-full w-full border ml-5 border-red-600 rounded-lg backdrop-blur-lg">
        <div className="w-full flex justify-center items-center h-20 bg-yellow-600 rounded-lg">
          <h1 className="font-semibold text-white underline">NOTICE</h1>
        </div>
        <div className="flex flex-wrap relative flex-col px-3 gap-2 bg-zinc-900/40 text-white h-full">
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
            <h1 className="font-semibold text-cyan-600 text-center text-4xl">
              No notices at this moment
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
