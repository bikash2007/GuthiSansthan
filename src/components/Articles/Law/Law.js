import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import InstanceLaw from "./InstanceLaw";
import { useEditing } from "../../../context/EditingProvider";
import Lawform from "./Lawform";

export default function Law() {
    const [lawList, setLawList] = useState([]);
    const { isEditing } = useEditing();

    return (
        <div className="flex flex-col ">
            {isEditing && (
                <div className="flex items-center justify-center mt-4">
                    <Link
                        to="/Lawform"
                        className="px-4 py-2 text-lg text-white no-underline bg-green-600 rounded-md cursor-pointer top-3 hover:bg-green-700"
                    >
                        Add Law
                    </Link>
                </div>
            )}
            <div className="flex flex-col w-full h-full ml-5">
                <div className="relative flex flex-col flex-wrap h-full gap-2 px-3 mt-3 text-white">
                    {lawList.length > 0 ? (
                        lawList.map((item) => (
                            <InstanceLaw
                                key={item.id}
                                title={item.title}
                                text={item.text}
                                image={item.image}
                                id={item.id}
                                // onDelete={handleDeleteNotice}
                            />
                        ))
                    ) : (
                        <h1 className="text-4xl font-semibold text-center text-cyan-600">
                            No Law at this moment
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
}
