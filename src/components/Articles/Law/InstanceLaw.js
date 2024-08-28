import React, { useEffect, useState } from "react";
import logo from "../../../media/logo192.png"
import { useEditing } from "../../../context/EditingProvider";
import Editbutton from "./Editbutton";

const Law = () => {
  const { isEditing } = useEditing();

  const handleClick = () => {
    // Example click handler
    alert("Div clicked!");
  };

  return (
    <>
      <h1 className="font-bold text-red-800">Updating soon......</h1>
      <div
        onClick={handleClick}
        className="relative hidden w-full p-0"
      >
      
        <div className="flex flex-col">
          <div className="w-full md:w-[55%] h-[50px] border-2 border-slate-500 rounded-xl md:ms-[80px] bg-gray-300 transition-transform duration-300 ease-in-out hover:scale-[1.08] text-black mt-3 font-semibold">
            <div className="flex items-center justify-between h-full px-4">
              <h1 className="text-[10px] md:text-[16px] truncate"></h1>
              <img src={logo} className="w-10 h-10"/>
            </div>
          </div>
        </div>
        {/* {isEditing && (
          // <div className="absolute top-2 right-2">
          //   <Editbutton onDelete={() => onDelete} />
          // </div>
        )} */}
      </div>


    </>
  );
};

// Export Law as the default export
export default Law;
