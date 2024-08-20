import bg from "../../../media/Article/pasupatibg.jpg";
import { InstanceArticles } from "../../Articles/ArticleSection/InstanceArticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEditing } from "../../../context/EditingProvider";
export const BranchArticles = ({ branchName, articles }) => {
  const { isEditing, setIsEditing } = useEditing();

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
