import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SelectEmployee = ({ onSelectEmployee }) => {
  const [inpVal, setInpVal] = useState("");
  const [result, setResult] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch employee data based on user input
  const fetchEmployeeData = async (val) => {
    try {
      const response = await fetch(
        "https://ingnepal.org.np/api/users/?search=" + val
      );
      const json = await response.json();
      const filteredResult = json.filter((employee) => {
        return (
          val &&
          employee &&
          employee.first_name &&
          employee.first_name.toLowerCase().includes(val.toLowerCase())
        );
      });
      setResult(filteredResult);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setResult([]);
    }
  };

  // Handle input change and fetch employees
  const handleChange = (val) => {
    setInpVal(val);
    if (val) {
      fetchEmployeeData(val);
    } else {
      setResult([]); // Clear the results if the input is empty
    }
  };

  // Handle employee selection
  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  // Confirm the selection
  const handleConfirm = () => {
    if (selectedEmployee) {
      onSelectEmployee(selectedEmployee.id);
      setSelectedEmployee(null);
      setInpVal(""); // Clear the input field
      setResult([]); // Clear the results
    }
  };

  // Cancel the selection
  const handleCancel = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="w-96">
      <div className="flex items-center bg-white rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Search Employee"
          value={inpVal}
          onChange={(e) => handleChange(e.target.value)}
          className="text-cyan-600 h-10 w-[90%] focus:outline-none px-1"
        />
        <FontAwesomeIcon icon={faSearch} className="text-cyan-400" />
      </div>
      <div className="h-56 overflow-auto bg-zinc-800">
        {selectedEmployee ? (
          <div className="p-4 text-center">
            <p className="text-white mb-4">
              Confirm selection of {selectedEmployee.first_name}?
            </p>
            <button
              onClick={handleConfirm}
              className="bg-cyan-600 text-white px-4 py-2 rounded-md mr-2"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        ) : (
          result.length > 0 &&
          result.map((employee, index) => (
            <div
              onClick={() => handleEmployeeSelect(employee)}
              key={index}
              className="cursor-pointer hover:bg-cyan-400/50 border-b py-3 text-base flex gap-2 justify-evenly font-semibold border-zinc-600"
            >
              <p>{employee.first_name}</p>
              {employee.profile && employee.profile.photo && (
                <img
                  src={employee.profile.photo}
                  height={50}
                  width={50}
                  className="rounded-full"
                  alt={`${employee.first_name}'s profile`}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectEmployee;
