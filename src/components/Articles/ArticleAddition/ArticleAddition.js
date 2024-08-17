import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { showAlert } from "../../AlertLoader";

export const ArticleAddition = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const articlePageDetail = useSelector((state) => state.articlePageDetail);
  const loc = useLocation();
  const token = sessionStorage.getItem("token");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const publishArticle = async (e) => {
    e.preventDefault();

    try {
      const finalFormData = new FormData();
      finalFormData.append("title", title);
      finalFormData.append("text", description);
      finalFormData.append("image", image);
      finalFormData.append("created_by", 1); // Replace with the actual user ID

      const response = await axios.post(
        baseUrl + articlePageDetail.dynamicUrl,
        finalFormData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log("Response", response.data);
      showAlert("Article published successfully!", "green");
    } catch (error) {
      showAlert(error.message, "red");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Article
        </h1>
        <form onSubmit={publishArticle} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#30D5C8] focus:border-[#30D5C8]"
              placeholder="Enter article title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#30D5C8] focus:border-[#30D5C8] h-32"
              placeholder="Enter article description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#30D5C8]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#30D5C8] hover:bg-[#2ab2aa] text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-300 ease-in-out"
          >
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
};
