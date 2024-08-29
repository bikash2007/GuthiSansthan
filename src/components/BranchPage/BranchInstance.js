import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEditing } from "../../context/EditingProvider";

export const BranchInstance = ({
  imgUrl,
  name,
  festivals,
  notices,
  articles,
  branchHead,
  branchId,
  onRemove,
}) => {
  const { isEditing } = useEditing();
  const handleRemove = async () => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/branches/${branchId}/`);
      toast.success("Branch successfully removed!");
      if (onRemove) onRemove(branchId);
    } catch (error) {
      toast.error("Failed to remove branch");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-black rounded-lg relative w-[160px] md:w-[310px] ">
      <Link
        to="/branche-full-info"
        state={{
          name: name,
          img: imgUrl,
          festivals: festivals,
          notices: notices,
          articles: articles,
          branchHead: branchHead,
          branchId: branchId,
        }}
        className="relative flex items-center justify-center border border-black rounded-md w-[150px] md:w-[300px] h-[100px] md:h-[200px] bg-cover bg-center hover:scale-105 m-1 transition-all duration-300 cursor-pointer"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </Link>
      <h5 className="h-full text-white w-full flex flex-wrap justify-center">
        {name}
      </h5>

      {isEditing && (
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Remove
        </button>
      )}
    </div>
  );
};
