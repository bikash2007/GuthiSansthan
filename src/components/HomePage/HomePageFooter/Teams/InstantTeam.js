import React from "react";
import "../../../../App.css";
import { useEditing } from "../../../../context/EditingProvider";

const InstantTeam = ({
  firstName,
  lastName,
  position,
  post,
  photo,
  branch,
}) => {
  const { isEditing } = useEditing();
  const fullName = `${firstName?.English || ""} ${lastName?.English || ""}`;
  const displayPosition = position?.English || "";
  const displayPost = post?.English || "";

  return (
    <div className="py-4 flex flex-col w-fit h-fit items-center justify-center border-b border-neutral-400/20">
      <div className="flex justify-center relative w-full lg:w-1/3">
        {photo && (
          <img
            src={photo} // Assuming the photo URL is under the English key
            className="rounded-full w-20 lg:w-32 object-cover emerge"
            alt={`${fullName}'s profile`}
          />
        )}
      </div>
      <div className="flex flex-col relative justify-center items-center lg:items-start text-white mt-4 lg:mt-0 lg:ml-8 text-center lg:text-left">
        <h1 className="text-xl lg:text-3xl font-semibold mt-2">{fullName}</h1>
        <h2 className="text-lg lg:text-2xl font-medium text-gray-300">
          {displayPosition}
        </h2>
        <h3 className="text-md lg:text-lg text-gray-400">{displayPost}</h3>
        {branch && (
          <h4 className="text-md lg:text-lg text-gray-400">Branch: {branch}</h4>
        )}
      </div>
    </div>
  );
};

export default InstantTeam;
