import React, { useEffect, useRef, useState } from "react";

import InstanceAboutUs, { DisplayAboutUs } from "./InstanceAboutUs";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAboutUsPageWholeDetail,
  setBgImg,
  setNewBgImg,
} from "../../state/AboutUsPageSlice";
import { addLanguage } from "../ReuseableFunctions";
import { EditBgImage } from "../EditComponents/EditBgImage";
import { showAlert } from "../AlertLoader";
import { useEditing } from "../../context/EditingProvider";
import { AddAboutUs } from "./AddAboutUs";
import AboutUsInfo from "./AboutUsInfo";
import { useTranslation } from "react-i18next";

export const AboutUs = () => {
  const aboutRef = useRef();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const aboutUsPageDetail = useSelector((state) => state.aboutUsPageDetail);
  const dispatch = useDispatch();
  const { isEditing } = useEditing();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl + aboutUsPageDetail.url);

        dispatch(setAboutUsPageWholeDetail(response.data.components));
        dispatch(
          setBgImg(baseUrl + response.data.components["about-us"].image)
        );
        addLanguage({
          key: "about-us",
          lngs: response.data.components["about-us"].text,
        });
      } catch (error) {
        showAlert(error, "red");
      }
    };

    if (!aboutUsPageDetail.isFetched) fetchData();

    // Scroll to the section after a short delay
    const timeoutId = setTimeout(() => {
      aboutRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [baseUrl, aboutUsPageDetail, dispatch]);
  return (
    <div className="flex flex-col items-center overflow-auto">
      <EditBgImage
        imageId={aboutUsPageDetail["bg-img"].id}
        url={aboutUsPageDetail["bg-img"].imgSrc}
        setNewImage={setNewBgImg}
        isActualUploadedSame={
          aboutUsPageDetail["bg-img"].imgSrc ===
          aboutUsPageDetail["bg-img"].actualImgSrc
        }
      >
        <div
          className="fixed w-full h-screen top-0 -z-10 bg-cover"
          style={{
            backgroundImage: `url(${aboutUsPageDetail["bg-img"].imgSrc})`,
            backgroundPosition: "center",
          }}
        ></div>
      </EditBgImage>
      <h1 className="text-white mt-5">{t("about-us")}</h1>
      <AboutUsInfo />
      {isEditing && <AddAboutUs />}
    </div>
  );
};
