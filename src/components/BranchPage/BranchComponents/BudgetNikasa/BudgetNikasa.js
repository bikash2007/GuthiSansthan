import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  MenuItem, // Ensure this import is present
  Typography,
  Container,
  Paper,
  Box,
  CircularProgress, // Import CircularProgress for the loader
} from "@mui/material";
import BudgetNikasaShow from "./BudgetNikasaShow";
import { useEditing } from "../../../../context/EditingProvider";

const BudgetNikasa = ({ branchId = 1 }) => {
  const [year, setYear] = useState("2081/82");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const { isEditing } = useEditing();

  // Generate years from 2081/82 to 2181/82
  const generateYears = () => {
    const years = [];
    for (let i = 2081; i <= 2181; i++) {
      years.push(`${i}/${i + 1 - 2000}`);
    }
    return years;
  };

  const years = generateYears();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error state
    setSuccess(""); // Reset success state
    setLoading(true); // Set loading to true

    if (!branchId) {
      setError("Branch ID is not provided.");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.142:8000/api/yearly-budget/",
        {
          branch: branchId, // Use branchId directly
          year,
          title,
          description,
          amount: parseFloat(amount), // Ensure amount is a number
        }
      );

      if (response.status === 201) {
        setSuccess("Budget added successfully.");
        setTitle("");
        setDescription("");
        setAmount("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding budget:", error);
      setError("Failed to add budget. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container>
      <BudgetNikasaShow />
      {isEditing && (
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add Budget
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                select
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                fullWidth
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mb={2}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
            </Box>
            {error && (
              <Typography color="error" mb={2}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success.main" mb={2}>
                {success}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Budget"}
            </Button>
          </form>
        </Paper>
      )}
    </Container>
  );
};

// Define prop types
BudgetNikasa.propTypes = {
  branchId: PropTypes.number.isRequired,
};

export default BudgetNikasa;
