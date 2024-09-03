import React from 'react';

export default function TainathiShow({ tableData }) {
  // Calculate the total number
  const totalNumber = tableData.reduce((total, row) => total + row.count, 0);

  return (
    <div className="flex flex-col items-center max-w-full p-8 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="text-lg font-semibold tracking-wide text-white uppercase bg-blue-700">
            <th className="p-4 border-gray-200 rounded-tl-lg border-e-2">जिल्ला</th>
            <th className="p-4 border-gray-200">साविक गा वि स</th>
            <th className="p-4 border-gray-200">वडा नं</th>
            <th className="p-4 border-gray-200">कि. नं.</th>
            <th className="p-4 border-gray-200">क्षेत्रफल</th>
            <th className="p-4 border-gray-200">कैफियत</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="transition-colors duration-300 bg-white border-b-2 border-gray-300 hover:bg-blue-50 last:border-b-0"
            >
              <td className="p-4 text-gray-700 border-gray-200 border-e-2">{row.G}</td>
              <td className="p-4 text-gray-700">{row.Gabisa}</td>
              <td className="p-4 text-gray-700">{row.odano}</td>
              <td className="p-4 text-gray-700">{row.kinum}</td>
              <td className="p-4 text-gray-700">{row.area}</td>
              <td className="p-4 text-gray-700">{row.kaifiyat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
