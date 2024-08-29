import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import InstanceDownload from "./InstanceDownload";
import { useEditing } from "../../../context/EditingProvider";
import Downloadform from "./Downloadform"
import { motion } from "framer-motion";

export default function Download() {
    const [DownloadList, setDownloadList] = useState([]);
    const { isEditing } = useEditing();

    const [isHidden, setIsHidden] = useState(true);

    const toggleDescription = () => {
      setIsHidden(!isHidden);
    };

    return (
        <div className="flex flex-col">
         <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="w-full p-1 mt-2 overflow-hidden rounded-md"
    >
       
        <div className="flex flex-col ">
            {isEditing && (
               <div className="flex items-center justify-center mt-4">
               <div
                   onClick={toggleDescription}
                   style={{ fontFamily: "'Merriweather', serif" }} 
                   className="px-4 py-2 text-xl text-white no-underline bg-green-600 rounded-md cursor-pointer top-3 hover:bg-green-700"
               >
                   Add Download
               </div>
           </div>
            )}
            <div className="flex flex-col w-full h-full ml-5">
                <div className="relative flex flex-col flex-wrap h-full gap-2 px-3 mt-3 text-white">
                    {DownloadList.length > 0 ? (
                        DownloadList.map((item) => (
                            <InstanceDownload
                                key={item.id}
                                title={item.title}
                               
                                image={item.image}
                                id={item.id}
                                // onDelete={handleDeleteNotice}
                            />
                        ))
                    ) : (
                        <h1  style={{ fontFamily: "'Merriweather', serif" }} className="font-bold text-white ">
                            No Download at this moment 
                        </h1>
                    )}
                </div>
            </div>
        </div>
        {!isHidden && < Downloadform/>}
        </motion.div>
       
        </div>
    );
}
