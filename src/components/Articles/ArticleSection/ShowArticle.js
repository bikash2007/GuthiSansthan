import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const ShowArticle = () => {
  const loc = useLocation();
  const [data, setData] = useState(loc.state || {});

  useEffect(() => {
    document.title = data?.title || "Article";
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", data?.desc || "Article description.");
  }, [data]);
  console.log(data);

  return (
    <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-md bg-gradient-to-r from-gray-50 to-gray-200 text-decoration-none">
      {/* Article Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 text-decoration-none">
          {data?.title || "Article Title"}
        </h1>
      </div>

      {/* Main Content and Image */}
      <div className="flex flex-col gap-8 my-10 md:flex-row">
        <div className="flex-1">
          <p className="text-lg leading-relaxed text-gray-700">
            {data?.desc || "Placeholder text for the article description."}
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={data?.img || "https://via.placeholder.com/300"}
            alt={data?.title || "Article image"}
            className="object-cover border-2 border-gray-300 rounded-lg shadow-lg h-72 w-72"
          />
        </div>
      </div>
    </div>
  );
};
