import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Typography,
  Container,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

const BudgetKharchaView = () => {
  const [tableData, setTableData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("Baisakh");
  const [previousMonth, setPreviousMonth] = useState("Chaitra");
  const [year, setYear] = useState("2079/80"); // Example of initial year
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  const months = [
    "Baisakh",
    "Jestha",
    "Ashadh",
    "Shrawan",
    "Bhadra",
    "Asoj",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
  ];

  const years = [
    "2079/80",
    "2080/81",
    "2081/82",
    "2082/83",
    // Add more years as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/yearly-budget/`);
        setTableData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setCurrentMonth(selectedMonth);

    // Determine the previous month
    const currentIndex = months.indexOf(selectedMonth);
    const previousMonth =
      months[(currentIndex - 1 + months.length) % months.length];
    setPreviousMonth(previousMonth);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          View Budget Data
        </Typography>

        {/* Year and Month Dropdowns */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Year"
              value={year}
              onChange={handleYearChange}
              fullWidth
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Current Month"
              value={currentMonth}
              onChange={handleMonthChange}
              fullWidth
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Data Display Table */}
        <Box mt={4} sx={{ overflowX: "auto" }}>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="text-lg font-semibold tracking-wide text-white uppercase bg-blue-700">
                <th className="p-4 border-gray-200 border-e-2">Year</th>
                <th className="p-4 border-gray-200 border-e-2">Title</th>
                <th className="p-4 border-gray-200 border-e-2">Description</th>
                <th className="p-4 border-gray-200 border-e-2">Budget</th>
                <th className="p-4 border-gray-200 border-e-2">
                  Remaining Amount
                </th>
                <th className="p-4 border-gray-200 border-e-2">
                  Previous Month ({previousMonth})
                </th>
                <th className="p-4 border-gray-200 border-e-2">
                  Current Month ({currentMonth})
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .filter((row) => row.year === year) // Filter by selected year
                .map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors duration-300 bg-white border-b-2 border-gray-300 hover:bg-blue-50 last:border-b-0"
                  >
                    <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                      {row.year}
                    </td>
                    <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                      {row.title}
                    </td>
                    <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                      {row.description}
                    </td>
                    <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                      {row.amount}
                    </td>
                    <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                      {row.remaining_amount}
                    </td>
                    <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                      {row[previousMonth.toLowerCase()] || 0}
                    </td>
                    <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                      {row[currentMonth.toLowerCase()] || 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Box>
      </Paper>
    </Container>
  );
};

export default BudgetKharchaView;
