import React, { useState, useEffect } from "react";
import axios from "axios";
import BudgetKharchaShow from "./BudgetKharchaShow";

import { useEditing } from "../../../../context/EditingProvider";

export default function BudgetKharcha() {
  const [tableData, setTableData] = useState([]);

  return (
    <div className="container p-6 mx-auto md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-center">
            बजेट निकासा
          </h2>
          <BudgetKharchaShow tableData={tableData} />
        </div>
      </div>
    </div>
  );
}
