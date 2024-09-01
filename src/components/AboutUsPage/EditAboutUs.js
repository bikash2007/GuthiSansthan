import React, { useState } from "react";

const EditAboutUs = ({ content, toggleEditMode }) => {
  const [formData, setFormData] = useState({
    id: content.id,
    titleEnglish: content.title.English || "",
    titleNepali: content.title.Nepali || "",
    titleNewari: content.title.Newari || "",
    titleMithila: content.title.Mithila || "",
    textEnglish: content.text.English || "",
    textNepali: content.text.Nepali || "",
    textNewari: content.text.Newari || "",
    textMithila: content.text.Mithila || "",
    img: content.image || "",
  });

  const [imageFile, setImageFile] = useState(null); // State to hold the selected image file
  const [language, setLanguage] = useState("English"); // Default language

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Upload the image and get the URL
      const imageUrl = await setImageFile(file); // Use the defined uploadImage function
      if (imageUrl) {
        setFormData({
          ...formData,
          img: imageUrl,
        });
      }
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setFormData({
      ...formData,
      [`title${selectedLanguage}`]: content.title[selectedLanguage] || "",
      [`text${selectedLanguage}`]: content.text[selectedLanguage] || "",
    });
  };

  const handleFormSubmit = async () => {
    const payload = {
      id: formData.id,
      title: {
        English: formData.titleEnglish,
        Nepali: formData.titleNepali,
        Newari: formData.titleNewari,
        Mithila: formData.titleMithila,
      },
      text: {
        English: formData.textEnglish,
        Nepali: formData.textNepali,
        Newari: formData.textNewari,
        Mithila: formData.textMithila,
      },
      image: formData.img, // This should be a URL or base64 string if the API expects an image URL
    };

    try {
      const response = await fetch(
        `https://ingnepal.org.np/api/about-us/${payload.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Include any necessary authentication headers
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(
          `Failed to update content. Status: ${response.status}. Details: ${errorDetails}`
        );
        throw new Error(`Failed to update content: ${response.statusText}`);
      }

      const updatedContent = await response.json();
      console.log("Edited content:", updatedContent);

      toggleEditMode(); // Close the edit form after saving
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h2>Edit About Us</h2>

      <div className="mb-2">
        <label htmlFor="language" className="mr-2">
          Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border rounded"
        >
          {Object.keys(content.title).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        name={`title${language}`}
        value={formData[`title${language}`]}
        onChange={handleInputChange}
        placeholder={`Title in ${language}`}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name={`text${language}`}
        value={formData[`text${language}`]}
        onChange={handleInputChange}
        placeholder={`Text in ${language}`}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded mb-2"
      />
      {formData.img && (
        <img src={formData.img} alt="Selected" className="w-1/2 h-auto mb-2" />
      )}
      <button
        onClick={handleFormSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default EditAboutUs;
