import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { showAlert } from "../../AlertLoader";
import "@fontsource/poppins"; // Import Poppins font

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
    <div className="flex items-center justify-center w-[1500px] h-[550px] mt-4">
      <div
       style={{ fontFamily: "'Merriweather', serif" }}
      className="w-full max-w-xl px-6 py-6 h-[590px] bg-gray-600/30 rounded-lg shadow-lg  backdrop-blur-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <h1 className="mt-4 mb-6 text-4xl font-bold text-center text-white font-poppins">
          Add New Article
        </h1>
        <form onSubmit={publishArticle} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-white font-poppins">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-[#30D5C8] focus:border-[#30D5C8] text-base font-poppins hover:border-[#2ab2aa] transition-colors duration-300"
              placeholder="Enter article title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white font-poppins">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:ring-[#30D5C8] focus:border-[#30D5C8] h-32 text-base font-poppins hover:border-[#2ab2aa] transition-colors duration-300"
              placeholder="Enter article description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white font-poppins">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-white px-4 py-2 border border-gray-300 rounded-md shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#30D5C8] text-base font-poppins hover:border-[#2ab2aa] transition-colors duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-green-700 rounded-md shadow-lg hover:bg-green-800 hover:shadow-xl font-poppins"
          >
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
};
