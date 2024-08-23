import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const BranchSearchBar = ({ headUserId }) => {
  const [inpVal, setInpVal] = useState();
  const [result, setResult] = useState();
  const fetchData = async (val) => {
    fetch("https://ingnepal.org.np/api/users/?search=")
      .then((response) => response.json())
      .then((json) => {
        const result = json.filter((user) => {
          return (
            val &&
            user &&
            user.first_name &&
            user.first_name.toLowerCase().includes(val)
          );
        });
        setResult(result);
      });
  };
  const handelChange = (val) => {
    console.log(val);
    fetchData(val);
  };
  return (
    <div className="w-96">
      <div className="flex items-center bg-white rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="search Username"
          onChange={(e) => handelChange(e.target.value)}
          className="text-cyan-600 h-10 w-[90%] focus:outline-none px-1"
        />
        <FontAwesomeIcon icon={faSearch} className="text-cyan-400" />
      </div>
      <div className="h-56 overflow-auto bg-zinc-800">
        {result &&
          result.map((user, index) => (
            <h1
              onClick={() => headUserId(user.id)}
              key={index}
              className=" cursor-pointer hover:bg-cyan-400/50 border-b py-3 text-base font-semibold border-zinc-600"
            >
              {user.first_name}
            </h1>
          ))}
      </div>
    </div>
  );
};

export default BranchSearchBar;
