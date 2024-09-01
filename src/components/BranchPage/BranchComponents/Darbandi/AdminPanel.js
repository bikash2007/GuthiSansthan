import React, { useState } from 'react';

export default function AdminPanel({ tableData, onSaveData }) {
  const [localTableData, setLocalTableData] = useState(tableData);
  const [newRow, setNewRow] = useState({ position: '', count: '' });

  const handleAddRow = () => {
    setLocalTableData([...localTableData, newRow]);
    setNewRow({ position: '', count: '' });
  };

  const handleDeleteRow = (index) => {
    const updatedTableData = localTableData.filter((_, i) => i !== index);
    setLocalTableData(updatedTableData);
  };

  const handleChange = (index, key, value) => {
    const updatedTableData = localTableData.map((row, i) => (
      i === index ? { ...row, [key]: value } : row
    ));
    setLocalTableData(updatedTableData);
  };

  const handleSave = () => {
    onSaveData(localTableData);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-2xl col-md-12">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="text-lg tracking-wide text-white uppercase bg-blue-600">
            <th className="p-6 rounded-tl-lg border-e-4">पद</th>
            <th className="p-6">संख्या</th>
            <th className="p-6 rounded-tr-lg">Actions</th>
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
                  value={row.position}
                  onChange={(e) => handleChange(index, 'position', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <input
                  type="number"
                  value={row.count}
                  onChange={(e) => handleChange(index, 'count', e.target.value)}
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
                value={newRow.position}
                onChange={(e) => setNewRow({ ...newRow, position: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="New Position"
              />
            </td>
            <td className="p-4">
              <input
                type="number"
                value={newRow.count}
                onChange={(e) => setNewRow({ ...newRow, count: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="New Count"
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
