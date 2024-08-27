import React from "react";
import { useSelectLanguage } from "../../context/LanguageChoice";
import { HeaderTop, HeaderButtom } from "./";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

export const HeaderMain = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust the breakpoint as needed
  const isFirstPage =
    location.pathname === "/" ||
    location.pathname === "/log-in" ||
    location.pathname === "/sign-in" ||
    !isMobile;

  const { selectLanguage, setSelectLanguage } = useSelectLanguage();
  const { i18n } = useTranslation();

  return (
    <div className={`top-0 flex flex-col justify-center z-40 relative`}>
      {location.pathname !== "/branche-full-info" && <HeaderTop />}
      {!isFirstPage && <HeaderButtom />}
    </div>
  );
};
