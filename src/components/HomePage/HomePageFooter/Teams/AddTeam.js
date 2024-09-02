import React, { useState } from "react";
import axios from "axios";

const AddTeam = () => {
  const [teamData, setTeamData] = useState({
    first_name: { English: "", Newari: "", Nepali: "", Mithila: "" },
    last_name: { English: "", Newari: "", Nepali: "", Mithila: "" },
    photo: null, // File type for the photo
    position: { English: "", Newari: "", Nepali: "", Mithila: "" },
    post: { English: "", Newari: "", Nepali: "", Mithila: "" }, // Optional
    branch: { English: "", Newari: "", Nepali: "", Mithila: "" }, // Updated to match JSON structure
  });

  const handleChange = (e, key, lang = null) => {
    if (key === "photo") {
      setTeamData((prevData) => ({
        ...prevData,
        photo: e.target.files ? e.target.files[0] : null,
      }));
    } else if (lang) {
      setTeamData((prevData) => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          [lang]: e.target.value,
        },
      }));
    } else {
      setTeamData((prevData) => ({
        ...prevData,
        [key]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append photo file
    if (teamData.photo) {
      formData.append("photo", teamData.photo);
    }

    // Append text data
    for (const key in teamData) {
      if (key !== "photo") {
        formData.append(key, JSON.stringify(teamData[key]));
      }
    }

    // Post data to the teams API
    axios
      .post("https://ingnepal.org.np/api/teams/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Team member added successfully:", response.data);
        // Clear the form or provide feedback to the user
      })
      .catch((error) => {
        console.error("There was an error adding the team member!", error);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl text-white font-bold mb-6">Add Team Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(teamData).map(
          (key) =>
            key !== "photo" && (
              <div key={key}>
                <h3 className="text-white font-semibold capitalize">{key}</h3>
                {key === "branch" ? (
                  <div className="grid grid-cols-2 gap-4">
                    {["English", "Newari", "Nepali", "Mithila"].map((lang) => (
                      <div key={lang} className="flex flex-col">
                        <label className="text-gray-300">{lang}:</label>
                        <input
                          type="text"
                          value={teamData[key][lang]}
                          onChange={(e) => handleChange(e, key, lang)}
                          className="p-2 bg-gray-700 text-white rounded"
                          placeholder={`Enter ${key} in ${lang}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {["English", "Newari", "Nepali", "Mithila"].map((lang) => (
                      <div key={lang} className="flex flex-col">
                        <label className="text-gray-300">{lang}:</label>
                        <input
                          type="text"
                          value={teamData[key][lang]}
                          onChange={(e) => handleChange(e, key, lang)}
                          className="p-2 bg-gray-700 text-white rounded"
                          placeholder={`Enter ${key} in ${lang}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
        )}

        <div>
          <h3 className="text-white font-semibold">Photo</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e, "photo")}
            className="block w-full text-gray-300 bg-gray-700 rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition duration-300"
        >
          Add Team Member
        </button>
      </form>
    </div>
  );
};

export default AddTeam;
