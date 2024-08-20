import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import "./NepalFlagSlider.css";
import { OneImage } from "./OneImage";
import { useDispatch, useSelector } from "react-redux";
import { addLanguage, fetchGifToURL } from "../../ReuseableFunctions";
import {
  setNewSliderImg,
  setSliderImg,
} from "../../../state/HomePageSlices/HomePageSlice";
import { useEditing } from "../../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { EditText } from "../../EditComponents/TextEditor/EditText"; // Import the missing EditText component

export const NepalFlagSlider = ({ content }) => {
  const [isHover, setIsHover] = useState(false);
  const { isEditing } = useEditing();
  const [activateEdit, setActivateEdit] = useState(false);
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const homePageDetail = useSelector((state) => state.homePageDetail);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:1000px)");
  const [x, setX] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null); // Define touchStartX state
  
  useEffect(() => {
    const fetchData = async () => {
      addLanguage({
        key: "welcome-to-guthi-sansthan",
        lngs: homePageDetail["details"]["welcome-to-guthi-sansthan"]["text"],
      });
      dispatch(
        setSliderImg(
          baseUrl + homePageDetail["details"]["slider-img"].image.substr(1)
        )
      );
    };
    if (!homePageDetail["slider-img"].isFetched && homePageDetail.isFetched)
      fetchData();
    const id = homePageDetail["details"]["welcome-to-guthi-sansthan"];
    if (id) {
      setX(id);
    } else {
      console.log("x is undefined or null");
    }
  }, [dispatch, baseUrl, homePageDetail]);

  // Mobile swipe logic
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      // Swiped left
      setCurrentSlide(1);
    } else if (touchEndX - touchStartX > 50) {
      // Swiped right
      setCurrentSlide(0);
    }
  };

  return (
    <div
      className={`${
        isMobile ? "h-[70vh]" : "h-[70vh]"
      } flex flex-row items-center relative w-[100vw] m-2 overflow-hidden`}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={isMobile ? handleTouchStart : null}
      onTouchEnd={isMobile ? handleTouchEnd : null}
    >
      {/* Left Side */}
      <div
        className={`${
          isMobile ? "text-[30px] w-[50%]" : "text-[80px] p-[10%] w-[60%]"
        } ${
          activateEdit
            ? "left-[100%]"
            : `${isHover || currentSlide === 1 ? "left-[-100%] opacity-0 " : ""}`
        } absolute left-0 text-white font-bold transition-left duration-500 font-reggaeOne`}
        onMouseEnter={() => !isMobile && setIsHover(true)}
      >
        {x && (
          <EditText
            textId={x.id}
            keyName={"welcome-to-guthi-sansthan"}
            styling={x.styling}
          >
            {t("welcome-to-guthi-sansthan")}
          </EditText>
        )}
      </div>

      {/* Right Side */}
      <div
        className={`${
          activateEdit
            ? "left-[10%]"
            : `${
                isHover || currentSlide === 1
                  ? `${isMobile ? "left-[-100%]" : "left-[10%]"}`
                  : "left-[60%]"
              }`
        } ${isMobile ? "w-[20vh]" : "w-[30vh]"} absolute h-full flex items-center transition-all duration-300 ease-in-out`}
        onMouseEnter={() => !isMobile && setIsHover(true)}
      >
        <FontAwesomeIcon
          className="text-white h-14 lg:h-20 touchme"
          icon={faArrowAltCircleRight}
        />
      </div>

      {/* Content Slider */}
      <div
        className={`${
          activateEdit
            ? "left-[25%]"
            : `${
                isHover || currentSlide === 1
                  ? `${isMobile ? "left-[0%]" : "left-[25%]"}`
                  : "left-[100%]"
              }`
        } ${isMobile ? "w-[100%]" : "w-[100%]"} px-2 py-3 absolute ${
          isEditing ? "" : ""
        } transition-all bg-red-500/10 mt-5 h-[60%] duration-300 ease-in-out flex flex-wrap backdrop-blur-sm overflow-auto items-start justify-center gap-5 lg:gap-5 rounded-lg`}
      >
        {/* Editing Controls */}
        {isEditing && !activateEdit && (
          <div
            onClick={() => setActivateEdit(true)}
            className="absolute z-50 flex px-2 py-1 bg-gray-300 rounded-md cursor-pointer top-1 hover:bg-gray-400"
          >
            Edit
          </div>
        )}
        <Link
          to="/jatra-parva"
          className="z-50 feature-div"
          onClick={(e) => {
            isEditing && activateEdit && e.preventDefault();
          }}
        >


          <OneImage name={"Parav-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
          to="/about-us"
          className="z-50 feature-div"
          onClick={(e) => {
            isEditing && activateEdit && e.preventDefault();
          }}
        >
          <OneImage name={"About-us-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
          to="/contact-us"
          className="z-50 feature-div"
          onClick={(e) => {
            isEditing && activateEdit && e.preventDefault();
          }}
        >
          <OneImage name={"Contact-us-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
          to="/articles"
          className="z-50 feature-div"
          onClick={(e) => {
            isEditing && activateEdit && e.preventDefault();
          }}
        >
          <OneImage name={"Article-tab"} activateEdit={activateEdit} />
        </Link>
        {isEditing && activateEdit && (
          <div
            className="absolute flex px-2 py-1 bg-gray-300 rounded-md cursor-pointer top-1 hover:bg-gray-400"
            onClick={() => setActivateEdit(false)}
          >
            <div className="flex px-2 py-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400">
              No Edit
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
