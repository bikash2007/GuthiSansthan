import React, { useState } from 'react';

export default function Admin({ tableData, onSaveData }) {
  const [localTableData, setLocalTableData] = useState(tableData);
  const [newRow, setNewRow] = useState({
    head: '',
    details: '',
    cash: '',
    priviousmonth: '',
    currentmonth: '',
    leftbudget: ''
  });

  const handleAddRow = () => {
    if (Object.values(newRow).every(value => value.trim() !== '')) {
      setLocalTableData([...localTableData, newRow]);
      setNewRow({
        head: '',
        details: '',
        cash: '',
        priviousmonth: '',
        currentmonth: '',
        leftbudget: ''
      });
    } else {
      alert('Please fill all fields before adding a new row.');
    }
  };

  const handleDeleteRow = (index) => {
    const updatedTableData = localTableData.filter((_, i) => i !== index);
    setLocalTableData(updatedTableData);
  };

  const handleChange = (index, key, value) => {
    const updatedTableData = localTableData.map((row, i) =>
      i === index ? { ...row, [key]: value } : row
    );
    setLocalTableData(updatedTableData);
  };

  const handleSave = () => {
    // Perform any validation or data processing here if needed
    onSaveData(localTableData);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-2xl">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="text-lg tracking-wide text-white uppercase bg-blue-600">
            <th className="p-4 border-gray-200 border-e-4">शीर्षक</th>
            <th className="p-4 border-gray-200 border-e-4">विवरण</th>
            <th className="p-4 border-gray-200 border-e-4">रकम</th>
            <th className="p-4 border-gray-200 border-e-4">वैशाखको खर्च</th>
            <th className="p-4 border-gray-200 border-e-4">जेठको खर्च</th>
            <th className="p-4 border-gray-200 border-e-4">बाँकी बजेट</th>
            <th className="p-4 rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {localTableData.map((row, index) => (
            <tr
              key={index}
              className="transition-colors duration-300 bg-gray-100 border-b-2 hover:bg-blue-50 last:border-b-0"
            >
              <td className="p-4 border-e-4">
                <input
                  type="text"
                  value={row.head}
                  onChange={(e) => handleChange(index, 'head', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <input
                  type="text"
                  value={row.details}
                  onChange={(e) => handleChange(index, 'details', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <input
                  type="text"
                  value={row.cash}
                  onChange={(e) => handleChange(index, 'cash', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <input
                  type="text"
                  value={row.priviousmonth}
                  onChange={(e) => handleChange(index, 'priviousmonth', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <input
                  type="text"
                  value={row.currentmonth}
                  onChange={(e) => handleChange(index, 'currentmonth', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <input
                  type="text"
                  value={row.leftbudget}
                  onChange={(e) => handleChange(index, 'leftbudget', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="px-4 py-2 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="p-4 border-e-4">
              <input
                type="text"
                value={newRow.head}
                onChange={(e) => setNewRow({ ...newRow, head: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="New head"
              />
            </td>
            <td className="p-4 border-e-4">
              <input
                type="text"
                value={newRow.details}
                onChange={(e) => setNewRow({ ...newRow, details: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="New details"
              />
            </td>
            <td className="p-4 border-e-4">
              <input
                type="text"
                value={newRow.cash}
                onChange={(e) => setNewRow({ ...newRow, cash: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Cash"
              />
            </td>
            <td className="p-4 border-e-4">
              <input
                type="text"
                value={newRow.priviousmonth}
                onChange={(e) => setNewRow({ ...newRow, priviousmonth: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Previous month expenditure"
              />
            </td>
            <td className="p-4 border-e-4">
              <input
                type="text"
                value={newRow.currentmonth}
                onChange={(e) => setNewRow({ ...newRow, currentmonth: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Current month expenditure"
              />
            </td>
            <td className="p-4 border-e-4">
              <input
                type="text"
                value={newRow.leftbudget}
                onChange={(e) => setNewRow({ ...newRow, leftbudget: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Left Budget"
              />
            </td>
            <td className="p-4">
              <button
                onClick={handleAddRow}
                className="px-4 py-2 text-white bg-green-500 rounded"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg"
      >
        Save Data
      </button>
    </div>
  );
}
