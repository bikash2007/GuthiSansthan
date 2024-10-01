import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useEditing } from "../../context/EditingProvider";
import { useDispatch, useSelector } from "react-redux";
import { setGuthiSansthanLogo } from "../../state/GlobalSlice";
import { showAlert } from "../AlertLoader";
import { activate_loader } from "../AlertLoader/LoaderBox";
import { useHomePageBg } from "../../context/HomePageBg";

export const EditBgHome = ({
  imageId,
  url,
  setNewImage,
  children,
  isActualUploadedSame,
  fetchHomeData,
}) => {
  const [contentHidden, setContentHidden] = useState(false);
  const { homePageBg, setHomePageBg } = useHomePageBg();
  const [image, setImage] = useState(!isActualUploadedSame);
  const [creditName, setCreditName] = useState(""); // New state for credit name
  const dispatch = useDispatch();
  const { isEditing, setIsEditing } = useEditing();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const homePageDetail = useSelector((state) => state.homePageDetail);

  const handleUploadImage = (event) => {
    event.stopPropagation();
    const file = document.getElementById("edit-bg-home-" + imageId).files[0];
    setHomePageBg(file);
    if (file.type.startsWith("image/")) {
      console.log("image");
      dispatch(
        setNewImage({
          url: URL.createObjectURL(file),
          isVideo: false,
          isImage: true,
        })
      );
    } else {
      console.log("video");
      dispatch(
        setNewImage({
          url: URL.createObjectURL(file),
          isVideo: true,
          isImage: false,
        })
      );
    }
    setContentHidden(false);
    setImage(true);
  };

  const restoreImage = () => {
    setImage(false);
    dispatch(setNewImage());
  };

  const saveImage = async () => {
    if (!creditName.trim()) {
      showAlert("Please enter a credit name before saving.", "red");
      return;
    }

    const imageForm = new FormData();
    try {
      activate_loader(true);
      const response = await fetch(url);
      const blob = await response.blob();
      console.log("image id", imageId);

      if (homePageDetail["bg-video"].isVideo) {
        imageForm.append("video", homePageBg);
        imageForm.append("component_type", "video");
      } else {
        imageForm.append("image", homePageBg);
        imageForm.append("component_type", "image");
      }

      // Patch the credit information to the API
      imageForm.append(
        "credit",
        JSON.stringify({
          name: creditName,
          component_type: "text",
        })
      );

      const apiResponse = await axios.patch(
        baseUrl + "api/components/" + imageId + "/",
        imageForm
      );

      if (homePageDetail["bg-video"].isVideo) {
        console.log("Successfully uploaded the video");
        showAlert("Successfully changed the background video", "green");
      } else {
        console.log("Successfully uploaded the image");
        showAlert("Successfully changed the background image", "green");
      }

      setContentHidden(false);
      setImage(false);
      fetchHomeData();
    } catch (error) {
      console.error("Error saving image:", error);
      showAlert("Failed to save the image", "red");
    } finally {
      activate_loader(false);
    }
  };

  return (
    <>
      {children}
      {isEditing && (
        <div className="relative w-full max-h-full flex items-center justify-center h-[60px]">
          {!contentHidden && (
            <>
              {!image && (
                <div
                  className="h-full w-full flex items-center justify-center"
                  onClick={() => setContentHidden(true)}
                >
                  <div className="w-[80%] h-[80%] flex items-center justify-center bg-slate-600 rounded-lg cursor-pointer text-white px-5 py-3 fill-zinc-100 z-50 text-xl">
                    Click to Edit
                  </div>
                </div>
              )}
            </>
          )}
          {contentHidden && (
            <>
              <div className="flex flex-row gap-5 mx-5 items-center justify-center w-full">
                <label
                  className="w-[80%] h-[80%] bg-slate-600 rounded-lg flex flex-col items-center justify-center p-1 cursor-pointer"
                  htmlFor={"edit-bg-home-" + imageId}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon icon={faAdd} className="text-white" />
                  <div className="text-white text-[10px] md:text-[20px]">
                    Upload BackGround video or Image
                  </div>
                </label>
                <input
                  type="file"
                  accept=".jpg,.png,.mp4,.jpeg"
                  id={"edit-bg-home-" + imageId}
                  className="hidden"
                  onChange={handleUploadImage}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </>
          )}
          {image && (
            <div className="w-[80%] h-[80%] flex items-center justify-center text-white gap-5">
              <input
                type="text"
                placeholder="Enter credit name"
                value={creditName}
                onChange={(e) => setCreditName(e.target.value)}
                className="text-black px-4 py-2 rounded-md"
              />
              <div
                className="px-5 py-3 rounded-md cursor-pointer bg-red-600"
                onClick={restoreImage}
              >
                Remove
              </div>
              <div
                className="px-5 py-3 rounded-md cursor-pointer bg-green-600"
                onClick={saveImage}
              >
                Save
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
