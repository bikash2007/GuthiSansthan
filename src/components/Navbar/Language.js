import { useMediaQuery } from "@mui/material";
import { useSelectLanguage } from "../../context/LanguageChoice";

export const Language = ({
  name,
  img,
  handleLanguageClick,
  no,
  languageOptionHidden,
}) => {
  const { selectLanguage } = useSelectLanguage();
  const isMobile = useMediaQuery("(max-width:1000px)");

  return (
    <div
      className={`${
        selectLanguage === name ? "hidden" : ""
      } shadow-lg hover:bg-cyan-400/30 cursor-pointer flex items-center justify-center overflow-hidden 
        ${isMobile ? "h-4 px-1" : "h-12 px-4"} 
        transition-all duration-200 ease-linear`}
      onClick={() => handleLanguageClick(name)}
      style={{ right: `${(no / 5) * 100}%` }}
    >
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
};
