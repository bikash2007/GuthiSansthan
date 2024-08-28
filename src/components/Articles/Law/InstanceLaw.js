import React, { useEffect, useState } from "react";
import logo from "../../../media/logo192.png"

const Law = () => {
 

  const handleClick = () => {
    // Example click handler
    alert("Div clicked!");
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="relative w-full p-0 "
      >
        <div className="flex flex-col">
          <div className="w-full md:w-[55%] h-[50px] border-2 border-slate-500 rounded-xl md:ms-[80px] bg-gray-300 transition-transform duration-300 ease-in-out hover:scale-[1.08] text-black mt-3 font-semibold">
            <div className="flex items-center justify-between h-full px-4">
              <h1 className="text-[10px] md:text-[16px] truncate"></h1>
              <img src={logo} className="w-10 h-10"/>
            </div>
          </div>
        </div>
      </div>

      <div className="z-50 flex flex-col gap-1 text-white ">
      <div className="flex px-2 py-1 bg-gray-600 border rounded-md cursor-pointer hover:bg-gray-700">
        Edit
      </div>
      <div
        className="flex px-2 py-1 bg-red-600 border rounded-md cursor-pointer hover:bg-red-700"
        onClick=""
      >
        Remove
      </div>
      <div
        className="flex px-2 py-1 bg-green-600 border rounded-md cursor-pointer hover:bg-green-700"
        onClick=""
      >
        Add
      </div>
    </div>
    </>
  );
};

// Export Law as the default export
export default Law;
