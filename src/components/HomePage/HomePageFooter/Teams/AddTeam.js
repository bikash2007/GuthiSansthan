import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const AddTeam = () => {
  const [image1, setImage1] = useState(null);

  const handleImageChange1 = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage1(URL.createObjectURL(new Blob([e.target.result])));
    };
    if (e.target.files[0]) reader.readAsArrayBuffer(e.target.files[0]);
  };

  const uploadPersonDetail = async () => {
    const person1Name = document.getElementById(
      "teams-input-person-1-name"
    ).value;
    const person1Post = document.getElementById(
      "teams-input-person-1-position"
    ).value;
    const person1Image = document.getElementById("teams-input-person-1-image")
      .files[0];

    // Creating form data to include the image file
    const formData = new FormData();
    formData.append(
      "user_detail",
      JSON.stringify({
        username: person1Name,
        // Add other necessary user details here, or fetch from relevant inputs
        email: `${person1Name.toLowerCase()}@guthi.com`,
        first_name: person1Name.split(" ")[0],
        last_name: person1Name.split(" ")[1] || "",
        group: [
          { id: 1, name: "admin", permissions: [] },
          { id: 2, name: "RegularUsers", permissions: [] },
        ],
        is_superuser: false,
        profile: {
          contact_no: null,
          photo: person1Image,
          branch: 1,
        },
      })
    );
    formData.append("position", person1Post);
    formData.append(
      "quote",
      JSON.stringify({
        English: "Your English quote here",
        Mithila: "Your Mithila quote here",
        Nepali: "Your Nepali quote here",
        Newari: "Your Newari quote here",
      })
    );
    formData.append("user", 9); // Replace with actual user ID or dynamically fetch

    try {
      const response = await axios.post(
        "https://ingnepal.org.np/api/teams/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Data successfully posted!");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to post data.");
    }
  };

  return (
    <>
      <div className="py-2 w-full flex flex-row p-2 items-center justify-center bg-cyan-400/30 border-b-2 border-white pb-5">
        <div className="relative flex flex-col justify-center gap-2">
          {image1 && (
            <FontAwesomeIcon
              icon={faClose}
              size={"2x"}
              className="cursor-pointer absolute top-0 right-0 text-white bg-red-600 rounded-full z-50 h-[30px] w-[30px]"
              onClick={() => setImage1(null)}
            />
          )}
          {!image1 && (
            <label
              htmlFor="teams-input-person-1-image"
              className="rounded-full h-[80px] w-[80px] md:h-[200px] md:w-[200px] bg-gray-400 flex items-center justify-center text-white font-bold"
            >
              <FontAwesomeIcon icon={faPlus} size="3x" />
            </label>
          )}
          <input
            id="teams-input-person-1-image"
            type="file"
            accept=".png,.jpeg,.jpg"
            className="hidden"
            onChange={handleImageChange1}
          />
          {image1 && (
            <img
              src={image1}
              className="rounded-full h-[80px] w-[80px] md:h-[200px] md:w-[200px]"
              alt="Person's Image"
            />
          )}
          <input
            id="teams-input-person-1-position"
            type="text"
            placeholder="Person Post"
            className="rounded-md text-[20px] text-black p-2"
          />
          <input
            id="teams-input-person-1-name"
            type="text"
            placeholder="Person Name"
            className="rounded-md text-[20px] text-black p-2"
          />
        </div>

        <div
          className={`relative h-full w-[70%] flex flex-col justify-center items-center overflow-hidden`}
        >
          <div
            className="cursor-pointer bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-[20px]"
            onClick={uploadPersonDetail}
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};
