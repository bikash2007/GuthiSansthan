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
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { EditText } from "../../EditComponents/TextEditor/EditText";

export const NepalFlagSlider = ({ content }) => {
  const [isHover, setIsHover] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);
  const { isEditing } = useEditing();
  const [activateEdit, setActivateEdit] = useState(false);
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const homePageDetail = useSelector((state) => state.homePageDetail);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:1000px)");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [x, setX] = useState(null);

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

  // Handle hover start
  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setIsHover(true);
    }, 500); // 1 seconds delay
    setHoverTimer(timer);
  };

  // Handle hover end
  const handleMouseLeave = () => {
    clearTimeout(hoverTimer); // Clear the timer if the user stops hovering
    setIsHover(false);
  };

  // Mobile swipe logic
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].screenX);
    const distance = touchStartX - touchEndX;
    const threshold = 50; // Minimum swipe distance to consider a swipe gesture
    if (distance > threshold) {
      setCurrentSlide((prev) => Math.min(prev + 1, 1)); // Change 1 to the number of slides
    } else if (distance < -threshold) {
      setCurrentSlide((prev) => Math.max(prev - 1, 0)); // Change 0 to the minimum slide index
    }
  };

  // Handle slide change when arrow is clicked
  const handleSlideChange = () => {
    setCurrentSlide((prev) => (prev + 1) % 2); // Assuming there are 2 slides (0 and 1)
  };

  return (
    <div
    className={`${
        isMobile ? "h-[70vh]" : "h-[70vh]"
    } flex flex-row items-center relative w-[100vw] m-2 overflow-hidden`}
    onMouseLeave={handleMouseLeave}
    onTouchStart={isMobile ? handleTouchStart : null}
    onTouchEnd={isMobile ? handleTouchEnd : null}
>
    {/* Left Side */}
    <div
        className={`${
            isMobile ? "text-[30px] w-[40%]" : "text-[80px] w-[50%]"
        } ${
            activateEdit
                ? "left-[100%]"
                : `${isHover || currentSlide === 1 ? "left-[-100%] opacity-0 " : ""}`
        } absolute left-0 text-white font-bold transition-left duration-500 font-reggaeOne flex flex-col items-center jus`}
        onMouseEnter={handleMouseEnter}
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
                        ? `${isMobile ? "left-[-100%]" : "left-[5%]"}`
                        : "left-[50%]"
                }`
        } ${isMobile ? "w-[20vh]" : "w-[25vh]"} absolute h-full flex items-center justify-end transition-all duration-300 ease-in-out`}
        onMouseEnter={handleMouseEnter}
    >
        <FontAwesomeIcon
            className="text-white h-14 lg:h-20"
            icon={faArrowAltCircleRight}
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
        />
    </div>

    {/* Content Slider */}
    <div
        className={`${
            activateEdit
                ? "left-[25%]"
                : `${
                    isHover || currentSlide === 1
                        ? `${isMobile ? "left-[0%]" : "left-[20%]"}`
                        : "left-[100%]"
                }`
        } ${isMobile ? "w-[100%]" : "w-[70%]"} absolute px-2 py-3 bg-red-500/10 mt-5 h-[60%] duration-300 ease-in-out flex flex-wrap backdrop-blur-sm overflow-auto items-start justify-center rounded-lg flex-container`}
    >
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
                if (isEditing && activateEdit) e.preventDefault();
            }}
        >
            <OneImage name={"Parav-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
            to="/about-us"
            className="z-50 feature-div"
            onClick={(e) => {
                if (isEditing && activateEdit) e.preventDefault();
            }}
        >
            <OneImage name={"About-us-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
            to="/contact-us"
            className="z-50 feature-div"
            onClick={(e) => {
                if (isEditing && activateEdit) e.preventDefault();
            }}
        >
            <OneImage name={"Contact-us-tab"} activateEdit={activateEdit} />
        </Link>
        <Link
            to="/articles"
            className="z-50 feature-div"
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
                <div className="flex px-2 py-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400">
                    No Edit
                </div>
            </div>
        )}
    </div>
</div>


  
  );
};
