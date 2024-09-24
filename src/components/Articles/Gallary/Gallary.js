import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Alert,
  Paper,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import GallaryForm from "./GallaryForm";
import { useSelector } from "react-redux";
import { useEditing } from "../../../context/EditingProvider";

const Gallary = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  const { isEditing } = useEditing();

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/gallery/`);
        setGalleryItems(response.data);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
        setError("Failed to fetch gallery items.");
      }
    };

    fetchGalleryItems();
  }, [baseUrl]);

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop(); // Use the file name as the download name
    link.click();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${baseUrl}api/gallery/${id}/`);
        setGalleryItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      } catch (error) {
        console.error("Error deleting gallery item:", error);
        setError("Failed to delete gallery item.");
      }
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {isEditing && (
        <>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(!showForm)}
            sx={{ marginBottom: 2 }}
          >
            {showForm ? "Close Form" : "Add New Item"}
          </Button>
          {showForm && <GallaryForm />}
        </>
      )}

      <Grid container spacing={2}>
        {galleryItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Card sx={{ height: 300, width: "100%" }}>
                {item.image && (
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      height: 200, // Fixed height for consistency
                      width: "100%", // Full width of the card
                      objectFit: "cover", // Ensures image covers the area without distorting
                    }}
                  />
                )}
                {item.video && (
                  <CardMedia
                    component="video"
                    controls
                    src={item.video}
                    alt={item.title}
                    sx={{
                      height: 200,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.credit}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 2,
                    }}
                  >
                    {item.image && (
                      <IconButton onClick={() => handleDownload(item.image)}>
                        <FontAwesomeIcon icon={faEye} />
                      </IconButton>
                    )}
                    {item.video && (
                      <IconButton onClick={() => handleDownload(item.video)}>
                        <FontAwesomeIcon icon={faEye} />
                      </IconButton>
                    )}
                    {isEditing && (
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </IconButton>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallary;
