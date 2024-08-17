import { InstanceArticles } from "./InstanceArticles";
import bg from "../../../media/Article/pasupatibg.jpg";
import { motion } from "framer-motion";
import { duration } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../AlertLoader";
import {
  setArticleSectionWholeDetail,
  setIsFetched,
} from "../../../state/ArticleNoticeSlices/ArticleSectionSlice";
export const Articles = () => {
  const [data, setData] = useState();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const articleSectionDetail = useSelector(
    (state) => state.articelSectionDetail
  );
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      dispatch(setIsFetched(true));
      const response = await axios.get(baseUrl + articleSectionDetail.url);
      console.log("articles", response.data);
      dispatch(setArticleSectionWholeDetail(response.data));
      setData(response.data);
    } catch (error) {
      console.log(error);
      showAlert(error, "red");
    }
  };
  useEffect(() => {
    if (!articleSectionDetail.isFetched) fetchData();
  });
  return (
    <>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="w-full bg-white p-1 rounded-md overflow-hidden mt-2"
      >
        {articleSectionDetail.details ? (
          articleSectionDetail.details.map((item) => (
            <InstanceArticles
              img={item.image}
              title={item.title}
              desc={item.text}
            />
          ))
        ) : (
          <h1>Empty articles</h1>
        )}
      </motion.div>
    </>
  );
};
