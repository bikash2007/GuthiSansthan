import { useEffect, useState } from "react";
import { useEditing } from "../../../context/EditingProvider";
import { ViewEditButton } from "./ViewEditButton";
import { NoticeDescription } from "./NoticeDescription";
import { format } from "date-fns"; // Import the format function

export const InstanceNotice = ({
  title,
  text,
  image,
  id,
  date,
  onDelete,
  isFirst,
}) => {
  const { isEditing } = useEditing();

  // Format the date using date-fns
  const formattedDate = format(new Date(date), "MMMM d, yyyy h:mm a");

  // Limit the text to the first three words
  const limitedText =
    title.split(" ").slice(0, 5).join(" ") +
    (text.split(" ").length > 5 ? "..." : "");
  const [isHidden, setIsHidden] = useState(true);

  const toggleDescription = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div
        onClick={toggleDescription}
        className={`w-full md:w-[1100px] relative p-4 transition-transform duration-300 ease-in-out hover:scale-[1.03] text-black ${
          isEditing ? "cursor-pointer" : ""
        } ${isFirst ? "mt-4" : ""} rounded-xl  `}
      >
        <div className="flex flex-col">
          <div className="w-full h-[60px] rounded-xl bg-white/30 shadow-md backdrop-blur-xl p-2">
            <div className="flex items-center justify-between h-full px-4">
              <h1 className="text-lg md:text-xl font-semibold text-white truncate">
                {limitedText}
              </h1>
              <h1 className="text-sm md:text-md text-white">{formattedDate}</h1>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="absolute top-2 right-2">
            <ViewEditButton onDelete={() => onDelete(id)} />
          </div>
        )}
      </div>

      {/* Render NoticeDescription when isHidden is false */}
      {!isHidden && (
        <NoticeDescription img={image} name={title} detail={text} />
      )}
    </>
  );
};
