import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const GallaryForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [credit, setCredit] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [fileType, setFileType] = useState("image");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (fileType === "image") {
        setImage(file);
        setVideo(null); // Clear video if switching to image
      } else {
        setVideo(file);
        setImage(null); // Clear image if switching to video
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start the loader

    const formData = new FormData();
    formData.append("title", title);
    formData.append("credit", credit);
    if (fileType === "image" && image) {
      formData.append("image", image);
    } else if (fileType === "video" && video) {
      formData.append("video", video);
    }

    try {
      const response = await axios.post(`${baseUrl}api/gallery/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Check if the response status is 201
      if (response.status === 201) {
        onSuccess(); // Notify parent component to refresh data
        // Reset form fields
        setTitle("");
        setCredit("");
        setImage(null);
        setVideo(null);
        setFileType("image");
      }
    } catch (error) {
      console.error("Error posting gallery item:", error);
      setError("Failed to post gallery item. Please try again.");
    } finally {
      setLoading(false); // Stop the loader in all cases
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Add New Gallery Item
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Credit"
        value={credit}
        onChange={(e) => setCredit(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>File Type</InputLabel>
        <Select
          value={fileType}
          onChange={(e) => {
            setFileType(e.target.value);
            setImage(null); // Clear image if switching to video
            setVideo(null); // Clear video if switching to image
          }}
        >
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="video">Video</MenuItem>
        </Select>
      </FormControl>
      <input
        accept={fileType === "image" ? "image/*" : "video/*"}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="upload-file"
      />
      <label htmlFor="upload-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ marginBottom: 2 }}
        >
          Upload {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
        </Button>
      </label>
      {image && (
        <Box
          sx={{ marginBottom: 2, textAlign: "center", position: "relative" }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          />
          <IconButton
            onClick={() => setImage(null)}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Box>
      )}
      {video && (
        <Box
          sx={{ marginBottom: 2, textAlign: "center", position: "relative" }}
        >
          <video
            src={URL.createObjectURL(video)}
            controls
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          />
          <IconButton
            onClick={() => setVideo(null)}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Box>
      )}
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginRight: 1 }}
          disabled={loading} // Disable the button during loading
        >
          Submit
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "primary.main",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          setTitle("");
          setCredit("");
          setImage(null);
          setVideo(null);
          setFileType("image");
        }}
        disabled={loading} // Disable clear button during loading
      >
        Clear
      </Button>
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default GallaryForm;
