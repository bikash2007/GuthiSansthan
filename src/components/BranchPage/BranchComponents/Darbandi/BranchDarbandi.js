import React, { useEffect, useState } from "react";

export default function BranchDarbandi({ branchId }) {
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [totalNumber, setTotalNumber] = useState(0);

  // Fetch data from the API
  useEffect(() => {
    async function fetchDarbandiData() {
      try {
        const response = await fetch(
          `http://192.168.1.142:8000/api/darbandi/?branch=${branchId}`
        );
        const data = await response.json();

        const totalAssigned = data.reduce(
          (acc, item) => acc + item.assigned_number,
          0
        );
        setTotalNumber(totalAssigned);
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDarbandiData();
  }, [branchId]);

  const handleInputChange = (index, value) => {
    const newTableData = [...tableData];
    newTableData[index].assigned_number = value;
    setTableData(newTableData);
  };

  const saveChanges = async (row) => {
    try {
      const response = await fetch(
        `http://192.168.1.142:8000/api/darbandi/${row.id}/change-assigned-number/`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assigned_number: row.assigned_number,
          }),
        }
      );
      if (response.ok) {
        alert("Changes saved successfully");
        setEditingRow(null);
      } else {
        alert("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const deleteRow = async (id) => {
    try {
      const response = await fetch(
        `http://192.168.1.142:8000/api/darbandi/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setTableData((prevData) => prevData.filter((row) => row.id !== id));
        alert("Row deleted successfully");
      } else {
        alert("Failed to delete row");
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-full p-8 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="text-lg font-semibold tracking-wide text-white uppercase bg-blue-700">
            <th className="p-4 border-gray-200 rounded-tl-lg border-e-2">पद</th>
            <th className="p-4 border-gray-200">Assigned Number</th>
            <th className="p-4 border-gray-200">Fulfilled Number</th>
            <th className="p-4 border-gray-200 rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="transition-colors duration-300 bg-white border-b-2 border-gray-300 hover:bg-blue-50 last:border-b-0"
            >
              <td className="p-4 text-gray-700 border-gray-200 border-e-2">{`Post ${row.post}`}</td>
              <td className="p-4 text-gray-700">
                {editingRow === index ? (
                  <input
                    type="number"
                    value={row.assigned_number}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                ) : (
                  row.assigned_number
                )}
              </td>
              <td className="p-4 text-gray-700">{row.fulfilled_number}</td>
              <td className="p-4">
                {editingRow === index ? (
                  <button
                    className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                    onClick={() => saveChanges(row)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => setEditingRow(index)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="px-4 py-2 ml-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={() => deleteRow(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold bg-gray-100 border-t-2 border-gray-300">
            <td className="p-4 border-gray-200 border-e-2">Total</td>
            <td className="p-4 text-blue-700">{totalNumber}</td>
            <td className="p-4 text-blue-700">-</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
