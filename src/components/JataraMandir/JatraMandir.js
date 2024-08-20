import React, { useState } from "react";
import Temple from "./Temple/Temple";
import { Parva } from "./Parva/Parva";

const JatraMandir = () => {
  const [activeTab, setActiveTab] = useState("parva");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="w-full flex justify-center mb-4">
        <button
          onClick={() => handleTabSwitch("parva")}
          className={`px-4 py-2 rounded-l-md ${
            activeTab === "parva"
              ? "bg-cyan-500 text-white"
              : "bg-white text-cyan-500 dark:bg-gray-700 dark:text-cyan-300"
          } font-semibold focus:outline-none`}
        >
          Parva
        </button>
        <button
          onClick={() => handleTabSwitch("temple")}
          className={`px-4 py-2 rounded-r-md ${
            activeTab === "temple"
              ? "bg-cyan-500 text-white"
              : "bg-white text-cyan-500 dark:bg-gray-700 dark:text-cyan-300"
          } font-semibold focus:outline-none`}
        >
          Temple
        </button>
      </div>
      <div className="w-full">
        {activeTab === "parva" && <Parva />}
        {activeTab === "temple" && <Temple />}
      </div>
    </div>
  );
};

export default JatraMandir;
