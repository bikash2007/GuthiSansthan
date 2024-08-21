import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { Calendar } from "./Calender/Calender";
import { Service } from "./Service/Service";
import { Teams } from "./Teams/Teams";
import newErrorImage from "../../../media/HomePage/error.png"; // Updated import

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserGear,
  faUsers,
  faClose,
  faCodeBranch,
  faBug,
  faExclamation,
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
  const hiddenDivRef = useRef();
  const homePageDetail = useSelector((state) => state.homePageDetail);
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const token = sessionStorage.getItem("token");

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

  const sections = [
    { icon: faCalendarAlt, label: "calendar", section: "calender" },
    { icon: faUserGear, label: "service", section: "service" },
    { icon: faUsers, label: "teams", section: "teams" },
    { icon: faFileCircleExclamation, label: "report", section: "report" },
  ];

  return (
    <>
      <div className="fixed bottom-0 h-[200px] w-full justify-center flex items-center overflow-hidden">
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
              : ""
          } z-10 absolute bottom-0 w-full justify-evenly items-center flex flex-row text-white font-bold`}
        >
          <Link
            to="/branches"
            className={`${
              isMobile ? "px-3" : "px-16"
            } home-footer-div text-white no-underline flex flex-col items-center justify-center hover:scale-150 hover:text-cyan-300 transition-transform duration-75 ease-in hover:-translate-y-3`}
          >
            <>
              <FontAwesomeIcon
                icon={faCodeBranch}
                size="2x"
                className="scale-50 lg:scale-105"
              />
              <h2 className="text-sm lg:text-base">{t("branches")}</h2>
            </>
          </Link>
          {sections.map(({ icon, label, section, image }) => (
            <div
              key={section}
              className={`${
                isMobile ? "px-3" : "px-16"
              } home-footer-div flex flex-col items-center  justify-center hover:scale-150 hover:text-cyan-300 transition-transform duration-75 ease-in hover:-translate-y-3`}
              onClick={() => setSelectedSection(section)}
            >
              <FontAwesomeIcon
                icon={icon}
                size="2x"
                className="scale-50 lg:scale-105"
              />

              <h2 className="text-sm lg:text-base">{t(label)}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full" ref={hiddenDivRef}>
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
            } absolute backdrop-blur-lg w-full h-[80vh] transition-all overflow-auto ease-in-out duration-500 rounded-xl z-20`}
          >
            <FontAwesomeIcon
              icon={faClose}
              size={"2x"}
              className="cursor-pointer scale-50 lg:scale-100 absolute top-0 right-3 text-red-600 z-50"
              onClick={() => setSelectedSection("")}
            />
            {selectedSection === section && <Component />}
          </div>
        ))}
      </div>
    </>
  );
};
