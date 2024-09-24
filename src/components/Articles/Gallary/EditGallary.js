import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const EditGallary = ({ galleryId }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    video: null,
    credit: "",
  });

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const response = await axios.get(
          `https://ingnepal.org.np/api/gallery/${galleryId}/`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch gallery item:", error);
      }
    };

    fetchGalleryItem();
  }, [galleryId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("image", formData.image);
    data.append("video", formData.video);
    data.append("credit", formData.credit);

    try {
      await axios.patch(
        `https://ingnepal.org.np/api/gallery/${galleryId}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Gallery item updated successfully");
    } catch (error) {
      console.error("Error updating gallery item:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image"
        name="image"
        type="file"
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Video"
        name="video"
        type="file"
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Credit"
        name="credit"
        value={formData.credit}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Update Gallery
      </Button>
    </Box>
  );
};

export default EditGallary;
