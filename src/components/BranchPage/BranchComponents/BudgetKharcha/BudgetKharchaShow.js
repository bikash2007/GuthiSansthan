import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { useEditing } from "../../../../context/EditingProvider";

const BudgetKharchaShow = () => {
  const [tableData, setTableData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("Baisakh");
  const [previousMonth, setPreviousMonth] = useState("Chaitra");
  const [previousMonthAmount, setPreviousMonthAmount] = useState("");
  const [currentMonthAmount, setCurrentMonthAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isEditing } = useEditing();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.142:8000/api/yearly-budget/"
        );
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

  const handlePatch = async () => {
    setError("");
    setSuccess("");

    try {
      // Assuming we want to patch a specific record, adapt the data accordingly
      await axios.patch("http://192.168.1.142:8000/api/yearly-budget/", {
        currentMonthAmount: parseFloat(currentMonthAmount),
        previousMonthAmount: parseFloat(previousMonthAmount),
      });

      setSuccess("Data updated successfully.");
    } catch (error) {
      console.error("Error updating data:", error);
      setError("Failed to update data. Please try again.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Budget Details
        </Typography>
        <Box mb={2}>
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
        </Box>
        {isEditing && (
          <>
            <Box mb={2}>
              <TextField
                label="Previous Month Amount"
                type="number"
                value={previousMonthAmount}
                onChange={(e) => setPreviousMonthAmount(e.target.value)}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Current Month Amount"
                type="number"
                value={currentMonthAmount}
                onChange={(e) => setCurrentMonthAmount(e.target.value)}
                fullWidth
              />
            </Box>
            <Button variant="contained" color="primary" onClick={handlePatch}>
              Update Amounts
            </Button>
          </>
        )}
        <Box mt={4}>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="text-lg font-semibold tracking-wide text-white uppercase bg-blue-700">
                <th className="p-4 border-gray-200 border-e-2">Year</th>
                <th className="p-4 border-gray-200 border-e-2">Title</th>
                <th className="p-4 border-gray-200 border-e-2">Description</th>
                <th className="p-4 border-gray-200 border-e-2">Amount</th>
                <th className="p-4 border-gray-200 border-e-2">
                  Remaining Amount
                </th>
                <th className="p-4 border-gray-200 border-e-2">
                  Previous Month ({previousMonth})
                </th>
                <th className="p-4 border-gray-200 border-e-2">
                  Current Month ({currentMonth})
                </th>
                <th className="p-4 border-gray-200 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
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
                    {/* Display the amount for the previous month */}
                    {row[previousMonth.toLowerCase()] || 0}
                  </td>
                  <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                    {/* Display the amount for the current month */}
                    {row[currentMonth.toLowerCase()] || 0}
                  </td>
                  <td className="p-4 text-gray-700">
                    {/* Add Edit and Delete buttons here */}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold bg-gray-100 border-t-2 border-gray-300">
                <td className="p-4 text-left border-e-2"></td>
                <td className="p-4 text-center border-gray-200 border-e-2">
                  Total
                </td>
                <td className="p-4 text-blue-700 border-e-2">
                  {/* Total values here if needed */}
                </td>
              </tr>
            </tfoot>
          </table>
        </Box>
      </Paper>
    </Container>
  );
};

export default BudgetKharchaShow;
