import { styled, useMediaQuery } from "@mui/material";
import { useSelectLanguage } from "../../context/LanguageChoice";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewGuthiSansthanLogo } from "../../state/GlobalSlice";
import { EditLogoImage } from "../EditComponents";
import { useEditing } from "../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faMinimize,
  faMinus,
  faRightFromBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import axios

export const HeaderTop = () => {
  const globalDetail = useSelector((state) => state.globalDetail);
  const isMobile = useMediaQuery("(max-width:800px)");
  const { isEditing, setIsEditing } = useEditing(false);
  const { selectLanguage, setSelectLanguage } = useSelectLanguage();
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef();
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [blur, setBlur] = useState(14); // Initialize blur state

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    const fetchInitialBlur = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/global-components/6/`);
        const initialBlurValue = response.data.blur.text.value; // Adjust based on your API structure
        console.log(initialBlurValue);
        setBlur(initialBlurValue);
      } catch (error) {
        console.error("Error fetching initial blur value:", error);
      }
    };

    fetchInitialBlur();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [baseUrl]);

  const superUser = sessionStorage.getItem("superUser");

  const handleBlurChange = async (event) => {
    const newBlur = Number(event.target.value);
    setBlur(newBlur);
    await saveBlur(newBlur); // Call saveBlur function
  };

  // Function to save blur to the API
  const saveBlur = async (blurValue) => {
    try {
      await axios.patch(`${baseUrl}api/global-components/6/`, {
        blur: {
          text: { value: blurValue },
        },
      });
    } catch (error) {
      console.error("Error saving blur value:", error);
    }
  };

  return (
    <div
      className={`${
        isMobile ? "py-2 flex-wrap" : "py-3 flex-row px-4 lg:px-10"
      } flex w-full bg-neutral-100/30 lg:bg-neutral-200/10 dark:bg-neutral-100/10 justify-evenly lg:justify-between items-center`}
      style={{ backdropFilter: `blur(${blur}px)` }} // Apply blur effect here
    >
      <Link
        to="/"
        className={`${
          isMobile ? "justify-start items-center" : "flex-row items-center"
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
              className={`${
                isMobile ? "h-[50px]" : "h-[90px]"
              } bg-clip-padding hover:scale-110 hover:shadow-2xl hover:shadow-black transition-all`}
              src={globalDetail["guthi-sansthan-logo"].imgSrc}
              alt="Guthi Sansthan Logo"
            />
          </EditLogoImage>
        </div>
      </Link>
      {isEditing && (
        <div className="flex flex-col font-semibold text-white rounded-xl px-2 py-1 bg-cyan-400/30 backdrop-blur-xl">
          <h6>Blur intensity</h6>
          <div className="flex gap-3 justify-between px-2">
            <FontAwesomeIcon
              className="hover:scale-125 hover:cursor-pointer"
              scale={2}
              icon={faAdd}
              onClick={() => {
                const newBlur = blur + 3;
                setBlur(newBlur);
                saveBlur(newBlur); // Save new blur value
              }}
            />
            <FontAwesomeIcon
              className="hover:scale-125 hover:cursor-pointer"
              scale={2}
              icon={faMinus}
              onClick={() => {
                const newBlur = blur - 3;
                setBlur(newBlur);
                saveBlur(newBlur); // Save new blur value
              }}
            />
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={blur}
            onChange={handleBlurChange}
            className="mt-2 w-full"
            step="1"
          />
          <span className="text-white text-sm">{blur}px</span>
        </div>
      )}

      <Link to={"/"} className="no-underline flex flex-col">
        <span className="text-white hover:text-cyan-500 font-semibold text-xs lg:text-base mb-2">
          यतो धर्म: स्ततो जय:
          <br />
        </span>
        <h4
          className="text-white font-bold text-base lg:text-5xl hover:text-cyan-500"
          style={{ textShadow: "0px 0px 10px rgba(0, 255, 255, 0.8)" }}
        >
          {t("logo")}
        </h4>
      </Link>

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
          isMobile ? "gap-1 w-[50%]" : "gap-7"
        } relative flex h-full items-center justify-end`}
      >
        <div
          ref={divRef}
          className="relative flex gap-1 items-center w-auto lg:w-auto"
        >
          <select
            value={selectLanguage}
            onChange={handleLanguageChange}
            className="bg-gray-300/30 text-black rounded-full px-2 py-1 cursor-pointer w-auto lg:w-auto backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Nepali">Nepali</option>
            <option value="English">English</option>
            {/* <option value="newari">Newari</option> */}
            {/* <option value="mithila">Mithila</option> */}
          </select>
        </div>

        {!token && (
          <Link
            to="/sign-up"
            className={`${
              isMobile ? "text-[12px]" : "px-2 py-1"
            } no-underline bg-gray-300/30 backdrop-blur-sm text-neutral-200 hover:text-white flex items-center justify-center gap-1 rounded-full hover:scale-110 transition-all ease-linear duration-75 cursor-pointer shadow-sm font-light`}
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
              <div className="absolute right-0 mt-2 w-fit bg-zinc-700/30 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg z-40">
                <Link
                  to="/user/profile"
                  className="block px-1 py-2 text-sm text-white no-underline hover:bg-cyan-400/30 hover:text-red-500"
                >
                  Profile
                </Link>
                <Link
                  to="/user/setting"
                  className="block px-1 py-2 text-sm text-white no-underline hover:bg-cyan-400/30 hover:text-red-500"
                >
                  Setting
                </Link>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-1 py-2 text-sm flex items-center gap-2 text-white hover:bg-cyan-400/30 hover:text-red-500"
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
