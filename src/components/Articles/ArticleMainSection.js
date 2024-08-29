import React from 'react';


import { Articles } from "./ArticleSection/Articles";
import { Notices } from "./NoticeSection/Notices";
import { useEffect, useState,useRef } from "react";
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
import { Link } from "react-router-dom";
import Law from "./Law/Law";
import Download from "./Download/Download";
import Budget from "./Budget/Budget";
import Temple from"./Other Temple/Temple";
import Land from "./Land and property/Land"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

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

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);








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
        style={{ background: 'linear-gradient(135deg, #001f3f,#00ffff)' }}
        className="flex items-center justify-between w-full px-16 py-4 shadow-sm"
      >
        {/* Hamburger Icon */}
        <div className="block lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden w-full gap-8 lg:flex">
          {['article', 'notice', 'law', 'budget', 'download', 'land', 'temple'].map((sectionType) => (
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
              {sectionType === "temple" && "अन्य देवस्वका दरहरू"}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute z-10 top-16 right-0 w-full bg-gradient-to-r from-[#001f3f] to-[#00ffff] shadow-lg`}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute text-white top-4 right-4"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            {['article', 'notice', 'law', 'budget', 'download', 'land', 'temple'].map((sectionType) => (
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
                {sectionType === "temple" && "अन्य देवस्वका दरहरू"}
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
      </div>
    </div>

      </div>
    </>
  );
};
