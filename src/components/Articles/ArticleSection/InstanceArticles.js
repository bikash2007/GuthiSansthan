import { easeInOut, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ViewEditButton } from "./ViewEditButton";
import { useEditing } from "../../../context/EditingProvider";
import bg from "../../../media/Article/bg.jpg"
import logo from "../../../media/logo192.png"

export const InstanceArticles = ({
  img,
  desc,
  title,
  articleId,
  data,
  setData,
}) => {
  const { isEditing } = useEditing();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      {isEditing && (
        <ViewEditButton articleId={articleId} data={data} setData={setData} />
      )}

      <div className="flex flex-col gap-3">

<div className="w-full md:w-[75%]  border-2 border-slate-500 rounded-3xl  md:ms-8 flex flex-col gap-[100px] mt-2  hover:shadow-gray-800 shadow-md hover:scale-105  bg-gray-300/40 backdrop-blur-2xl rounded-tl-md rounded-tr-md ">
  <Link

    to={{
      pathname: "/show-article",
    }}
    state={{ img: img, desc: desc, title: title }}
  >
    <div className="flex flex-col items-center md:flex-row text-decoration-none">
      <div className="w-full mb-1 md:w-10/12 md:mb-0">
        <div className="flex items-center justify-center md:ms-[110px]">
        
          <h1 className="text-center text-[20px] sm:text-[25px] md:text-[30px] font-bold text-black flex-grow">
            {title}
          </h1>
        </div>
        <div className="flex ">

     
        
        <div className="col-md-3 ">
       <img src={logo} className="w-[150px] h-[70px] col-md-3 md:ms-5 " alt="logo" />
       </div>
       
        <div className="flex col-md-9">
        <p className="mt-2 overflow-hidden text-sm leading-snug text-center md:text-base text-neutral-600 max-h-12">
          {desc}
        </p>
        </div>
  
      </div>
      </div>
      <div className="flex items-end justify-center w-full md:w-2/12">
        <img
          src={img}
          className="object-cover w-24 h-24 rounded-lg md:w-[300px] md:me-[20px] md:h-[120px]"
          alt="article"
        />
      </div>
    </div>
  </Link>
</div>



</div>





    </motion.div>
  );
};
