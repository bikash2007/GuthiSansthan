import React, { useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "../AlertLoader";
import { activate_loader } from "../AlertLoader/LoaderBox";
import { setAboutUsPageWholeDetail } from "../../state/AboutUsPageSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const AddAboutUs = ({ toggleAddMode }) => {
  const titleRefs = {
    English: useRef(),
    Nepali: useRef(),
    Newari: useRef(),
    Mithila: useRef(),
  };
  const descriptionRefs = {
    English: useRef(),
    Nepali: useRef(),
    Newari: useRef(),
    Mithila: useRef(),
  };
  const [image, setImage] = useState(null);
  const [isAdd, setAdd] = useState(false);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const titles = Object.fromEntries(
      Object.keys(titleRefs).map((key) => [
        key,
        titleRefs[key].current.value.trim(),
      ])
    );
    const texts = Object.fromEntries(
      Object.keys(descriptionRefs).map((key) => [
        key,
        descriptionRefs[key].current.value.trim(),
      ])
    );

    if (
      Object.values(titles).some((title) => !title) ||
      Object.values(texts).some((text) => !text) ||
      !image
    ) {
      showAlert("Please fill all fields and upload an image", "red");
      return;
    }

    const formData = new FormData();
    formData.append("title", JSON.stringify(titles));
    formData.append("text", JSON.stringify(texts));
    formData.append("image", image);

    try {
      activate_loader(true);
      const response = await axios.post(`${baseUrl}api/about-us/`, formData);
      dispatch(setAboutUsPageWholeDetail(response.data.components));
      showAlert("About Us content added successfully", "green");
      navigate("/");
      toggleAddMode(false);
      setAdd(false);
    } catch (error) {
      console.error("Error:", error);
      showAlert("Failed to add content", "red");
    } finally {
      activate_loader(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Define isMobile based on screen width
  const isMobile = window.innerWidth < 768; // Example breakpoint

  return (
    <>
      {!isAdd ? (
        <div
          onClick={() => setAdd(true)}
          className={`${
            isMobile ? "h-[100px] w-[150px]" : "h-[150px] w-[200px]"
          } hover:scale-105 m-1 bg-gray-500 hover:bg-gray-600 rounded-md border border-white flex flex-col text-white items-center justify-center transition-all duration-300 cursor-pointer`}
        >
          <div>Add </div>
          <FontAwesomeIcon icon={faPlus} size="3x" />
        </div>
      ) : (
        <div className="w-[90%] max-w-md bg-neutral-200/50 backdrop-blur-lg mt-5 flex flex-col items-center p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add About Us Content</h2>

          {["English", "Nepali", "Newari", "Mithila"].map((lang) => (
            <div key={lang} className="mb-4 w-full">
              <h3 className="font-semibold mb-2">{lang}</h3>
              <input
                type="text"
                ref={titleRefs[lang]}
                placeholder={`Title (${lang})`}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <textarea
                ref={descriptionRefs[lang]}
                placeholder={`Description (${lang})`}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          ))}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mb-2 w-32 h-32 object-cover"
            />
          )}
          <button
            onClick={handleSubmit}
            className="p-2 px-5 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
          <button
            onClick={() => {
              setAdd(false);
            }}
            className="mt-2 p-2 px-5 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
