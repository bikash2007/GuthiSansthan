import React, { useEffect, useState } from "react";
import { MdAddCall } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { useMediaQuery } from "@mui/material";
<<<<<<< HEAD
import axios from "axios";
=======
import loc1 from "../media/ContactUs/lalitpur.jpeg";
import loc2 from "../media/ContactUs/patan.jpeg";
import bg from "../media/ContactUs/bg.png";

import Image from './Contact US/AddImage'
import Map from './Contact US/Map'

>>>>>>> 079976b28df1d1448e0007ab9415ff4b98caaa6a
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../components/AlertLoader/index";
import { useTranslation } from "react-i18next";
import { EditBgImage } from "../components/EditComponents/EditBgImage";
import {
  setBgImg,
  setContactUsPageWholeDetail,
  setExtraImage1,
  setExtraImage2,
  setNewBgImg,
} from "../state/ContactUsPageSlice";
import { useEditing } from "../context/EditingProvider";
import { addLanguage } from "../components/ReuseableFunctions";
import EditLocation from "./Contact US/EditLocation";
import AddContactPerson from "./Contact US/AddContactPerson";

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
  }, [baseUrl, contactUsPageDetail, dispatch]);

  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
  });

<<<<<<< HEAD
  useEffect(() => {
    axios
      .get("https://ingnepal.org.np/api/guthi-contact/1/")
      .then((response) => {
        setContactInfo(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the contact info!", error);
      });
  }, []);

  const [spokesperson, setSpokesperson] = useState([]);

  useEffect(() => {
    axios
      .get("https://ingnepal.org.np/api/contacts/")
      .then((response) => {
        setSpokesperson(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the spokesperson data!",
          error
        );
      });
  }, []);

  const { isEditing } = useEditing();

  const handleRemoveSpokesperson = async (id) => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/contacts/${id}/`);
      // Remove the spokesperson from the state
      setSpokesperson(spokesperson.filter((item) => item.id !== id));
      showAlert("Spokesperson removed successfully", "green");
    } catch (error) {
      console.error("There was an error removing the spokesperson!", error);
      showAlert("Failed to remove spokesperson", "red");
    }
  };
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
>>>>>>> 079976b28df1d1448e0007ab9415ff4b98caaa6a

  return (
    <div className="flex flex-col items-center justify-center bg-center bg-cover overflow-hidden">
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
<<<<<<< HEAD
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full relative h-auto px-6 py-4 font-bold transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-md hover:shadow-xl">
            <a
              href={`${contactInfo.location_url}`}
              className="flex items-center gap-4 px-5 py-2 text-md no-underline text-black"
            >
              <IoLocationSharp className="w-8 h-8 text-green-600" />
              <p className="transition-colors duration-200 ease-in-out cursor-pointer hover:underline">
                {contactInfo.location}
              </p>
            </a>
            <div className="flex items-center gap-4 px-5 py-2 text-md">
              <MdAddCall className="w-6 h-6 text-blue-600" />
              <p className="transition-colors duration-200 ease-in-out cursor-pointer hover:underline">
                {contactInfo.contact_no}
              </p>
            </div>
            <div className="flex items-center gap-4 px-5 py-2 text-md">
              <MdOutlineMail className="w-6 h-6 text-red-600" />
              <p className="transition-colors duration-200 ease-in-out cursor-pointer hover:underline">
                {contactInfo.email}
              </p>
            </div>
            {isEditing && <EditLocation />}
          </div>
          {spokesperson.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center w-full max-w-sm p-6 m-4 space-y-4 transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-lg hover:shadow-xl"
            >
              <p className="px-4 py-2 text-lg font-semibold text-gray-800 rounded-md bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400">
                {item.position.English}{" "}
                {/* Assuming you want to display English position */}
              </p>
              <img
                src={item.photo}
                alt={item.name.English}
                className="w-40 h-40 border-4 rounded-full shadow-lg border-gradient-to-r from-purple-400 via-pink-300 to-purple-400"
              />
              <p className="px-4 py-2 mb-2 text-xl font-bold text-gray-900 bg-white border border-gray-200 rounded-md shadow-lg">
                {item.name.English}{" "}
                {/* Assuming you want to display English name */}
              </p>
              <p className="px-4 py-2 text-lg font-medium text-gray-800 bg-white border border-gray-200 rounded-md shadow-lg">
                {item.contact}
              </p>
              {isEditing && (
                <button
                  onClick={() => handleRemoveSpokesperson(item.id)}
                  className="px-4 py-2 mt-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {isEditing && <AddContactPerson />}
=======
        
        
        <div className="flex flex-col justify-center items-center">

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

  <Image/>
  <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-3 text-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:bg-green-700 hover:shadow-2xl hover:scale-105">
  Location
</button>


  
    </div>


    
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
>>>>>>> 079976b28df1d1448e0007ab9415ff4b98caaa6a
        </div>
      </div>
    </div>
  );
};
