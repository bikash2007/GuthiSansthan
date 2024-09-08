import React from "react";
import OfficePosts from "./OfficePosts";
import PostFeilds from "./PostFeilds";
import RankFeilds from "./RankFeilds";
import EmployeeTypes from "./EmployeeTypes";
import Mahasakha from "./Mahasakha";
import Sakha from "./Sakha";

const Darbandi = () => {
  return (
    <div className="w-full p-4">
      <table className="w-full table-auto border-collapse bg-gray-200/40 backdrop-blur-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-1 border">Office Posts</th>
            <th className="p-1 border">Post Fields</th>
            <th className="p-1 border">Rank Fields</th>
            <th className="p-1 border">Employee Types</th>
            <th className="p-1 border">Mahasakha</th>
            <th className="p-1 border">Sakha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-1 border">
              <OfficePosts />
            </td>
            <td className="p-1 border">
              <PostFeilds />
            </td>
            <td className="p-1 border">
              <RankFeilds />
            </td>
            <td className="p-1 border">
              <EmployeeTypes />
            </td>
            <td className="p-1 border">
              <Mahasakha />
            </td>
            <td className="p-1 border">
              <Sakha />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Darbandi;
