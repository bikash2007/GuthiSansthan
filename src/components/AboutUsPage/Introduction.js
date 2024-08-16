import { useTranslation } from "react-i18next";
import img from "../../media/AboutUsPage/Pashupatinath_temple,kathmandu,Nepal.jpg";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { CommonFirstSection } from "./CommonFirstSection";
import axios from "axios";
export const Introduction = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:800px)");
  const [dec, setDec] = useState("");
  // useEffect(async () => {
  //   try {
  //     const data = await axios.get("https://ingnepal.org.np/api/");
  //   } catch {}
  // }, []);
  return (
    <CommonFirstSection
      img={img}
      topic={t("introduction")}
      visibleDesc={t("intro")}
      HiddenDiv={HiddenDiv}
    />
  );
};
const HiddenDiv = () => {
  return <>This is hidden introduction</>;
};
