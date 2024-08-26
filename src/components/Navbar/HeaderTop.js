import { styled, useMediaQuery } from "@mui/material";
import { useSelectLanguage } from "../../context/LanguageChoice";
import { useTranslation } from "react-i18next";
import nepalLogo from "../../media/nepalLogo.png";
import logo from "../../media/guthi.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HeaderButtom } from "./HeaderButtom";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewGuthiSansthanLogo, setLngLogo } from "../../state/GlobalSlice";
import { EditLogoImage } from "../EditComponents";
import { useEditing } from "../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export const HeaderTop = () => {
  const globalDetail = useSelector((state) => state.globalDetail);
  const isMobile = useMediaQuery("(max-width:800px)");
  const { isEditing, setIsEditing } = useEditing(false);
  const { selectLanguage, setSelectLanguage } = useSelectLanguage();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const superUser = sessionStorage.getItem("superUser");

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    setSelectLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`${
        isMobile ? "h-[80px] flex-wrap" : "h-[100px] flex-row px-10"
      } flex w-full bg-neutral-100/30 lg:bg-neutral-200/10 dark:bg-neutral-100/10 lg:backdrop-blur-lg backdrop-blur-xl justify-between items-center p-2`}
    >
      <Link
        to="/"
        className={`${
          isMobile
            ? "flex-col justify-start items-center w-[50%]"
            : "flex-row w-[30%] items-center"
        } flex h-full`}
        onClick={(e) => {
          isEditing && e.preventDefault();
        }}
      >
        <div className="flex items-center no-underline">
          <EditLogoImage
            imageId={globalDetail["guthi-sansthan-logo"].id}
            url={globalDetail.url}
            setNewImage={setNewGuthiSansthanLogo}
            isActualUploadedSame={
              globalDetail["guthi-sansthan-logo"].imgSrc ===
              globalDetail["guthi-sansthan-logo"].actualImgSrc
            }
          >
            <img
              className={`${isMobile ? "h-[50px]" : "h-[80px]"} rounded-full`}
              src={globalDetail["guthi-sansthan-logo"].imgSrc}
              alt="Guthi Sansthan Logo"
            />
          </EditLogoImage>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center">
        <p className="text-white font-semibold">यतो धर्म स्ततो जय:</p>
        <h4 className="text-white font-bold text-3xl">{t("logo")}</h4>
      </div>
      {superUser === "true" && (
        <>
          {isEditing ? (
            <div
              className="bg-red-700 lg:flex items-center justify-center py-2 px-3 cursor-pointer rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Deactivate Editing
            </div>
          ) : (
            <div
              className="bg-green-700 hidden lg:flex items-center justify-center py-2 px-3 cursor-pointer rounded-md"
              onClick={() => setIsEditing(true)}
            >
              Activate Editing
            </div>
          )}
        </>
      )}

      <div
        className={`${
          isMobile ? "gap-1 w-[50%]" : "gap-7"
        } relative flex h-full items-center justify-start`}
      >
        <select
          value={selectLanguage}
          onChange={handleLanguageChange}
          className="bg-gray-300/70 text-black rounded-md p-2 cursor-pointer"
        >
          <option value="nepali">Nepali</option>
          <option value="newari">Newari</option>
          <option value="english">English</option>
          <option value="mithila">Mithila</option>
        </select>

        {!token && (
          <Link
            to="/sign-up"
            className={`${
              isMobile ? "text-[12px]" : "px-2 py-1"
            } no-underline bg-gray-300/50 backdrop-blur-sm text-white flex items-center justify-center gap-1 rounded-full hover:scale-110 transition-all ease-linear duration-75 cursor-pointer shadow-sm font-bold`}
          >
            {t("sign-up")}
            <FontAwesomeIcon icon={faUserCircle} className="scale-125" />
          </Link>
        )}
        {token && (
          <div className="relative text-left text-white">
            <FontAwesomeIcon
              icon={faUserCircle}
              size="3x"
              className="text-white hover:text-blue-500 cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-zinc-700/30 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg z-10">
              <Link
                to="/user/profile"
                className="block px-4 py-2 text-sm text-white hover:text-red-500"
              >
                Profile
              </Link>
              <Link
                to="/user/setting"
                className="block px-4 py-2 text-sm text-white hover:text-red-500"
              >
                Setting
              </Link>
              <button
                onClick={handleLogOut}
                className="w-full text-left px-4 py-2 text-sm text-white hover:text-red-500"
              >
                Logout <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
