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

const BudgetNikasaShow = () => {
  const [budgets, setBudgets] = useState([]);
  const { isEditing } = useEditing();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.142:8000/api/yearly-budget/"
        );
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.142:8000/api/yearly-budget/${id}/`);
      setBudgets(budgets.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

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
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default BudgetNikasaShow;
