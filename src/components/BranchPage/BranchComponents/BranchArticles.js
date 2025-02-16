import bg from "../../../media/Article/pasupatibg.jpg";
import { InstanceArticles } from "../../Articles/ArticleSection/InstanceArticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEditing } from "../../../context/EditingProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export const BranchArticles = ({ branchName, branchId }) => {
  const { isEditing, setIsEditing } = useEditing();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const [articles, setarticles] = useState([]);

  useEffect(() => {
    fetchBranchAllParva();
  }, [baseUrl, branchId]); // Added dependency array

  const fetchBranchAllParva = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/branches/${branchId}/get-articles/`
      );
      setarticles(response.data); // Axios stores data in response.data
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  return (
    <div className="w-full rounded-lg">
      {isEditing && (
        <Link
          to="/super-user/add-articles"
          state={{ branchName }}
          className="w-full h-fit flex items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="p-5 m-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer no-underline"
            size="3x"
          />
        </Link>
      )}
      {articles &&
        articles.map((items) => (
          <InstanceArticles
            img={items.image}
            title={items.title}
            desc={items.text}
          />
        ))}
    </div>
  );
};
