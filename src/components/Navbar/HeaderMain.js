import React from "react";
import { useSelectLanguage } from "../../context/LanguageChoice";
import { HeaderTop, HeaderButtom } from "./";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

export const HeaderMain = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust the breakpoint as needed

  // Determine whether to show HeaderTop and HeaderBottom based on the current path
  const shouldShowHeaderTop = location.pathname !== "/branche-full-info";
  const shouldShowHeaderBottom = location.pathname !== "/";

  const { selectLanguage, setSelectLanguage } = useSelectLanguage();
  const { i18n } = useTranslation();

  return (
    <div className={`top-0 flex flex-col justify-center z-40 relative`}>
      {shouldShowHeaderTop && <HeaderTop />}
      {shouldShowHeaderBottom && <HeaderButtom />}
    </div>
  );
};
