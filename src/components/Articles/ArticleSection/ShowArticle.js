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
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-gray-50 to-gray-200 shadow-md rounded-lg">
      {/* Article Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          {data?.title || "Article Title"}
        </h1>
      </div>

      {/* Main Content and Image */}
      <div className="flex flex-col md:flex-row gap-8 my-10">
        <div className="flex-1">
          <p className="text-gray-700 text-lg leading-relaxed">
            {data?.desc || "Placeholder text for the article description."}
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={data?.img || "https://via.placeholder.com/300"}
            alt={data?.title || "Article image"}
            className="border-2 border-gray-300 rounded-lg shadow-lg h-72 w-72 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
