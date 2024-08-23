import { useEditing } from "../../context/EditingProvider";
import AddBranches from "./AddBranches";
import { BranchInstance } from "./BranchInstance";
import img from "../../media/TempleInformation/Bouddhanath/images.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const BranchMainPage = () => {
  const { isEditing } = useEditing();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ingnepal.org.np/api/branches/"
        );
        setData(response.data);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-wrap items-center justify-center px-[10%] gap-5">
      <Link
        to="/headquaters"
        className="relative flex items-center justify-center border border-black rounded-md w-[150px] md:w-[300px] h-[100px] md:h-[200px] bg-cover bg-center hover:scale-105 m-1 transition-all duration-300 cursor-pointer  "
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="text-white font-bold text-[15px] md:text-[30px] z-10">
          Headquater
        </div>
      </Link>
      {data &&
        data.map((item, index) => (
          <BranchInstance
            key={index}
            imgUrl={item.image}
            name={item.name}
            festivals={item.festivals}
            notices={item.notices}
            articles={item.articles}
            branchHead={item.branch_head_info}
            branchId={item.id}
          />
        ))}

      {isEditing && <AddBranches />}
    </div>
  );
};
