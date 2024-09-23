import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Container,
  Paper,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BudgetNikasaShow from "./BudgetNikasaShow";
import { useEditing } from "../../../../context/EditingProvider";
import { useSelector } from "react-redux";

const BudgetNikasa = ({ branchId }) => {
  const [budgets, setBudgets] = useState([
    { year: "2081/82", title: "", description: "", amount: "" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { isEditing } = useEditing();
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  const generateYears = () => {
    const years = [];
    for (let i = 2081; i <= 2181; i++) {
      years.push(`${i}/${i + 1 - 2000}`);
    }
    return years;
  };

  const years = generateYears();

  const handleChange = (index, field, value) => {
    const newBudgets = [...budgets];
    newBudgets[index][field] = value;
    setBudgets(newBudgets);
  };

  const handleAddBudget = () => {
    setBudgets([
      ...budgets,
      { year: "2081/82", title: "", description: "", amount: "" },
    ]);
  };

  const handleRemoveBudget = (index) => {
    const newBudgets = budgets.filter((_, i) => i !== index);
    setBudgets(newBudgets);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!branchId) {
      setError("Branch ID is not provided.");
      setLoading(false);
      return;
    }

    try {
      for (const budget of budgets) {
        if (budget.title && budget.description && budget.amount) {
          await axios.post(`${baseUrl}api/yearly-budget/`, {
            branch: branchId,
            year: budget.year,
            title: budget.title,
            description: budget.description,
            amount: parseFloat(budget.amount),
          });
        }
      }
      setSuccess("Budgets added successfully.");
      setBudgets([{ year: "2081/82", title: "", description: "", amount: "" }]); // Reset form
    } catch (error) {
      console.error("Error adding budgets:", error);
      setError("Failed to add budgets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total amount
  const totalAmount = budgets.reduce((total, budget) => {
    const amount = parseFloat(budget.amount) || 0;
    return total + amount;
  }, 0);

  return (
    <Container>
      <BudgetNikasaShow />
      {isEditing && (
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add Budgets
          </Typography>
          <form onSubmit={handleSubmit}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {budgets.map((budget, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          select
                          value={budget.year}
                          onChange={(e) =>
                            handleChange(index, "year", e.target.value)
                          }
                          fullWidth
                        >
                          {years.map((year) => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={budget.title}
                          onChange={(e) =>
                            handleChange(index, "title", e.target.value)
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={budget.description}
                          onChange={(e) =>
                            handleChange(index, "description", e.target.value)
                          }
                          fullWidth
                          multiline
                          rows={2}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={budget.amount}
                          onChange={(e) =>
                            handleChange(index, "amount", e.target.value)
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleRemoveBudget(index)}
                          color="error"
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" mt={2}>
              Total Amount: {totalAmount}
            </Typography>
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
              onClick={handleAddBudget}
            >
              Add Another Budget
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              sx={{ ml: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Submit Budgets"}
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
