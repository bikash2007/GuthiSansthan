import React, { useState, useEffect } from "react";
import axios from "axios";

const Mahasakha = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [name, setName] = useState({ English: "", Nepali: "" });
  const [mahasakhaData, setMahasakhaData] = useState([]);

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
        // Optionally fetch updated data
        // fetchMahasakhaData();
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  const handleRemove = (id) => {
    axios
      .delete(`https://ingnepal.org.np/api/mahasakha/${id}/`)
      .then((response) => {
        console.log("Data removed successfully:", response.data);
        // Update state to reflect removal
        setMahasakhaData(mahasakhaData.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error removing data:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mahasakha</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="branch" className="block text-gray-700">
            Branch
          </label>
          <select
            id="branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="englishName" className="block text-gray-700">
            Name (English)
          </label>
          <input
            id="englishName"
            type="text"
            value={name.English}
            onChange={(e) => setName({ ...name, English: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nepaliName" className="block text-gray-700">
            Name (Nepali)
          </label>
          <input
            id="nepaliName"
            type="text"
            value={name.Nepali}
            onChange={(e) => setName({ ...name, Nepali: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Branch</th>
            <th className="py-2 px-4 border-b">Name (English)</th>
            <th className="py-2 px-4 border-b">Name (Nepali)</th>
            <th className="py-2 px-4 border-b">Actions</th>
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
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
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
