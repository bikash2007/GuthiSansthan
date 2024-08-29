import { Articles } from "./ArticleSection/Articles";
import { Notices } from "./NoticeSection/Notices";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setArticlePageWholeDetail,
  setBgImg,
  setNewBgImg,
} from "../../state/ArticleNoticeSlices/ArticlePageSlice";
import { addLanguage, fetchImageToURL } from "../ReuseableFunctions";
import { EditBgImage } from "../EditComponents/EditBgImage";
import { showAlert } from "../AlertLoader";
import { useEditing } from "../../context/EditingProvider";
import { Link } from "react-router-dom";
import Law from "./Law/Law";
import Download from "./Download/Download";
import Budget from "./Budget/Budget";

export const ArticleMainSection = () => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [isArticle, setArtical] = useState(true);
  const articlePageDetail = useSelector((state) => state.articlePageDetail);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const dispatch = useDispatch();
  const { isEditing, setIsEditing } = useEditing();
  const [section, setSection] = useState("notice");

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl + articlePageDetail.url);
          dispatch(setArticlePageWholeDetail(response.data.components));
          dispatch(
            setBgImg(baseUrl + response.data.components["bg-img"].image)
          );
          addLanguage({
            key: "article-page-heading",
            lngs: response.data.components["bg-img"].text,
          });
        } catch (error) {
          console.log(error);
          showAlert(error, "red");
        }
      };
      if (!articlePageDetail.isFetched) fetchData();
    } catch (error) {
      console.log(error);
      showAlert(error, "red");
    }
  });

  return (
    <>
      <div className={`${isEditing ? "flex flex-col gap-3 px-2 " : ""}`}>
        <EditBgImage
          imageId={articlePageDetail["bg-img"].id}
          url={articlePageDetail["bg-img"].imgSrc}
          setNewImage={setNewBgImg}
          isActualUploadedSame={
            articlePageDetail["bg-img"].imgSrc ===
            articlePageDetail["bg-img"].actualImgSrc
          }
        >
          <div
            className="fixed top-0 left-0 w-full h-screen bg-center bg-cover -z-50"
            style={{
              backgroundImage: `url(${articlePageDetail["bg-img"].imgSrc})`,
            }}
          ></div>
        </EditBgImage>
        {isEditing && (
          <div className="absolute z-50 flex gap-2 top-32 right-4">
            <Link
              to="/super-user/add-articles"
              className="px-3 py-2 text-white no-underline bg-green-600 rounded-md cursor-pointer hover:bg-green-700"
            >
              Add Article
            </Link>
            <Link
              to="/super-user/add-notices"
              className="px-3 py-2 text-white no-underline bg-green-600 rounded-md cursor-pointer hover:bg-green-700"
            >
              Add Notice
            </Link>
            <Link
              to="/super-user/add-notices"
              className="px-3 py-2 text-white no-underline bg-green-600 rounded-md cursor-pointer hover:bg-green-700"
            >
              Add Law
            </Link>
            <Link
              to="/super-user/add-notices"
              className="px-3 py-2 text-white no-underline bg-green-600 rounded-md cursor-pointer hover:bg-green-700"
            >
              Add Budget
            </Link>
            <Link
              to="/super-user/add-notices"
              className="px-3 py-2 text-white no-underline bg-green-600 rounded-md cursor-pointer hover:bg-green-700"
            >
              Add Download
            </Link>
          </div>
        )}

        <div className="w-full">
          <div
            style={{ background: 'linear-gradient(135deg, #001f3f,#00ffff)' }}
            className="flex justify-start w-full gap-8 py-4 pl-16 shadow-sm "
          >
            <button
              onClick={() => setSection("article")}
              className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                section === "article" ? " border-red-600 " : "border-none"
              } `}
            >
            लेख
            </button>
            <button
              onClick={() => setSection("notice")}
              className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                section === "notice" ? " border-red-600 " : "border-none"
              } `}
            >
           सूचना
            </button>
            <button
              onClick={() => setSection("law")}
              className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                section === "law" ? " border-red-600 " : "border-none"
              } `}
            >
              ऐन कानून
            </button>

            <button
              onClick={() => setSection("budget")}
              className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                section === "budget" ? " border-red-600 " : "border-none"
              } `}
            >
              बार्षिक बजेट
            </button>
            <button
              onClick={() => setSection("download")}
              className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                section === "download" ? " border-red-600 " : "border-none"
              } `}
            >
              डाउनलोड
            </button>
            {/* <button
              onClick={() => setSection("download")}
              className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                section === "download" ? " border-red-600 " : "border-none"
              } `}
            >
              कूत तथा मालपोतको दर
            </button>
            <button
              onClick={() => setSection("download")}
              className={`font-bold border-b-2  hover:border-red-600 transition-all duration-200 ease-linear text-white text-xl ${
                section === "download" ? " border-red-600 " : "border-none"
              } `}
            >
              अन्य देवस्वका दरहरू
            </button> */}
          </div>
          <div className="flex items-center justify-center w-full">
            {section === "article" && <Articles />}
            {section === "notice" && <Notices />}
            {section === "law" && <Law />}
             {section === "budget" && <Budget />}  
             {section === "download" && <Download />}  
          </div>
        </div>
      </div>
    </>
  );
};
