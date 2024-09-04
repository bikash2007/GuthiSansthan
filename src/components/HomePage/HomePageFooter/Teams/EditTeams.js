import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTeams = ({ teamMember }) => {
  const [teamData, setTeamData] = useState({
    first_name: { English: "", Newari: "", Nepali: "", Mithila: "" },
    last_name: { English: "", Newari: "", Nepali: "", Mithila: "" },
    photo: null,
    position: { English: "", Newari: "", Nepali: "", Mithila: "" },
    post: { English: "", Newari: "", Nepali: "", Mithila: "" },
    branch: { English: "", Newari: "", Nepali: "", Mithila: "" },
  });

  useEffect(() => {
    if (teamMember) {
      setTeamData({
        first_name: teamMember.first_name || {
          English: "",
          Newari: "",
          Nepali: "",
          Mithila: "",
        },
        last_name: teamMember.last_name || {
          English: "",
          Newari: "",
          Nepali: "",
          Mithila: "",
        },
        photo: null, // Handle photo separately
        position: teamMember.position || {
          English: "",
          Newari: "",
          Nepali: "",
          Mithila: "",
        },
        post: teamMember.post || {
          English: "",
          Newari: "",
          Nepali: "",
          Mithila: "",
        },
        branch: teamMember.branch || {
          English: "",
          Newari: "",
          Nepali: "",
          Mithila: "",
        },
      });
    }
  }, [teamMember]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append photo file if exists
    if (teamData.photo) {
      formData.append("photo", teamData.photo);
    }

    // Append text data
    for (const key in teamData) {
      if (key !== "photo") {
        formData.append(key, JSON.stringify(teamData[key]));
      }
    }

    try {
      await axios.patch(
        `https://ingnepal.org.np/api/teams/${teamMember.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
      console.log("Team member updated successfully!");
      // Handle success, e.g., notify user or update the UI
    } catch (error) {
      console.error("There was an error updating the team member!", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl text-white font-bold mb-6">Edit Team Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(teamData).map(
          (key) =>
            key !== "photo" && (
              <div key={key}>
                <h3 className="text-white font-semibold capitalize">{key}</h3>
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTeams;
