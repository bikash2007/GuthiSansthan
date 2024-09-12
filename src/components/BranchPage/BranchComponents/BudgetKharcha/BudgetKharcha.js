import React, { useState, useEffect } from "react";
import axios from "axios";
import BudgetKharchaShow from "./BudgetKharchaShow";

import { useEditing } from "../../../../context/EditingProvider";
import BudgetKharchaView from "./BudgetKharchaView";

export default function BudgetKharcha() {
  const { isEditing } = useEditing();

  return (
    <div className="container   md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
        <div className=" bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold text-center">
            बजेट निकासा
          </h2>
          <div className="overflow-auto w-full ">
            {isEditing ? <BudgetKharchaShow /> : <BudgetKharchaView />}
          </div>
        </div>
      </div>
    </div>
  );
}
