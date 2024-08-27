import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const BranchSearchBar = ({ headUserId }) => {
  const [inpVal, setInpVal] = useState("");
  const [result, setResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async (val) => {
    fetch("https://ingnepal.org.np/api/users/?search=" + val)
      .then((response) => response.json())
      .then((json) => {
        const filteredResult = json.filter((user) => {
          return (
            val &&
            user &&
            user.first_name &&
            user.first_name.toLowerCase().includes(val.toLowerCase())
          );
        });
        setResult(filteredResult);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setResult([]);
      });
  };

  const handleChange = (val) => {
    setInpVal(val);
    if (val) {
      fetchData(val);
    } else {
      setResult([]); // Clear the results if the input is empty
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleConfirm = () => {
    if (selectedUser) {
      headUserId(selectedUser.id);
      setSelectedUser(null);
      setInpVal(""); // Clear the input field
      setResult([]); // Clear the results
    }
  };

  const handleCancel = () => {
    setSelectedUser(null);
  };

  return (
    <div className="w-96">
      <div className="flex items-center bg-white rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Search Username"
          value={inpVal}
          onChange={(e) => handleChange(e.target.value)}
          className="text-cyan-600 h-10 w-[90%] focus:outline-none px-1"
        />
        <FontAwesomeIcon icon={faSearch} className="text-cyan-400" />
      </div>
      <div className="h-56 overflow-auto bg-zinc-800">
        {selectedUser ? (
          <div className="p-4 text-center">
            <p className="text-white mb-4">
              Confirm selection of {selectedUser.first_name}?
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
          result.map((user, index) => (
            <div
              onClick={() => handleUserSelect(user)}
              key={index}
              className="cursor-pointer hover:bg-cyan-400/50 border-b py-3 text-base flex gap-2 justify-evenly font-semibold border-zinc-600"
            >
              <p>{user.first_name}</p>
              {user.profile && user.profile.photo && (
                <img
                  src={user.profile.photo}
                  height={50}
                  width={50}
                  className="rounded-full"
                  alt={`${user.first_name}'s profile`}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BranchSearchBar;
