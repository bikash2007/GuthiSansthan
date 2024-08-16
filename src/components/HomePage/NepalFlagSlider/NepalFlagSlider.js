import { act, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import "./NepalFlagSlider.css";
import { OneImage } from "./OneImage";
import img from "../../../media/guthi sansthan.png";
import bg from "../../../media/TempleInformation/patandurbarsquare.png";
import { useDispatch, useSelector } from "react-redux";
import { addLanguage, fetchGifToURL } from "../../ReuseableFunctions";
import {
  setNewSliderImg,
  setSliderImg,
} from "../../../state/HomePageSlices/HomePageSlice";
import { EditImage } from "../../EditComponents/EditImage";
import { useEditing } from "../../../context/EditingProvider";
import { EditGif } from "../../EditComponents/EditGif";
import { EditText } from "../../EditComponents/TextEditor/EditText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
export const NepalFlagSlider = ({ content }) => {
  const [isHover, setIsHover] = useState(false);
  const { isEditing, setIsEditing } = useEditing();
  const [activateEdit, setActivateEdit] = useState(false);
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const homePageDetail = useSelector((state) => state.homePageDetail);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:1000px)");
  const [x, setx] = useState();
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
      setx(id);
    } else {
      console.log("x is undefined or null");
    }
  });

  return (
    <>
      {/* {isMobile && <div className="w-full h-[20vh] "></div>} */}
      <div
        className={` ${
          isMobile ? "h-[70vh]" : "h-[70vh]"
        } flex flex-row items-center relative w-[100vw]   m-2 overflow-hidden`}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <div
          className={`${
            isMobile ? "text-[30px] w-[50%]" : "text-[80px] p-[10%] w-[60%]"
          } ${
            activateEdit
              ? "left-[100%]"
              : `${isHover ? "left-[-100%] opacity-0 " : ""}`
          }  absolute left-0  text-white font-bold   transition-left duration-500 font-reggaeOne`}
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
        <div
          className={`${
            activateEdit
              ? "left-[10%]"
              : `${
                  isHover
                    ? ` ${isMobile ? "opacity-0 left-[-100%]" : ""} left-[10%]`
                    : "left-[60%]"
                }`
          }  ${
            isMobile ? "w-[20vh]" : "w-[30vh]"
          } absolute   h-full z-10 flex items-center transition-all duration-300 ease-in-out`}
          onMouseEnter={() => {
            setIsHover(true);
          }}
        >
          {/* <EditGif 
                        isActualUploadedSame={homePageDetail['slider-img'].gif===homePageDetail['slider-img'].actualGif} 
                        setNewGif={setNewSliderImg} 
                        url={homePageDetail['slider-img'].gif} 
                        gifId={homePageDetail['slider-img'].id}
                    > */}
          {/* <img src={homePageDetail['slider-img']['gif']} className={`${isEditing?'':''} h-full flexitems-center justify-center`} ></img> */}
          <FontAwesomeIcon
            className="h-20 touchme text-white"
            icon={faArrowAltCircleRight}
          />
          {/* </EditGif> */}
        </div>

        <div
          className={`${
            activateEdit
              ? "left-[25%]"
              : `${
                  isHover
                    ? `${isMobile ? "left-[0%] " : "left-[25%]"}`
                    : ` left-[100%]`
                }`
          } ${isMobile ? "w-[100%] " : "w-[100%]"}px-2 py-3 absolute ${
            isEditing ? "" : ""
          } px-4 transition-all bg-red-500/10  mt-5   h-[90%] duration-300 ease-in-out flex flex-wrap  backdrop-blur-sm overflow-auto items-start justify-center gap-5 lg:gap-5  rounded-lg  backdrop:blur-sm `}
        >
          {/* <TemplesDisplayMain/> */}
          {isEditing && !activateEdit && (
            <div
              onClick={() => setActivateEdit(true)}
              className=" absolute top-1 flex z-50 bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-md cursor-pointer"
            >
              Edit
            </div>
          )}
          <Link
            to="/parva"
            className="feature-div"
            onClick={(e) => {
              isEditing && activateEdit && e.preventDefault();
            }}
          >
            <OneImage name={"Parav-tab"} activateEdit={activateEdit} />
          </Link>
          <Link
            to="/about-us"
            className="feature-div"
            onClick={(e) => {
              isEditing && activateEdit && e.preventDefault();
            }}
          >
            <OneImage name={"About-us-tab"} activateEdit={activateEdit} />
          </Link>
          <Link
            to="/contact-us"
            className="feature-div"
            onClick={(e) => {
              isEditing && activateEdit && e.preventDefault();
            }}
          >
            <OneImage name={"Contact-us-tab"} activateEdit={activateEdit} />
          </Link>
          <Link
            to="/articles"
            className="feature-div"
            onClick={(e) => {
              isEditing && activateEdit && e.preventDefault();
            }}
          >
            <OneImage name={"Article-tab"} activateEdit={activateEdit} />
          </Link>
          {isEditing && activateEdit && (
            <div
              className=" absolute top-1 flex bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-md cursor-pointer"
              onClick={() => setActivateEdit(false)}
            >
              <div className=" flex bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-md cursor-pointer">
                No Edit
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
