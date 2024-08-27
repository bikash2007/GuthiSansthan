import { styled, useMediaQuery } from "@mui/material";
import { useSelectLanguage } from "../../context/LanguageChoice";
import { useTranslation } from "react-i18next";
import nepalLogo from "../../media/nepalLogo.png";
import logo from "../../media/guthi.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HeaderButtom } from "./HeaderButtom";
import { useEffect, useRef, useState } from "react";
import { Language } from "./Language";
import { useSelector, useDispatch } from "react-redux";
import { fetchImageToURL } from "../ReuseableFunctions";
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
  const loc = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef();
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const superUser = sessionStorage.getItem("superUser");

  return (
    <div
      className={`${
        isMobile ? "h-[80px] flex-wrap" : "h-[100px] flex-row px-4 lg:px-10"
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
            url={baseUrl + globalDetail.url}
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

      <div className=" hidden lg:flex flex-col  items-center justify-center text-center">
        <p className="text-white font-semibold text-sm lg:text-base">
          यतो धर्म: स्ततो जय:
        </p>
        <h4 className="text-white font-bold text-lg lg:text-5xl">
          {t("logo")}
        </h4>
      </div>

      {superUser === "true" && (
        <>
          {isEditing ? (
            <div
              className="bg-red-700 hidden lg:flex items-center justify-center py-2 px-3 cursor-pointer rounded-md"
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
          isMobile ? "gap-1 w-[50%]" : "gap-7 "
        } relative flex h-full items-center justify-end`}
      >
        <div
          ref={divRef}
          className="relative flex gap-1 items-center w-full lg:w-auto"
        >
          <select
            value={selectLanguage}
            onChange={handleLanguageChange}
            className="bg-gray-300/30 text-black rounded-md px-2 py-1 cursor-pointer w-full lg:w-auto"
          >
            <option value="nepali">Nepali</option>
            <option value="newari">Newari</option>
            <option value="english">English</option>
            <option value="mithila">Mithila</option>
          </select>
        </div>

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
          <div className="relative text-left text-white" ref={dropdownRef}>
            <FontAwesomeIcon
              icon={faUserCircle}
              size="2x"
              className="text-white hover:text-blue-500 cursor-pointer"
              onClick={toggleDropdown}
            />
            {isOpen && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};
