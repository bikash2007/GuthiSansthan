import React, { useState } from "react";
import BranchDarbandi from "./BranchDarbandi";
import AdminPanel from "./AdminPanel";
import { useEditing } from "../../../../context/EditingProvider";

export default function Darbandi({ branchId }) {
  const [showAddData, setShowAddData] = useState(false);
  const { isEditing } = useEditing();

  return (
    <div className="container p-6 mx-auto md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
        {isEditing && (
          <div className="flex justify-center mb-6">
            <button
              className="p-3 text-white transition duration-300 bg-green-600 rounded-lg shadow-md md:w-[150px] hover:bg-green-700"
              onClick={() => setShowAddData(!showAddData)}
            >
              {showAddData ? "Hide Add Data" : "Edit & Add Data"}
            </button>
          </div>
        )}

        {isEditing && showAddData && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Edit Data
            </h2>
            <AdminPanel branchId={branchId} />
          </div>
        )}

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-center">दरबन्दी</h2>
          <BranchDarbandi branchId={branchId} />
        </div>
      </div>
    </div>
  );
}
