import React, { useState, useEffect } from "react";
import BudgetNikasa from "./BudgetNikasa";
import BudgetNikasaShow from "./BudgetNikasaShow";
import axios from "axios";
import { Container, Paper, Typography, Grid } from "@mui/material";

const Admin = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.142:8000/api/branches/"
        );
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <BudgetNikasa branches={branches} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <BudgetNikasaShow />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
