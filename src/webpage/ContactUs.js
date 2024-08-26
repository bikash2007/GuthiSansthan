import React, { useEffect } from "react";
import { MdAddCall } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { showAlert } from "../components/AlertLoader/index";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import loc1 from "../media/ContactUs/lalitpur.jpeg";
import loc2 from "../media/ContactUs/patan.jpeg";
import bg from "../media/ContactUs/bg.png";
<<<<<<< Updated upstream
import  hariparshad from '../media/ContactUs/HariPrasadSubedi.png'
=======

import Image from './Contact US/AddImage'
import Map from './Contact US/Map'
import Addtop from "./Contact US/Addtop";
>>>>>>> Stashed changes

import { useDispatch, useSelector } from "react-redux";
import {
  setBgImg,
  setContactUsPageWholeDetail,
  setExtraImage1,
  setExtraImage2,
  setNewBgImg,
  setNewExtraImage,
} from "../state/ContactUsPageSlice";
import { addLanguage, fetchImageToURL } from "../components/ReuseableFunctions";
import { EditBgImage } from "../components/EditComponents/EditBgImage";
import { EditImage } from "../components/EditComponents/EditImage";
export const ContactUs = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:800px)");
  const [mapLoaded, setMapLoaded] = useState(false);
  const contactUsPageDetail = useSelector((state) => state.contactUsPageDetail);
  const defaultCenter = {
    lat: 27.681505372996934,
    lng: 85.32804964028425,
  };

  const mapStyles = {
    height: "400px",
    width: "400px",
  };
  const handleLoad = () => {
    setMapLoaded(true);
    console.log("Map loaded successfully");
  };
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrl + contactUsPageDetail.url);
          console.log(response.data.components);
          dispatch(setContactUsPageWholeDetail(response.data.components));
          dispatch(
            setExtraImage1(
              baseUrl +
                response.data.components["extra-image-1"].image.substr(0)
            )
          );
          dispatch(
            setExtraImage2(
              baseUrl +
                response.data.components["extra-image-2"].image.substr(0)
            )
          );
          dispatch(
            setBgImg(baseUrl + response.data.components["bg-image"].image)
          );
          addLanguage({
            key: "contact-us-heading",
            lngs: response.data.components["contact-us-heading"].text,
          });
        } catch (error) {
          console.log(error);
          showAlert(error, "red");
        }
      };
      if (!contactUsPageDetail.isFetched) fetchData();
    } catch (error) {
      console.log(error);
      showAlert(error, "red");
    }
  });
<<<<<<< Updated upstream
=======

// chage the location name 
const [contactInfo, setContactInfo] = useState({
  address: "",
  phone: "",
  email: ""
});

useEffect(() => {
  axios.get('/api/contact-info')
    .then(response => {
      setContactInfo(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the contact info!", error);
    });
}, []);
//end


// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setContactInfo((prevInfo) => ({
//     ...prevInfo,
//     [name]: value
//   }));
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   // Logic to save the updated information can be added here, such as sending it to a backend or local storage.
//   alert('Contact information updated successfully!');
// };








>>>>>>> Stashed changes
  return (
    <div className="flex flex-col items-center justify-center bg-center bg-cover verflow-hidden">
      <EditBgImage
        imageId={contactUsPageDetail["bg-img"].id}
        url={contactUsPageDetail["bg-img"].imgSrc}
        setNewImage={setNewBgImg}
        isActualUploadedSame={
          contactUsPageDetail["bg-img"].imgSrc ===
          contactUsPageDetail["bg-img"].actualImgSrc
        }
      >
        <div
          className="fixed top-0 w-screen h-screen bg-center bg-cover -z-10"
          style={{
            backgroundImage: `url(${contactUsPageDetail["bg-img"].imgSrc})`,
          }}
        ></div>
      </EditBgImage>
      <div className="fixed top-0 w-screen h-screen bg-center bg-cover -z-10 bg-black/40 "></div>
      <h1 className="m-16 text-5xl font-bold tracking-wide text-white">
        {t("contact-us-heading")}
      </h1>
      <div
        className={`${
          isMobile ? "flex-col" : "flex-row "
        } flex   rounded-lg justify-center align-center gap-10 mb-44`}
      >
        <div id="map" className="flex justify-center w-full lg:w-1/3">
          <LoadScript googleMapsApiKey="AIzaSyDR-Piy7y9bIfz9HzE_dN_TAXJbM9UtA24">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={15}
              center={defaultCenter}
              onLoad={handleLoad}
            >
              {mapLoaded && <Marker position={defaultCenter} />}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="flex items-center justify-center w-full gap-2 md:w-1/2">
          <div className="flex flex-col items-start justify-center  h-[60%] px-5 py-2 font-bold bg-white rounded-lg sm:mt-6">
            <div className="flex gap-4 px-5 text-md ">
              <IoLocationSharp className="w-8 h-8 " />
              <p className="hover:underline">{t("head-office-address")}</p>
            </div>
            <div className="flex gap-4 px-5 text-md ">
              <MdAddCall className="w-6 h-6" />
              <p className="hover:underline">9851082057</p>
            </div>
            <div className="flex gap-4 px-5 text-md ">
              <MdOutlineMail className="w-6 h-6" />
              <p className="hover:underline">subedihari33@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-[87%] px-5 py-2 text-lg font-bold bg-white rounded-lg md:w-1/2 sm:mt-6"> 
            <p className="p-0 m-0 text-md"> Spokesperson</p>
              <p>Hari Prasad Subedi</p>
              <img src={hariparshad} />

<<<<<<< Updated upstream
          </div>
          </div>
=======
        <div className="flex flex-col items-center justify-center w-full h-auto px-6 py-4 font-bold bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
  <div className="flex items-center gap-4 px-5 py-2 text-md">
    <IoLocationSharp className="w-8 h-8 text-green-600" />
    <p className="hover:underline cursor-pointer transition-colors duration-200 ease-in-out">
      {contactInfo.address} 
    </p>
  </div>
  <div className="flex items-center gap-4 px-5 py-2 text-md">
    <MdAddCall className="w-6 h-6 text-blue-600" />
    <p className="hover:underline cursor-pointer transition-colors duration-200 ease-in-out">
      {contactInfo.phone}
    </p>
  </div>
  <div className="flex items-center gap-4 px-5 py-2 text-md">
    <MdOutlineMail className="w-6 h-6 text-red-600" />
    <p className="hover:underline cursor-pointer transition-colors duration-200 ease-in-out">
      {contactInfo.email}
    </p>
  </div>
</div>
<Addtop/>

{/* <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
<div className="flex items-center gap-4 px-5 py-2 text-md">
    <IoLocationSharp className="w-8 h-8 text-green-600" />
    <input
            type="text"
            id="address"
            name="address"
            value={contactInfo.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          />
  </div>

  <div className="flex items-center gap-4 px-5 py-2 text-md">
        <MdAddCall className="w-6 h-6 text-blue-600" />
          <input
            type="text"
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4 px-5 py-2 text-md">
        <MdOutlineMail className="w-6 h-6 text-red-600" />
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
        >
          Save Changes
        </button>
      </form> */}

  <Image/>
  <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-3 text-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:bg-green-700 hover:shadow-2xl hover:scale-105">
  Location
</button>


  
    </div>


    
>>>>>>> Stashed changes
          <div className="flex w-full gap-2 p-2 bg-white rounded-lg d-none ">
            <div className="w-1/2">
              <EditImage
                isActualUploadedSame={
                  contactUsPageDetail["extra-image-1"].imgSrc ===
                  contactUsPageDetail["extra-image-1"].actualImgSrc
                }
                url={contactUsPageDetail["extra-image-1"].imgSrc}
                name={"extra-image-1"}
                setNewImage={setNewExtraImage}
                imageId={contactUsPageDetail["extra-image-1"].id}
              >
                <img src={contactUsPageDetail["extra-image-1"].imgSrc} />
              </EditImage>
            </div>
            <div className="w-1/2">
              <EditImage
                isActualUploadedSame={
                  contactUsPageDetail["extra-image-2"].imgSrc ===
                  contactUsPageDetail["extra-image-2"].actualImgSrc
                }
                url={contactUsPageDetail["extra-image-2"].imgSrc}
                name={"extra-image-2"}
                setNewImage={setNewExtraImage}
                imageId={contactUsPageDetail["extra-image-2"].id}
              >
                <img src={contactUsPageDetail["extra-image-2"].imgSrc} />
              </EditImage>
           
          </div>
        </div>
      </div>
    </div>
  );
};
