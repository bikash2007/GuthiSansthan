import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import logo from "../../media/Headquaters/logo192.png";
import head from "../../media/Headquaters/guthi_head office.jpg";
import guthi from "../../media/Headquaters/0S3A9842 2.png";

export default function Headquarters() {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
    setShowDetail(false);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail((prevState) => !prevState);
    setShowDetails(false);
  };

  const closeDetail = () => {
    setShowDetail(false);
  };

  return (
    <>
      <div className="container">
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center">

  <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
    <div className="bg-gradient-to-r from-gray-700 to-black p-2 rounded-full">
      <img
        src={guthi}
        alt="Placeholder"
        className="rounded-full w-[200px] h-[200px] md:w-[270px] md:h-[270px] shadow-lg"
      />
    </div>
    <h1 className="text-[20px] md:text-[25px] font-bold p-0 m-0 mt-3">
      सैलेश राज कुँवर
    </h1>
    <h1 className="text-[20px] md:text-[25px] font-bold p-0 m-0">व्यवस्थापक</h1>
  </div>
 
  <div className="flex flex-col items-center justify-center mb-4 md:mb-0">
    <div className="rounded-full">
      <img
        src={logo}
        alt="Placeholder"
        className="rounded-full w-[150px] h-[150px] md:w-[220px] md:h-[220px] object-contain shadow-lg"
      />
    </div>
    <h1 className="text-[30px] md:text-[40px] font-bold p-0 m-0 mt-3">गुठी संस्थान</h1>
    <h1 className="text-[30px] md:text-[40px] font-bold p-0 m-0">प्रधान कार्यालय</h1>
  </div>
  

  <div className="flex items-center justify-center">
    <div className="bg-gradient-to-r from-gray-700 to-black p-2 rounded-full">
      <img
        src={head}
        alt="Placeholder"
        className="rounded-full w-[200px] h-[200px] md:w-[270px] md:h-[270px] object-contain shadow-lg"
      />
    </div>
  </div>
</div>


        <hr className="mt-5 border-black border-solid border-3" />

        <div className="flex flex-col md:flex-row">

  <div className="flex flex-col items-start justify-center md:items-start md:w-1/2 p-2">
    <button
      onClick={toggleDetails}
      className="p-4 bg-gray-200 rounded hover:scale-105 transition-transform duration-300"
    >
      <h1 className="font-bold text-lg md:text-xl text-[#00ACEE]">
        श्रोत व्यवस्थापन तथा अनुगमन महाशाखा
      </h1>
    </button>
  </div>


  <div className="flex flex-col items-center justify-center md:items-end md:w-1/2 p-2">
    <button
      onClick={toggleDetail}
      className="p-4  bg-gray-200 text-center rounded hover:scale-105 transition-transform duration-300"
    >
      <h1 className="font-bold text-lg md:text-xl text-[#EE4200]">
        आन्तरिक व्यवस्थापन महाशाखा         
      </h1>
    </button>
  </div>
</div>


        {showDetails && (
          <div className="row details1">
            <hr className="my-2 border-black border-solid border-3" />
            <div className="my-3 col-sm-6">
              <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                <tbody>
                  <tr className="transition-colors duration-300 bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-center text-gray-700 border-r border-gray-300">
                      सह प्रशासक (1)
                    </td>
                    <td className="px-4 py-3 font-bold text-center text-gray-700 border-r border-gray-300">
                      वरिष्ठ सहायक (1)
                    </td>
                    <td className="px-4 py-3 font-bold text-center text-gray-700">
                      कार्यालय सहयोगी (1)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end my-3 col-sm-5">
              <button
                onClick={closeDetails}
                className="flex items-center justify-center w-12 h-12 transition-transform transform bg-black rounded-full shadow-lg hover:scale-105"
              >
                <FontAwesomeIcon icon={faX} size="2x" color="red" />
              </button>
            </div>

            <div className="row col-sm-12">
              <div className="flex flex-wrap justify-center gap-4 col-md-3 ">
                <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    <tr className="transition-colors duration-300 bg-white hover:bg-gray-50">
                      <td className="h-[60px] w-[350px] px-4 py-3">
                        <h1 className="text-[19px] font-bold text-[#00ACEE]">
                          योजना अनुगमन तथा मूल्याङ्कन शाखा (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          उप - प्रशासक योजना (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          सहायक प्रशासक (ईञ्जिनियर) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          नापी अधिकृत (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          वरिष्ठ सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          सव - ईञ्जिजियर (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          सर्धेक्षक (1)
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap justify-center gap-4 col-md-3">
                <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    <tr className="transition-colors duration-300 bg-white hover:bg-gray-50">
                      <td className="h-[60px] w-[350px] px-4 py-3">
                        <h1 className="text-[19px] font-bold text-[#00ACEE]  sm:mt-4; md:mt-0">
                          धार्मिक तथा सांस्कृतिक सम्पदा व्यवस्था शाखा (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          उप - प्रशासक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          सहायक प्रशासक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          अभिलेख / पुरातत्व अधिकृत (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          वरिष्ठ सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          वरिष्ठ पुरात्व सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          कार्यालय सहायक (1)
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap justify-center gap-4 col-md-3">
                <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    <tr className="transition-colors duration-300 bg-white hover:bg-gray-50">
                      <td className="h-[60px] w-[350px] px-4 py-3">
                        <h1 className="text-[19px] font-bold text-[#00ACEE]">
                          पूर्वाधार विकास तथा सम्पदा संरक्षण शाखा (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          उप - प्रशासक (प्राविधिक) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          सहायक प्रशासक (ईञ्जिनियर) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          वरिष्ठ सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          सव - ईञ्जिजियर (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          प्रा.स. ( सव ड्राफ्टमेन ) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap justify-center gap-4 col-md-3">
                <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    <tr className="transition-colors duration-300 bg-white hover:bg-gray-50">
                      <td className="h-[60px] w-[350px] px-4 py-3">
                        <h1 className="text-[19px] font-bold text-[#00ACEE]">
                          लेखा परीक्षण तथा वेरुजु अनुगमन शाखा (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          उप - प्रशासक (लेखा) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          सहायक प्रशासक (लेखा) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          वरिष्ठ सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3">
                        <h1 className="text-[19px] text-[#EE4200]">
                          कार्यालय सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3"></td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {showDetail && (
          <div className="row details2">
            <hr className="my-2 border-black border-solid border-3" />
            <div className="my-3 col-sm-6">
              <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                <tbody>
                  <tr className="transition-colors duration-300 bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-center text-gray-700 border-r border-gray-300">
                      सह प्रशासक (1)
                    </td>
                    <td className="px-4 py-3 font-bold text-center text-gray-700 border-r border-gray-300">
                      वरिष्ठ सहायक (1)
                    </td>
                    <td className="px-4 py-3 font-bold text-center text-gray-700">
                      कार्यालय सहयोगी (1)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end my-3 col-sm-5">
              <button onClick={closeDetail} className="font-bold">
                <FontAwesomeIcon
                  icon={faX}
                  size="2x"
                  color="red"
                  className="w-[30px] h-[30px] bg-black rounded-full p-1"
                />
              </button>
            </div>
            <div className="row col-sm-12">
              <div className="flex flex-wrap justify-center gap-4 col-md-3">
                <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    <tr className="transition-colors duration-300 bg-white hover:bg-gray-50">
                      <td className="h-[60px] w-[350px] px-4 py-3">
                        <h1 className="text-[19px] font-bold text-[#00ACEE]">
                          आन्तरिक प्रशासन तथा सूचना प्रविधि शाखा (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200]">
                          उप - प्रशासक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          सहायक प्रशासक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          वरिष्ठ सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          वरिष्ठ कम्प्युटर सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          कार्यालय सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          सवारी चालक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          कार्यालय सहयोगी (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          सूचना प्रविधि अधिकृत (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          वरिष्ठ सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          कार्यालय सहायक (1)
                        </h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex  justify-center col-md-3">
                <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="h-[60px] w-[350px] px-4 py-3">
                        <h1 className="text-[19px] font-bold text-[#00ACEE]">
                          अर्थ तथा वित्त व्यवस्थापन शाखा (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          उप - प्रशासक (लेखा) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          सहायक प्रशासक (लेखा) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          सहायक प्रशासक (कोष नि.) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          वरिष्ठ सहायक (लेखा) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          कार्यालय सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-center col-md-3">
                <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="h-[60px] w-[350px]  px-5 py-3">
                        <h1 className="text-[19px] font-bold text-[#00ACEE]">
                          भूमि व्यवस्थापन शाखा (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          उप - प्रशासक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          जग्गा प्रशासक अधिकृत (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          अतिक्रमण व्यवस्थापन अधिकृत (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          वरिष्ठ सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          कार्यालय सहायक (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-center col-md-3">
                <table className="w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="h-[66px] w-[350px] px-5 py-4">
                        <h1 className="text-[19px] font-bold text-[#00ACEE]">
                          कानून शाखा (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          उप - प्रशासक (कानून) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          सहायक प्रशासक (कानून) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-3 text-center">
                        <h1 className="text-[19px] text-[#EE4200] ">
                          वरिष्ठ सहायक (कानून) (1)
                        </h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] text-[#EE4200] h-[50px]"></h1>
                      </td>
                    </tr>

                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] text-[#EE4200] h-[50px]"></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] text-[#EE4200] h-[50px]"></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                    <tr className="transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100">
                      <td>
                        <h1 className="text-[19px] h-[50px] text-[#EE4200] "></h1>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
