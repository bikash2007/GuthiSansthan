import { useEditing } from "../../context/EditingProvider";
import AddBranches from "./AddBranches";
import { BranchInstance } from "./BranchInstance";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import img from "../../media/Headquaters/headoffice.jpg";

export const BranchMainPage = () => {
  const { isEditing } = useEditing();
  const [data, setData] = useState([]);
  const [background, setBackground] = useState({ image: "", video: "" });

  useEffect(() => {
    // Fetch branch data
    const fetchBranchData = async () => {
      try {
        const response = await axios.get(
          "https://ingnepal.org.np/api/branches/"
        );
        setData(response.data);
      } catch (error) {
        toast.error("Failed to fetch branch data");
        console.error(error);
      }
    };

    // Fetch home page data for background
    const fetchBackgroundData = async () => {
      try {
        const response = await axios.get(
          "https://ingnepal.org.np/api/pages/home-page/"
        );
        const bgData = response.data.components["bg-video"];
        if (bgData) {
          setBackground({
            image: bgData.image ? `https://ingnepal.org.np${bgData.image}` : "",
            video: bgData.video ? `https://ingnepal.org.np${bgData.video}` : "",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch background data");
        console.error(error);
      }
    };

    fetchBranchData();
    fetchBackgroundData();
  }, []);

  const handleRemove = (branchId) => {
    setData((prevData) => prevData.filter((item) => item.id !== branchId));
  };

  return (
    <div className=" w-full h-screen py-10 pb-28">
      {/* Background Video */}
      {background.video && (
        <video
          autoPlay
          muted
          loop
          className="fixed top-0 inset-0 w-full h-screen object-cover"
          style={{ zIndex: -1 }}
        >
          <source src={background.video} type="video/mp4" />
        </video>
      )}

      {/* Background Image */}
      {!background.video && background.image && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${background.image})`, zIndex: -1 }}
        ></div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex flex-wrap items-center pb-44  justify-center px-[10%] gap-5">
        <div className="bg-black flex flex-col rounded-md">
          <Link
            to="/headquaters"
            className="relative flex items-center justify-center border border-black rounded-md w-[150px] md:w-[300px] h-[100px] md:h-[200px] bg-cover bg-center hover:scale-105 m-1 transition-all duration-300 cursor-pointer"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </Link>
          <h5 className="h-full text-white w-full">Headquater</h5>
        </div>

        {data.map((item) => (
          <BranchInstance
            key={item.id}
            imgUrl={item.image}
            name={item.name}
            festivals={item.festivals}
            notices={item.notices}
            articles={item.articles}
            branchHead={item.branch_head_info}
            branchId={item.id}
            onRemove={handleRemove} // Pass the remove handler
          />
        ))}

        {isEditing && <AddBranches />}
      </div>
    </div>
  );
};
