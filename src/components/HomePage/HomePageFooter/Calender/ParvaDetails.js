import React from "react";

const ParvaDetails = ({ setParvaDetails, festival }) => {
  console.log(festival);

  // Extracting the parva details from the festival data
  const parvaDetails = festival?.festivals[0]?.parva || [];

  return (
    <div className="p-6 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg border ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Parva Details
      </h2>
      {parvaDetails.length > 0 ? (
        <table className="min-w-full bg-transparent">
          <thead className="bg-cyan-600 bg-opacity-70 text-white">
            <tr>
              <th className="py-3 px-4 border-b text-left">पर्व</th>
              <th className="py-3 px-4 border-b text-left">गते</th>
              <th className="py-3 px-4 border-b text-left">बार</th>
              <th className="py-3 px-4 border-b text-left">Tithi From</th>
              <th className="py-3 px-4 border-b text-left">Description</th>
              <th className="py-3 px-4 border-b text-left">गुठीको नाम</th>
              <th className="py-3 px-4 border-b text-left">ठेगाना</th>
              <th className="py-3 px-4 border-b text-left">
                सम्बन्धित गुठियार
              </th>
              <th className="py-3 px-4 border-b text-left">सम्पर्क नं</th>
            </tr>
          </thead>
          <tbody>
            {parvaDetails.map((parva) => {
              // Extracting only the day from the date strings
              const startDay = new Date(parva.start_date).getDate();

              return (
                <tr
                  key={parva.id}
                  className="hover:bg-blue-100 transition duration-200"
                >
                  <td className="py-2 px-4 border-b text-white">
                    {parva.name}
                  </td>
                  <td className="py-2 px-4 border-b text-white">{startDay}</td>
                  <td className="py-2 px-4 border-b text-white"></td>
                  <td className="py-2 px-4 border-b text-white">
                    {parva.tithi_from}
                  </td>
                  <td className="py-2 px-4 border-b text-white">
                    {parva.description}
                  </td>
                  <td className="py-2 px-4 border-b text-white">
                    {parva.guthi_name}
                  </td>
                  <td className="py-2 px-4 border-b text-white">
                    {parva.guthi_address}
                  </td>
                  <td className="py-2 px-4 border-b text-white">
                    {parva.contactperson}
                  </td>
                  <td className="py-2 px-4 border-b text-white">
                    {parva.contact_no}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No Parva details available.</p>
      )}
    </div>
  );
};

export default ParvaDetails;
