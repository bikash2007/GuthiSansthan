import { useEffect } from "react";
import axios from "axios";
import { ParvaInstance } from "./ParvaInstance";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../AlertLoader";
import {
  setDynamicParvaPageWholeDetails,
  setParvaPageWholeDetails,
  setBgImg,
  setNewBgImg,
} from "../../../state/ParvaPageSlice";
import { addLanguage } from "../../ReuseableFunctions";
import { useEditing } from "../../../context/EditingProvider";
import { useTranslation } from "react-i18next";
import { EditBgImage } from "../../EditComponents/EditBgImage";

export const Parva = () => {
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const parvaPageDetail = useSelector((state) => state.parvaPageDetail);
  const { isEditing } = useEditing();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!parvaPageDetail.isFetched) {
          await fetchParvaContent();
        }
        if (!parvaPageDetail.isDynamicFetched) {
          await fetchDynamicParva();
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchContent();
  }, [parvaPageDetail.isFetched, parvaPageDetail.isDynamicFetched]); // Added dependencies

  const fetchParvaContent = async () => {
    try {
      const response = await axios.get(baseUrl + parvaPageDetail.url);
      const components = response.data.components;

      dispatch(setParvaPageWholeDetails(components));

      // Ensure the image URL is valid and set it in state
      const bgImgSrc = baseUrl + components["parva-page"].image.substr(1);
      dispatch(setBgImg(bgImgSrc)); // Set background image in state

      // Add language data
      addLanguage({
        key: "parva",
        lngs: components["parva-page"].text,
      });

      dispatch(setParvaPageWholeDetails(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(parvaPageDetail, "hello");
  const fetchDynamicParva = async () => {
    try {
      const response = await axios.get(baseUrl + parvaPageDetail.dynamicUrl);
      dispatch(setDynamicParvaPageWholeDetails(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <EditBgImage
        isActualUploadedSame={
          parvaPageDetail["bg-img"].imgSrc ===
          parvaPageDetail["bg-img"].actualImgSrc
        }
        setNewImage={setNewBgImg}
        imageId={parvaPageDetail["bg-img"].id} // Ensure the correct ID is passed
        url={parvaPageDetail["bg-img"].imgSrc}
      >
        <div
          className="bg-cover bg-center fixed -z-10 w-full h-screen top-0"
          style={{
            backgroundImage: `url(${parvaPageDetail["bg-img"].imgSrc})`,
          }}
        ></div>
      </EditBgImage>

      <div className="bg-cover bg-center bg-zinc-800/20 fixed -z-10 w-full h-screen top-0"></div>

      <div className="w-full h-screen pb-3 flex flex-col relative">
        <h1 className="text-white z-10 text-4xl sm:text-5xl lg:text-[60px] text-center">
          {t("jatra")}
        </h1>
        <div className="flex w-full h-full justify-center overflow-auto">
          <div className="w-[95%] flex flex-wrap px-1 items-center justify-center gap-4 sm:gap-6 lg:gap-12 overflow-auto">
            {parvaPageDetail.dynamicDetails.map((festival) => (
              <ParvaInstance
                parvaId={festival.id} // Ensure this ID is correctly set
                fetchAllParva={fetchDynamicParva}
                key={festival.id}
                startDate={festival.start_date}
                endDate={festival.end_date}
                loc={festival.location}
                img={festival.image}
                name={festival.name}
                detail={festival.description}
                qr={festival.qr_code}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
