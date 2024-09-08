import React from "react";
import { Articles } from "./ArticleSection/Articles";
import { Notices } from "./NoticeSection/Notices";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setArticlePageWholeDetail,
  setBgImg,
  setNewBgImg,
} from "../../state/ArticleNoticeSlices/ArticlePageSlice";
import { addLanguage, fetchImageToURL } from "../ReuseableFunctions";
import { EditBgImage } from "../EditComponents/EditBgImage";
import { showAlert } from "../AlertLoader";
import { useEditing } from "../../context/EditingProvider";
import Law from "./Law/Law";
import Download from "./Download/Download";
import Budget from "./Budget/Budget";
import Temple from "./Other Temple/Temple";
import Land from "./Land and property/Land";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Gallary from "./Gallary/Gallary";
import Darbandi from "./Darbandi/Darbandi";

export const ArticleMainSection = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [isArticle, setArtical] = useState(true);
  const articlePageDetail = useSelector((state) => state.articlePageDetail);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const dispatch = useDispatch();
  const { isEditing, setIsEditing } = useEditing();
  const [section, setSection] = useState("notice");

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl + articlePageDetail.url);
          dispatch(setArticlePageWholeDetail(response.data.components));
          dispatch(
            setBgImg(baseUrl + response.data.components["bg-img"].image)
          );
          addLanguage({
            key: "article-page-heading",
            lngs: response.data.components["bg-img"].text,
          });
        } catch (error) {
          console.log(error);
          showAlert(error, "red");
        }
      };
      if (!articlePageDetail.isFetched) fetchData();
    } catch (error) {
      console.log(error);
      showAlert(error, "red");
    }
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const superUser = sessionStorage.getItem("superUser");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSectionChange = (sectionType) => {
    setSection(sectionType);
    setIsMobileMenuOpen(false); // Close menu when section changes
  };

  const getSectionName = () => {
    switch (section) {
      case "article":
        return "लेख";
      case "notice":
        return "सूचना";
      case "law":
        return "ऐन कानून";
      case "budget":
        return "बार्षिक बजेट";
      case "download":
        return "डाउनलोड";
      case "land":
        return "कूत तथा मालपोतको दर";
      case "temple":
        return "परिपत्रहरू";
      case "gallary":
        return "मिडिया ग्यालरी";
      case "darbandi":
        return "दरबन्दी";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={`${isEditing ? "flex flex-col gap-3 px-2 " : ""}`}>
        <EditBgImage
          imageId={articlePageDetail["bg-img"].id}
          url={articlePageDetail["bg-img"].imgSrc}
          setNewImage={setNewBgImg}
          isActualUploadedSame={
            articlePageDetail["bg-img"].imgSrc ===
            articlePageDetail["bg-img"].actualImgSrc
          }
        >
          <div
            className="fixed top-0 left-0 w-full h-screen bg-center bg-cover -z-50"
            style={{
              backgroundImage: `url(${articlePageDetail["bg-img"].imgSrc})`,
            }}
          ></div>
        </EditBgImage>

        <div className="w-full">
          <div
            style={{ background: "linear-gradient(135deg, #001f3f,#00ffff)" }}
            className="flex items-start justify-start w-full px-3 py-4 shadow-sm"
          >
            {/* Font Awesome Bar Icon */}
            <div className="flex items-start ">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mr-4 text-white lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <FontAwesomeIcon icon={faClose} className="w-6 h-6" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="w-6 h-6 ms-0" />
                )}
              </button>
            </div>

            {/* Section Name for Mobile Only */}
            <div className="flex-1 text-xl font-bold text-center text-white lg:hidden">
              {getSectionName()}
            </div>

            {/* Desktop Menu */}
            <div className="hidden w-full gap-8 lg:flex">
              {[
                "article",
                "notice",
                "law",
                "budget",
                "download",
                "land",
                "temple",
                "gallary",
                "darbandi",
              ].map((sectionType) => (
                <button
                  key={sectionType}
                  onClick={() => setSection(sectionType)}
                  className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                    section === sectionType ? "border-red-600" : "border-none"
                  }`}
                >
                  {sectionType === "article" && "लेख"}
                  {sectionType === "notice" && "सूचना"}
                  {sectionType === "law" && "ऐन कानून"}
                  {sectionType === "budget" && "बार्षिक बजेट"}
                  {sectionType === "download" && "डाउनलोड"}
                  {sectionType === "land" && "कूत तथा मालपोतको दर"}
                  {sectionType === "temple" && "परिपत्रहरू"}
                  {sectionType === "gallary" && "मिडिया ग्यालरी"}
                  {superUser === "true" &&
                    sectionType === "darbandi" &&
                    "पदहरू"}
                </button>
              ))}
            </div>

            {/* Mobile Menu */}
            <div
              ref={mobileMenuRef}
              className={`lg:hidden ${
                isMobileMenuOpen ? "block" : "hidden"
              } absolute z-10 top-16 right-0 w-full bg-gradient-to-r from-[#001f3f] to-[#00ffff] shadow-lg`}
            >
              <div className="flex flex-col items-center py-4 space-y-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute text-white top-4 right-4"
                >
                  <FontAwesomeIcon icon={faClose} className="w-6 h-6" />
                </button>
                {[
                  "article",
                  "notice",
                  "law",
                  "budget",
                  "download",
                  "land",
                  "temple",
                  "gallary",
                  "darbandi",
                ].map((sectionType) => (
                  <button
                    key={sectionType}
                    onClick={() => handleSectionChange(sectionType)}
                    className={`font-bold border-b-2 hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                      section === sectionType ? "border-red-600" : "border-none"
                    }`}
                  >
                    {sectionType === "article" && "लेख"}
                    {sectionType === "notice" && "सूचना"}
                    {sectionType === "law" && "ऐन कानून"}
                    {sectionType === "budget" && "बार्षिक बजेट"}
                    {sectionType === "download" && "डाउनलोड"}
                    {sectionType === "land" && "कूत तथा मालपोतको दर"}
                    {sectionType === "temple" && "परिपत्रहरू"}
                    {sectionType === "gallary" && "मिडिया ग्यालरी"}
                    {sectionType === "darbandi" && " दरबन्दी"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            {section === "article" && <Articles />}
            {section === "notice" && <Notices />}
            {section === "law" && <Law />}
            {section === "budget" && <Budget />}
            {section === "download" && <Download />}
            {section === "temple" && <Temple />}
            {section === "land" && <Land />}
            {section === "gallary" && <Gallary />}
            {section === "darbandi" && <Darbandi />}
          </div>
        </div>
      </div>
    </>
  );
};
