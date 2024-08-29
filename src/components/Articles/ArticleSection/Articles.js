import React, { useEffect, useState } from "react"; // Import React, useEffect, and useState
import axios from "axios"; // Import axios for API requests
import { motion } from "framer-motion"; // Import motion for animations
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from react-redux
import { showAlert } from "../../AlertLoader"; // Import the showAlert function
import {
  setArticleSectionWholeDetail,
  setIsFetched,
} from "../../../state/ArticleNoticeSlices/ArticleSectionSlice"; // Import required actions from your slice
import { InstanceArticles } from "./InstanceArticles"; // Import the InstanceArticles component
import { useEditing } from "../../../context/EditingProvider";
import { Link } from 'react-router-dom';


export const Articles = () => {
  const [data, setData] = useState([]);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const { isEditing } = useEditing();

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
  }, [articleSectionDetail.isFetched]);

  return (
    <div className="flex flex-col ">
     {isEditing && (
                <div className="flex items-center justify-center mt-4">
                    <Link
                        to="/addarticle"
                        className="px-4 py-2 text-lg text-white no-underline bg-green-600 rounded-md cursor-pointer top-3 hover:bg-green-700"
                    >
                        Add Article
                    </Link>
                </div>
            )}
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="w-full p-1 mt-2 overflow-hidden rounded-md"
    >
      {articleSectionDetail.details.length ? (
        articleSectionDetail.details.map((item) => (
          <InstanceArticles
            key={item.id}
            img={item.image}
            title={item.title}
            desc={item.text}
            articleId={item.id}
            data={data}
            setData={setData}
          />
        ))
      ) : (
        <h1>Empty articles</h1>
      )}
    </motion.div>
    </div>
  );
};
