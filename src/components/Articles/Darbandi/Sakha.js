import React, { useEffect, useState } from "react";
import axios from "axios";
import { useEditing } from "../../../context/EditingProvider";
import { useSelector } from "react-redux";

const Sakha = () => {
  const [branches, setBranches] = useState([]);
  const [sakha, setSakha] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [name, setName] = useState({ English: "", Nepali: "" });
  const [editSakha, setEditSakha] = useState(null);
  const { isEditing } = useEditing();
  const baseUrl = useSelector((state) => state.baseUrl).backend;
  useEffect(() => {
    // Fetch branches
    axios
      .get(`${baseUrl}api/branches/`)
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => console.error("Error fetching branches:", error));

    // Fetch existing Sakha data
    axios
      .get(`${baseUrl}api/sakha/`)
      .then((response) => {
        setSakha(response.data);
      })
      .catch((error) => console.error("Error fetching sakha data:", error));
  }, []);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleNameChange = (event) => {
    setName({ ...name, [event.target.name]: event.target.value });
  };

  const handleAddSakha = () => {
    const postData = {
      branch: selectedBranch || undefined,
      name,
    };

    axios
      .post(`${baseUrl}api/sakha/`, postData)
      .then(() => {
        // Refresh Sakha data
        axios
          .get(`${baseUrl}api/sakha/`)
          .then((response) => setSakha(response.data))
          .catch((error) => console.error("Error fetching sakha data:", error));
      })
      .catch((error) => console.error("Error posting sakha data:", error));
  };

  const handleRemoveSakha = (id) => {
    axios
      .delete(`${baseUrl}api/sakha/${id}/`)
      .then(() => {
        // Refresh Sakha data
        axios
          .get(`${baseUrl}api/sakha/`)
          .then((response) => setSakha(response.data))
          .catch((error) => console.error("Error fetching sakha data:", error));
      })
      .catch((error) => console.error("Error removing sakha data:", error));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sakha Management</h2>
      {isEditing && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Add New Sakha</h3>
          <div className="mb-2">
            <label className="block mb-1">Branch:</label>
            <select
              value={selectedBranch}
              onChange={handleBranchChange}
              className="p-2 border rounded"
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Name (English):</label>
            <input
              type="text"
              name="English"
              value={name.English}
              onChange={handleNameChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Name (Nepali):</label>
            <input
              type="text"
              name="Nepali"
              value={name.Nepali}
              onChange={handleNameChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            onClick={handleAddSakha}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Sakha
          </button>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Sakha</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Branch</th>
              <th className="border p-2">Name (English)</th>
              <th className="border p-2">Name (Nepali)</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sakha.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">
                  {item.branch
                    ? branches.find((branch) => branch.id === item.branch)?.name
                    : "N/A"}
                </td>
                <td className="border p-2">{item.name.English}</td>
                <td className="border p-2">{item.name.Nepali}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleRemoveSakha(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sakha;
