import React from "react";
import { useEditing } from "../../../../context/EditingProvider";
import { useSelectLanguage } from "../../../../context/LanguageChoice";

const InstantTeam = ({ teamMember, onEdit, onRemove }) => {
  const { isEditing } = useEditing();
  const { selectLanguage } = useSelectLanguage(); // Move this line inside the component

  // Helper function to get the text in the selected language or fallback to an empty string
  const getText = (textObj) =>
    textObj && textObj[selectLanguage] ? textObj[selectLanguage] : "";

  // Extract the text in the selected language or fallback to an empty string if undefined
  const fullName = `${getText(teamMember.first_name)} ${getText(
    teamMember.last_name
  )}`;
  const displayPosition = getText(teamMember.position);
  const displayPost = getText(teamMember.post);
  const displayBranch = getText(teamMember.branch);

  return (
    <div className="py-4 flex flex-col w-full lg:w-fit h-fit items-center justify-center ">
      {/* <div className="flex justify-center rounded-full relative w-full lg:w-1/3"></div> */}
      <div className="flex  flex-col relative w-full  items-center lg:items-start text-white mt-4 lg:mt-0 lg:ml-8 text-center lg:text-left">
        <div className="w-full flex items-center flex-col">
          {teamMember.photo && (
            <img
              src={teamMember.photo} // Assuming the photo URL is provided directly
              className="w-56 rounded-full hover:scale-[2] lg:w-[100px]"
              alt={`${fullName}'s profile`}
            />
          )}
          <h2 className="text-lg lg:text-2xl mt-2 font-medium text-gray-300">
            {displayPosition}
          </h2>
          <h1 className="text-xl lg:text-xl font-semibold mt-2">{fullName}</h1>
          <h3 className="text-md lg:text-lg text-gray-400">{displayPost}</h3>
          {displayBranch && (
            <h4 className="text-md lg:text-lg text-gray-400">
              {displayBranch}
            </h4>
          )}
        </div>
        {isEditing && (
          <div className="mt-2 flex space-x-2">
            <button
              onClick={onEdit}
              className="py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Edit
            </button>
            <button
              onClick={onRemove}
              className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-500"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstantTeam;
