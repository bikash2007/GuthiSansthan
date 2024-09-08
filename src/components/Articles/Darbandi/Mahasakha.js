import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEditing } from "../../../context/EditingProvider";

const Mahasakha = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [name, setName] = useState({ English: "", Nepali: "" });
  const [mahasakhaData, setMahasakhaData] = useState([]);
  const { isEditing } = useEditing();

  useEffect(() => {
    // Fetch branch data
    axios
      .get("https://ingnepal.org.np/api/branches/")
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => console.error("Error fetching branches:", error));

    // Fetch Mahasakha data
    axios
      .get("https://ingnepal.org.np/api/mahasakha/")
      .then((response) => {
        setMahasakhaData(response.data);
      })
      .catch((error) => console.error("Error fetching Mahasakha data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      branch: selectedBranch || undefined,
      name: {
        English: name.English,
        Nepali: name.Nepali,
      },
    };

    axios
      .post("https://ingnepal.org.np/api/mahasakha/", data)
      .then((response) => {
        console.log("Data posted successfully:", response.data);
        setMahasakhaData([...mahasakhaData, response.data]); // Update UI
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  const handleRemove = (id) => {
    axios
      .delete(`https://ingnepal.org.np/api/mahasakha/${id}/`)
      .then(() => {
        setMahasakhaData(mahasakhaData.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error removing data:", error));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Mahasakha</h1>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label htmlFor="branch" className="block text-gray-700 mb-1">
              Branch
            </label>
            <select
              id="branch"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="block w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="englishName" className="block text-gray-700 mb-1">
              Name (English)
            </label>
            <input
              id="englishName"
              type="text"
              value={name.English}
              onChange={(e) => setName({ ...name, English: e.target.value })}
              className="block w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="nepaliName" className="block text-gray-700 mb-1">
              Name (Nepali)
            </label>
            <input
              id="nepaliName"
              type="text"
              value={name.Nepali}
              onChange={(e) => setName({ ...name, Nepali: e.target.value })}
              className="block w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      )}

      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Branch</th>
            <th className="py-2 px-4 border-b text-left">Name (English)</th>
            <th className="py-2 px-4 border-b text-left">Name (Nepali)</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mahasakhaData.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.branch}</td>
              <td className="py-2 px-4 border-b">{item.name.English}</td>
              <td className="py-2 px-4 border-b">{item.name.Nepali}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mahasakha;
