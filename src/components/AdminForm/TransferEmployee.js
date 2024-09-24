import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const TransferEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [darbandi, setDarbandi] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDarbandi, setSelectedDarbandi] = useState("");
  const [transferReason, setTransferReason] = useState("");
  const [transferType, setTransferType] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/profiles/`);
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [baseUrl]);

  // Fetch branches when the component mounts
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/branches/`);
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, [baseUrl]);

  // Fetch Darbandi whenever selectedBranch changes
  useEffect(() => {
    if (!selectedBranch) return;

    const fetchDarbandi = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/branches/${selectedBranch}/get-darbandi/`
        );
        setDarbandi(response.data);
      } catch (error) {
        console.error("Error fetching Darbandi:", error);
      }
    };

    fetchDarbandi();
  }, [selectedBranch, baseUrl]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value) {
      const filtered = employees.filter(
        (employee) =>
          employee.first_name.Nepali.toLowerCase().includes(
            value.toLowerCase()
          ) ||
          employee.last_name.Nepali.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value); // Fetching Darbandi will be triggered by useEffect
  };

  const handleDarbandiChange = (event) => {
    setSelectedDarbandi(event.target.value);
  };

  const handleReasonChange = (event) => {
    setTransferReason(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTransferType(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedEmployee && selectedBranch && transferReason && transferType) {
      setLoading(true);
      // Logic to handle the transfer
      console.log("Transferring employee:", {
        employeeId: selectedEmployee.id,
        branch: selectedBranch,
        reason: transferReason,
        type: transferType,
      });
      setTimeout(() => {
        setLoading(false);
        setSelectedEmployee(null);
        setSelectedBranch("");
        setTransferReason("");
        setTransferType("");
      }, 1000); // Simulated success
    } else {
      console.error("Please fill out all fields.");
    }
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Transfer Employee
      </h1>

      <div className="mb-6 flex flex-col items-center">
        <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden mb-6 w-full max-w-lg">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="text-gray-800 h-12 w-full px-4 focus:outline-none"
          />
          <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        <div className="h-56 overflow-auto bg-white rounded-lg border border-gray-300 w-full max-w-lg shadow-md">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                onClick={() => handleEmployeeSelect(employee)}
                className="cursor-pointer hover:bg-gray-100 border-b py-3 px-4 flex items-center gap-4"
              >
                <p className="text-gray-800">
                  {employee.first_name.Nepali} {employee.last_name.Nepali}
                </p>
                {employee.photo && (
                  <img
                    src={employee.photo}
                    alt={`${employee.first_name.Nepali}'s profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-600">No results found</p>
          )}
        </div>
      </div>

      {selectedEmployee && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>First Name:</strong> {selectedEmployee.first_name.Nepali}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedEmployee.last_name.Nepali}
            </p>
            <p>
              <strong>PAN Number:</strong> {selectedEmployee.pan_no}
            </p>
            <p>
              <strong>Address:</strong> {selectedEmployee.address.Nepali}
            </p>
          </div>
        </div>
      )}

      {selectedEmployee && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Transfer Details</h2>

          <div className="mb-4">
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-700"
            >
              Transfer to Branch
            </label>
            <select
              id="branch"
              value={selectedBranch}
              onChange={handleBranchChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
            <label
              htmlFor="darbandi"
              className="block text-sm font-medium text-gray-700"
            >
              Darbandi
            </label>
            <select
              id="darbandi"
              value={selectedDarbandi}
              onChange={handleDarbandiChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Darbandi</option>
              {darbandi.map((items) => (
                <option key={items.post.id} value={items.post.id}>
                  {items.post.name.Nepali} {items.fulfilled_number}/
                  {items.assigned_number}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for Transfer
            </label>
            <textarea
              id="reason"
              value={transferReason}
              onChange={handleReasonChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows="4"
              placeholder="Enter the reason for transfer"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Transfer Type
            </label>
            <select
              id="type"
              value={transferType}
              onChange={handleTypeChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Transfer Type</option>
              <option value="permanent">Permanent</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className={`${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded`}
            disabled={loading}
          >
            {loading ? "Transferring..." : "Submit Transfer"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferEmployee;
