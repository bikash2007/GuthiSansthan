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
import { useSelector } from "react-redux";

const BudgetKharchaShow = () => {
  const [tableData, setTableData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("Baisakh");
  const [previousMonth, setPreviousMonth] = useState("Chaitra");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isEditing } = useEditing();
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

  const handleInputChange = (id, field, value) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: parseFloat(value) } : row
      )
    );
  };

  const handlePatch = async () => {
    setError("");
    setSuccess("");

    try {
      // Sending updated table data back to the server
      await Promise.all(
        tableData.map((row) =>
          axios.patch(`${baseUrl}api/yearly-budget/${row.id}/`, {
            amount: row.amount,
            [previousMonth.toLowerCase()]: row[previousMonth.toLowerCase()],
            [currentMonth.toLowerCase()]: row[currentMonth.toLowerCase()],
          })
        )
      );

      setSuccess("Data updated successfully.");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Check if the error is due to the amount exceeding the budget
        alert("You have entered more amount than the budget.");
      } else {
        console.error("Error updating data:", error);
        setError("Failed to update data. Please try again.");
      }
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
                    <TextField
                      type="number"
                      value={row.amount}
                      onChange={(e) =>
                        handleInputChange(row.id, "amount", e.target.value)
                      }
                      fullWidth
                      InputProps={{
                        sx: { padding: "8px" }, // Adjust padding to avoid hiding input
                      }}
                    />
                  </td>
                  <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                    {row.remaining_amount}
                  </td>
                  <td className="py-3 text-gray-700 border-gray-200 border-e-2">
                    <TextField
                      type="number"
                      value={row[previousMonth.toLowerCase()] || 0}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          previousMonth.toLowerCase(),
                          e.target.value
                        )
                      }
                      fullWidth
                      InputProps={{
                        sx: { padding: "8px" }, // Adjust padding to avoid hiding input
                      }}
                    />
                  </td>
                  <td className="p-4 text-gray-700 border-gray-200 border-e-2">
                    <TextField
                      type="number"
                      value={row[currentMonth.toLowerCase()] || 0}
                      onChange={(e) =>
                        handleInputChange(
                          row.id,
                          currentMonth.toLowerCase(),
                          e.target.value
                        )
                      }
                      fullWidth
                      InputProps={{
                        sx: { padding: "8px" }, // Adjust padding to avoid hiding input
                      }}
                    />
                  </td>
                  <td className="p-4 text-gray-700">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePatch}
                    >
                      Save
                    </Button>
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
