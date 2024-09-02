import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    // Initialize formData when content changes
    setFormData({
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
  }, [content]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
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
      image: formData.img, // Default to the existing image URL
    };

    try {
      const formDataToSend = new FormData();
      // Append text data
      formDataToSend.append("id", payload.id);
      formDataToSend.append("title", JSON.stringify(payload.title));
      formDataToSend.append("text", JSON.stringify(payload.text));

      // Append image file if provided
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (payload.image) {
        // If no new image is provided but an old image exists, append the existing image URL
        formDataToSend.append("image", payload.image);
      }

      const response = await fetch(
        `https://ingnepal.org.np/api/about-us/${payload.id}/`,
        {
          method: "PATCH",
          body: formDataToSend,
          // Note: Content-Type is automatically set by FormData
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
      window.location.reload();
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
      {formData.img && !imageFile && (
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
