import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useEditing } from "../../../../context/EditingProvider";
import { useSelector } from "react-redux";

const BudgetNikasaShow = () => {
  const [budgets, setBudgets] = useState([]);
  const { isEditing } = useEditing();
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/yearly-budget/`);
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}api/yearly-budget/${id}/`);
      setBudgets(budgets.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  // Calculate total amount
  const totalAmount = budgets.reduce(
    (total, budget) => total + (budget.amount || 0),
    0
  );

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Budget List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                {isEditing && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.year}</TableCell>
                  <TableCell>{budget.title}</TableCell>
                  <TableCell>{budget.description}</TableCell>
                  <TableCell>{budget.amount}</TableCell>
                  {isEditing && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(budget.id)}
                      >
                        Delete
                      </Button>
                      {/* Add edit functionality here */}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: "right" }}>
                  <strong>Total:</strong>
                </TableCell>
                <TableCell>
                  <strong>{totalAmount}</strong>
                </TableCell>
                {isEditing && <TableCell />}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default BudgetNikasaShow;
