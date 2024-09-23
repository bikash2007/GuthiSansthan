import axios from "axios";
import { useSelector } from "react-redux";
import { showAlert } from "../../AlertLoader";

export const ViewEditButton = ({ articleId, data, setData }) => {
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  const deleteElement = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}api/articles/${articleId}/`
      );
      if (response.status === 204) {
        setData(data.filter((item) => item.id !== articleId));
        showAlert("Article deleted successfully", "green");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      showAlert("Failed to delete article", "red");
    }
  };

  return (
    <div className="absolute z-100 left-0 text-white flex gap-1 flex-col">
      <div className="bg-gray-600 hover:bg-gray-700 cursor-pointer flex border rounded-md px-2 py-1">
        Edit
      </div>
      <div
        className="hover:bg-red-700 bg-red-600 cursor-pointer flex border rounded-md px-2 py-1"
        onClick={deleteElement}
      >
        Remove
      </div>
    </div>
  );
};
