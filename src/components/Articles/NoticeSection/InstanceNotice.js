import { useState } from "react";
import { Link } from "react-router-dom";
import { ViewEditButton } from "./ViewEditButton";
import { useEditing } from "../../../context/EditingProvider";

export const InstanceNotice = ({ title, text, image }) => {
  const [data] = useState("notice section");
  const { isEditing } = useEditing();

  return (
    <div
      className={`relative p-3 w-full  bg-gray-900 rounded-lg shadow-lg ${
        isEditing ? "ml-16" : ""
      } mb-2 hover:shadow-xl transition-shadow duration-300 ease-in-out`}
    >
      <div className="flex w-full flex-col-reverse md:flex-row items-center md:items-start justify-start gap-3">
        <img
          src={image}
          className="lg:w-3/5 md:w-1/2 w-[90%] aspect-auto object-cover rounded-lg border-2 border-gray-700 shadow-sm"
        />
        <div className="flex flex-col justify-between flex-1">
          <h3 className="font-bold text-white text-2xl">{title}</h3>
          <p className="text-gray-400 text-sm mt-2">{text}</p>
        </div>
      </div>
      {isEditing && (
        <div className="absolute top-2 right-2">
          <ViewEditButton />
        </div>
      )}
      <Link
        to="/show-notice"
        state={{ data }}
        className="absolute inset-0 z-10"
      />
    </div>
  );
};
