import React from 'react';

export default function BudgetNikasaShow({ tableData }) {
  // Calculate the total cash amount
  const totalCash = tableData.reduce((acc, row) => acc + parseFloat(row.cash || 0), 0);

  return (
    <div className="flex flex-col items-center max-w-full p-8 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="text-lg font-semibold tracking-wide text-white uppercase bg-blue-700">
            <th className="p-4 border-gray-200 rounded-tl-lg border-e-2">शीर्षक</th>
            <th className="p-4 border-gray-200 border-e-2">विवरण</th>
            <th className="p-4 border-gray-200 rounded-tr-lg">रकम</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="transition-colors duration-300 bg-white border-b-2 border-gray-300 hover:bg-blue-50 last:border-b-0"
            >
              <td className="p-4 text-gray-700 border-gray-200 border-e-2">{row.head}</td>
              <td className="p-4 text-gray-700">{row.details}</td>
              <td className="p-4 text-gray-700 border-gray-200 border-e-2">{row.cash}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold bg-gray-100 border-t-2 border-gray-300">
           
            <td className="p-4 text-left border-e-2"></td>
            <td className="p-4 text-center border-gray-200 border-e-2">Total</td>
            <td className="p-4 text-blue-700">{totalCash}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
