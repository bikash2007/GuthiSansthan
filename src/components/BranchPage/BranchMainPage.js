import { useEditing } from "../../context/EditingProvider";
import AddBranches from "./AddBranches";
import { BranchInstance } from "./BranchInstance";
import img from "../../media/TempleInformation/Bouddhanath/images.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
        console.log(response.data);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-wrap items-center justify-center px-[10%] gap-5">
      {data &&
        data.map((item, index) => (
          <BranchInstance
            key={index}
            imgUrl={item.image}
            name={item.name}
            festivals={item.festivals}
            notices={item.notices}
            articles={item.articles}
          />
        ))}

      {isEditing && <AddBranches />}
    </div>
  );
};
