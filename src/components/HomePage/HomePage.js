import React, { useEffect, useState } from "react";
import { Input, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NepalFlagSlider } from "./NepalFlagSlider/NepalFlagSlider";
import { Link } from "react-router-dom";
import { HomePageFooter } from "./HomePageFooter/HomePageFooter";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../AlertLoader";
import {
  addLanguage,
  fetchBgVideoToUrl,
  fetchImageToURL,
} from "../ReuseableFunctions";
import {
  setBgVideo,
  setHomePageWholeDetail,
  setNewBgVideo,
} from "../../state/HomePageSlices/HomePageSlice";
import { EditBgHome } from "../EditComponents/EditBgHome";
import { useEditing } from "../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";

export const HomePage = () => {
  const { i18n, t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:800px)");
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const homePageDetail = useSelector((state) => state.homePageDetail);
  const dispatch = useDispatch();
  const { isEditing } = useEditing();
  const [notices, setNotices] = useState([]);
  const [creditName, setCreditName] = useState();
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/notices/get-latest/`);

      setNotices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHomeData = async () => {
    try {
      const response = await axios.get(baseUrl + homePageDetail.url);
      const data = response.data.components;

      dispatch(setHomePageWholeDetail(data));
      if (
        data["welcome-to-guthi-sansthan"] &&
        data["welcome-to-guthi-sansthan"].text
      ) {
        addLanguage({
          key: "welcome-to-guthi-sansthan",
          lngs: data["welcome-to-guthi-sansthan"].text,
        });
      }

      if (data["bg-video"]["component_type"] === "image") {
        dispatch(
          setBgVideo({
            url: baseUrl + data["bg-video"].image.substr(1),
            isVideo: false,
            isImage: true,
            actualFile: null,
          })
        );
      } else {
        dispatch(
          setBgVideo({
            url: baseUrl + data["bg-video"].video.substr(1),
            isVideo: true,
            isImage: false,
            actualFile: null,
          })
        );
      }
    } catch (error) {
      showAlert(error, "red");
    }
  };

  useEffect(() => {
    if (!homePageDetail.isFetched) {
      fetchHomeData();
    }
  }, [baseUrl, dispatch, homePageDetail.isFetched]);

  useEffect(() => {
    fetchNotices();
    fetchCredit();
  }, []);
  const fetchCredit = async () => {
    try {
      const response = await axios.get(`${baseUrl}api/components/40/`);
      console.log("credit", response.data.text.Name);
      setCreditName(response.data.text.Name);
    } catch (error) {
      console.log("hello");
    }
  };
  return (
    <div
      style={{
        height: `${isMobile ? "calc(100vh - 80px)" : "calc(100vh - 100px)"}`,
      }}
    >
      <div
        style={{ height: `${isEditing ? "calc(100vh - 100px)" : "100%"}` }}
        className="flex flex-col items-center justify-start h-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 -z-10"></div>
        <Link to={"/articles"} className="relative z-30 w-full">
          <h3 className="absolute left-0 top-0 bg-[#00ADEF] backdrop-blur-3xl text-white py-1 font-semibold text-base flex justify-center items-center h-[40px] px-2  z-40">
            {t("notice")}
          </h3>
          <div className="absolute left-[60px] top-0 bg-[#00ADEF] backdrop-blur-3xl text-white font-semibold text-base flex justify-center items-center h-[40px] px-1  z-30"></div>
        </Link>
        <div className="w-full h-[40px] bg-cyan-700/60 flex items-center  backdrop-blur-xl relative overflow-hidden">
          <div className="w-full scrolling-text  items-center  absolute right-0 flex flex-row gap-6   py-2 text-white font-semibold">
            {notices.map((item) => (
              <a
                href={`${item.image}`}
                className="font-semibold no-underline hover:text-cyan-500 hover:underline text-white text-xl"
                target="_main"
                key={item.id}
              >
                <p className="font-thin mt-3">{item.title}</p>
              </a>
            ))}
          </div>
        </div>
        {isEditing && (
          <Link
            to={"/super-user/add-notices"}
            className="absolute top-10 left-2 h-6 w-6 flex justify-center items-center z-30 bg-white rounded-full"
          >
            <FontAwesomeIcon icon={faAdd} />
          </Link>
        )}

        <div
          style={{ height: `${isEditing ? "calc(100vh - 100px)" : "100%"}` }}
          className="w-full flex flex-col items-start justify-start h-screen relative overflow-hidden"
        >
          <EditBgHome
            fetchHomeData={fetchHomeData}
            imageId={homePageDetail["bg-video"].id}
            url={homePageDetail["bg-video"].video}
            setNewImage={setNewBgVideo}
            isActualUploadedSame={
              homePageDetail["bg-video"].video ===
              homePageDetail["bg-video"].actualVideo
            }
          >
            {homePageDetail["bg-video"].isImage && (
              <div
                className="bg-cover bg-center fixed -z-10 w-full h-screen top-0"
                style={{
                  backgroundImage: `url(${homePageDetail["bg-video"].url})`,
                }}
              ></div>
            )}
            {homePageDetail["bg-video"].isVideo && (
              <>
                <video
                  key={homePageDetail["bg-video"].id}
                  autoPlay
                  loop
                  muted
                  className="top-0 video-background fixed inset-0 w-full h-screen object-cover -z-30"
                >
                  <source
                    src={homePageDetail["bg-video"].url}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </>
            )}
          </EditBgHome>

          <NepalFlagSlider />
          <div className="absolute right-4 bottom-32 z-20">
            <div className="relative h-8 w-36 text-center rounded-lg backdrop-blur-3xl bg-gray-100/20 border border-gray-300/40 shadow-lg px-4 transition-all duration-300 ease-in-out focus-within:w-96">
              <input
                type="search"
                placeholder="Search"
                className="w-full h-full text-white placeholder-gray-400 bg-transparent outline-none"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white placeholder:text-white"
              />
            </div>
          </div>

          {creditName && (
            <h4 className="text-white text-base font-semibold absolute bottom-44 left-3">
              Photo by {creditName}
            </h4>
          )}
          <HomePageFooter />
        </div>
      </div>
    </div>
  );
};
