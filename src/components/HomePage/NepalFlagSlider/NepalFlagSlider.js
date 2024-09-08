import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import "./NepalFlagSlider.css";
import { OneImage } from "./OneImage";
import { useDispatch, useSelector } from "react-redux";
import { addLanguage } from "../../ReuseableFunctions";
import { setSliderImg } from "../../../state/HomePageSlices/HomePageSlice";
import { useEditing } from "../../../context/EditingProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { EditText } from "../../EditComponents/TextEditor/EditText"; // Import the EditText component
import image from "../../../media/Jatraform/jatra.png";

export const NepalFlagSlider = ({ content }) => {
  const [isHover, setIsHover] = useState(false);
  const { isEditing } = useEditing();
  const [activateEdit, setActivateEdit] = useState(false);
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const homePageDetail = useSelector((state) => state.homePageDetail);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:1000px)");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0); // Define touchStartX state

  useEffect(() => {
    const fetchData = async () => {
      addLanguage({
        key: "welcome-to-guthi-sansthan",
        lngs: homePageDetail.details["welcome-to-guthi-sansthan"].text,
      });
      dispatch(
        setSliderImg(
          baseUrl + homePageDetail.details["slider-img"].image.substr(1)
        )
      );
    };

    if (!homePageDetail["slider-img"].isFetched && homePageDetail.isFetched)
      fetchData();

    const id = homePageDetail.details["welcome-to-guthi-sansthan"];
    if (!id) console.log("x is undefined or null");
  }, [dispatch, baseUrl, homePageDetail]);

  // Handle hover start
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  // Handle hover end
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // Mobile swipe logic
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const distance = touchStartX - touchEndX;
    const threshold = 5; // Minimum swipe distance to consider a swipe gesture
    if (distance > threshold) {
      setCurrentSlide(1);
    } else if (distance < -threshold) {
      setCurrentSlide(0);
    }
  };

  return (
    <div
      className={`${
        isMobile ? "h-[70vh]" : "h-[70vh]"
      } flex flex-row items-center justify-center  relative w-[100vw]  overflow-hidden`}
      onMouseLeave={handleMouseLeave}
      onTouchStart={isMobile ? handleTouchStart : null}
      onTouchEnd={isMobile ? handleTouchEnd : null}
    >
      {/* Left Side */}
      <div
        className={`${
          isMobile ? "text-[20px] w-[95%]" : "text-[80px] w-[50%]"
        } ${
          activateEdit
            ? "left-[100%]"
            : `${
                isHover || currentSlide === 1
                  ? "left-[-100%] opacity-0"
                  : "left-0 opacity-100"
              }`
        } absolute text-white  font-bold transition-all duration-500 w-full ease-in-out  font-reggaeOne flex flex-col items-center`}
      >
        {homePageDetail.details["welcome-to-guthi-sansthan"] && (
          <EditText
            textId={homePageDetail.details["welcome-to-guthi-sansthan"].id}
            keyName={"welcome-to-guthi-sansthan"}
            styling={
              homePageDetail.details["welcome-to-guthi-sansthan"].styling
            }
          >
            {t("welcome-to-guthi-sansthan")}
          </EditText>
        )}
      </div>

      {/* Right Side */}
      <div
        className={`${
          activateEdit
            ? "left-[20%]"
            : `${
                isHover || currentSlide === 1
                  ? "left-[-100%] opacity-0"
                  : " left-[70%] lg:left-[85%] opacity-100"
              }`
        } ${
          isMobile ? "w-[20vh]" : "w-[30vh]"
        } absolute h-full   flex items-center justify-end transition-all duration-500 ease-in-out`}
        onMouseEnter={handleMouseEnter}
      >
        <div
          className="text-white flex items-center  gap-1 backdrop-blur-xl rounded-xl bg-zinc-800/20 px-3 py-1  absolute top-0 right-11 "
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
        >
          {isMobile ? (
            <h4 className="text-xs mt-1 ">Swipe left</h4>
          ) : (
            <h4 className="text-sm mt-1 ">See more</h4>
          )}
          <FontAwesomeIcon
            icon={faAngleRight}
            className="scale-110"
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
          />
        </div>
      </div>

      {/* Content Slider */}
      {currentSlide === 1 && (
        <div
          className={`${
            isHover || currentSlide === 1 ? "left-[0%]" : "left-[100%]"
          } absolute top-4 left-4 px-3 py-1 flex items-center backdrop-blur-lg rounded-xl`}
        >
          <FontAwesomeIcon
            className="scale-150 z-50   text-white"
            icon={faAngleLeft}
          />
          <h4 className="text-xs mt-2 text-white ">Swipe Right</h4>
        </div>
      )}

      <div
        className={`${
          activateEdit
            ? "left-[25%]"
            : `${isHover || currentSlide === 1 ? "left-[0%]" : "left-[100%]"}`
        } ${
          isMobile ? "w-[100%]" : "w-[70%]"
        } absolute ml-2  lg:ml-56  px-2 py-1  h-fit lg:h-[70%] duration-300 ease-in-out flex flex-wrap overflow-y-auto items-start justify-center rounded-lg`}
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
          className="z-[10] feature-div"
          onClick={(e) => {
            if (isEditing && activateEdit) e.preventDefault();
          }}
        >
          <OneImage name={"Parav-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
          to="/about-us"
          className="z-[10] feature-div"
          onClick={(e) => {
            if (isEditing && activateEdit) e.preventDefault();
          }}
        >
          <OneImage name={"About-us-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
          to="/contact-us"
          className="z-[10] feature-div"
          onClick={(e) => {
            if (isEditing && activateEdit) e.preventDefault();
          }}
        >
          <OneImage name={"Contact-us-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
          to="/articles"
          className="z-[10] feature-div"
          onClick={(e) => {
            if (isEditing && activateEdit) e.preventDefault();
          }}
        >
          <OneImage name={"Article-tab"} activateEdit={activateEdit} />
        </Link>

        {isEditing && activateEdit && (
          <div
            className="absolute flex px-2 py-1 bg-gray-300 rounded-md cursor-pointer top-1 hover:bg-gray-400"
            onClick={() => setActivateEdit(false)}
          >
            No Edit
          </div>
        )}
      </div>
    </div>
  );
};
