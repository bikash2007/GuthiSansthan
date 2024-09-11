import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { Calendar } from "./Calender/Calender";
import { Service } from "./Service/Service";
import { Teams } from "./Teams/Teams";
import newErrorImage from "../../../media/HomePage/error.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserGear,
  faUsers,
  faClose,
  faCodeBranch,
  faFileCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setFooterBgImg,
  setNewFooterBgImg,
} from "../../../state/HomePageSlices/HomePageSlice";
import { EditBgImage } from "../../EditComponents/EditBgImage";
import { useTranslation } from "react-i18next";
import TempleManagment from "./TempleManagment/TempleManagment";
import { Link } from "react-router-dom";
import Report from "./Report/Report";

export const HomePageFooter = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:800px)");
  const sectionRef = useRef(null);
  const footerRef = useRef(null);
  const homePageDetail = useSelector((state) => state.homePageDetail);
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  useEffect(() => {
    const fetchFooterImg = async () => {
      dispatch(
        setFooterBgImg(baseUrl + homePageDetail.details["footer-bg-img"].image)
      );
    };

    if (
      !homePageDetail["footer-bg-img"].isFetched &&
      homePageDetail.isFetched
    ) {
      fetchFooterImg();
    }
  }, [dispatch, baseUrl, homePageDetail]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target) &&
        footerRef.current &&
        !footerRef.current.contains(event.target)
      ) {
        setSelectedSection("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sectionRef]);

  const sections = [
    { icon: faCalendarAlt, label: "calendar", section: "calender" },
    { icon: faUserGear, label: "service", section: "service" },
    { icon: faUserGear, label: "teams", section: "teams" },
    { icon: faFileCircleExclamation, label: "report", section: "report" },
  ];

  return (
    <>
      <div
        ref={footerRef}
        className="fixed bottom-0 h-[200px] w-full flex items-center overflow-hidden bg-gray-800"
      >
        <EditBgImage
          imageId={homePageDetail["footer-bg-img"].id}
          url={homePageDetail["footer-bg-img"].imgSrc}
          setNewImage={setNewFooterBgImg}
          isActualUploadedSame={
            homePageDetail["footer-bg-img"].imgSrc ===
            homePageDetail["footer-bg-img"].actualImgSrc
          }
        >
          <div
            className="fixed bottom-0 -z-20 bg-cover bg-center h-[200px] w-full opacity-70"
            style={{
              backgroundImage: `url(${homePageDetail["footer-bg-img"].imgSrc})`,
            }}
          ></div>
        </EditBgImage>
        <div
          className={`${
            isMobile
              ? "bg-gray-300/40 backdrop-blur-md rounded-tl-md rounded-tr-md"
              : "bg-gray-800"
          } z-10 absolute bottom-0 w-full flex justify-evenly items-center text-white font-bold`}
        >
          <Link
            to="/branches"
            className={`${
              isMobile ? "px-3" : "px-16"
            } home-footer-div flex flex-col items-center justify-center text-white no-underline hover:scale-110 hover:text-cyan-300 transition-transform duration-75 ease-in-out`}
          >
            <FontAwesomeIcon
              icon={faCodeBranch}
              size="2x"
              className="scale-50 lg:scale-105"
            />
            <h2 className="text-sm lg:text-base font-medium font-Kalam">
              {t("branches")}
            </h2>
          </Link>
          {sections.map(({ icon, label, section }) => (
            <div
              key={section}
              className={`${
                isMobile ? "px-3" : "px-16"
              } home-footer-div flex flex-col items-center justify-center text-white hover:scale-110 hover:text-cyan-300 transition-transform duration-75 ease-in-out`}
              onClick={() => setSelectedSection(section)}
            >
              <FontAwesomeIcon
                icon={icon}
                size="2x"
                className="scale-50 lg:scale-105"
              />
              <h2 className="text-sm lg:text-base  font-abc">{t(label)}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full" ref={sectionRef}>
        {[
          { component: Calendar, section: "calender" },
          { component: Service, section: "service" },
          { component: TempleManagment, section: "templemanagment" },
          { component: Teams, section: "teams" },
          { component: Report, section: "report" },
        ].map(({ component: Component, section }) => (
          <div
            key={section}
            className={`${
              selectedSection === section ? "bottom-0" : "bottom-[-300%]"
            } absolute backdrop-blur-lg w-full pt-4 h-[100vh] bg-red-500 transition-all ease-in-out duration-500 rounded-xl z-40`}
          >
            <FontAwesomeIcon
              icon={faClose}
              size={"2x"}
              className="cursor-pointer absolute top-5 right-3 text-red-600 z-50"
              onClick={() => setSelectedSection("")}
            />
            {selectedSection === section && <Component />}
          </div>
        ))}
      </div>
    </>
  );
};
