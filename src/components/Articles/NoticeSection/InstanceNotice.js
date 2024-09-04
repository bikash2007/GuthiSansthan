import { useEffect, useState } from "react";
import { useEditing } from "../../../context/EditingProvider"; // Adjust the path based on your project structure
import { ViewEditButton } from "./ViewEditButton"; // Adjust the path based on your project structure
import { NoticeDescription } from "./NoticeDescription";

export const InstanceNotice = ({ title, text, image, id, date, onDelete, isFirst }) => {
  const { isEditing } = useEditing();

  // Limit the text to the first three words
  const limitedText = title.split(" ").slice(0, 5).join(" ") + (text.split(" ").length > 5 ? "..." : "");
  const [isHidden, setIsHidden] = useState(true);

  const toggleDescription = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div
        onClick={toggleDescription}
        className={`w-full md:w-[1100px] relative p-0 transition-transform duration-300 ease-in-out  hover:scale-[1.08] text-black font-semibold ${
          isEditing ? "cursor-pointer" : ""
        } ${isFirst ? "mt-4" : ""}`}  // Add margin-top only if it's the first component
      >
        <div className="flex flex-col">
          <div className="w-full md:w-[70%] h-[40px] border-2 border-slate-500 rounded-xl md:ms-[80px] bg-gray-300">
            <div className="flex items-center justify-between h-full px-4">
              <h1 className="text-[10px] md:text-[16px] truncate">{limitedText}</h1>
              <h1 className="text-[10px] md:text-[15px]">Date: {date}</h1>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="absolute top-2 right-10">
            <ViewEditButton onDelete={() => onDelete(id)} />
          </div>
        )}
      </div>

      {/* Render NoticeDescription when isHidden is false */}
      {!isHidden && <NoticeDescription img={image} name={title} detail={text} />}
    </>
  );
};
