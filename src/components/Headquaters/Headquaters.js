import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Headquarters() {
 
    const [showDetails, setShowDetails] = useState(false);

  
    const toggleDetails = () => {
        setShowDetails(prevState => !prevState);
        setShowDetail(false);
    };

  
    const closeDetails = () => {
        setShowDetails(false);
    };

    const [showDetail, setShowDetail] = useState(false);


    const toggleDetail = () => {
        setShowDetail(prevState => !prevState);
        setShowDetails(false);
    };

    const closeDetail = () => {
        setShowDetail(false);
    };

    return (
        <>
            <div className='container'>
                <div className="mt-4 row">
                    <div className="flex items-center justify-center col-md-4">
                        <h1 className='font-semibold text-24'>Headquarters</h1>
                    </div>
                    <div className="flex items-center justify-center col-md-4">
                        <p>gff hflk kfdjg sedjfdjsk ksdjlj klsajsldjj</p>
                    </div>
                    <div className="flex items-center justify-center col-md-4">
                        <img src='' alt='Placeholder' className='bg-black rounded-full w-[180px] h-[180px]' />
                    </div>
                </div>
                <hr className='mt-5 border-black border-solid border-3' />

                <div className='row'>
                    <div className="flex flex-col items-start justify-center md:justify-start col-md-6">
                        <button onClick={toggleDetails} className='p-2 bg-gray-200 rounded hover:scale-105'>
                            <h1 className='font-bold text-[25px] text-[#00ACEE]'>श्रोत व्यवस्थापन तथा अनुगमन महाशाखा</h1>
                        </button>
                    </div>

                    <div className="flex items-start justify-center md:justify-end col-md-6">
                        <button onClick={toggleDetail}  className='p-2 bg-gray-200 rounded hover:scale-105'>
                        <h1 className='font-bold text-[25px] text-[#EE4200]'>आन्तरिक व्यवस्थापन महाशाखा</h1>
                        </button>
                        
                    </div>
                </div>

                {showDetails && (
                    <div className='row details1'>
                        <hr className='my-2 border-black border-solid border-3' />
                        <div className='my-3 col-sm-6'>
    <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
        <tbody>
            <tr className='transition-colors duration-300 bg-white hover:bg-gray-50'>
                <td className='px-4 py-3 font-bold text-center text-gray-700 border-r border-gray-300'>सह प्रशासक (1)</td>
                <td className='px-4 py-3 font-bold text-center text-gray-700 border-r border-gray-300'>वरिष्ठ सहायक (1)</td>
                <td className='px-4 py-3 font-bold text-center text-gray-700'>कार्यालय सहयोगी (1)</td>
            </tr>
        </tbody>
    </table>
</div>


<div className='flex justify-end my-3 col-sm-5'>
    <button onClick={closeDetails} className='flex items-center justify-center w-12 h-12 transition-transform transform bg-black rounded-full shadow-lg hover:scale-105'>
        <FontAwesomeIcon icon={faX} size="2x" color="red" />
    </button>
</div>


                        <div className='row col-sm-12'>
    <div className="flex flex-wrap justify-center gap-4 col-md-3">
        <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
            <tbody>
                <tr className='transition-colors duration-300 bg-white hover:bg-gray-50'>
                    <td className='h-[60px] w-[350px] px-4 py-3'>
                        <h1 className='text-[19px] font-bold text-[#00ACEE]'>योजना अनुगमन तथा मूल्याङ्कन शाखा (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>उप - प्रशासक योजना (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>सहायक प्रशासक (ईञ्जिनियर) (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>नापी अधिकृत (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>वरिष्ठ सहायक (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>सव - ईञ्जिजियर (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>सर्धेक्षक (1)</h1>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className="flex flex-wrap justify-center gap-4 col-md-3">
        <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
            <tbody>
                <tr className='transition-colors duration-300 bg-white hover:bg-gray-50'>
                    <td className='h-[60px] w-[350px] px-4 py-3'>
                        <h1 className='text-[19px] font-bold text-[#00ACEE]'>धार्मिक तथा सांस्कृतिक सम्पदा व्यवस्था शाखा (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>उप - प्रशासक (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>सहायक प्रशासक (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>अभिलेख / पुरातत्व अधिकृत (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>वरिष्ठ सहायक (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>वरिष्ठ पुरात्व सहायक (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>कार्यालय सहायक (1)</h1>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className="flex flex-wrap justify-center gap-4 col-md-3">
        <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
            <tbody>
                <tr className='transition-colors duration-300 bg-white hover:bg-gray-50'>
                    <td className='h-[60px] w-[350px] px-4 py-3'>
                        <h1 className='text-[19px] font-bold text-[#00ACEE]'>पूर्वाधार विकास तथा सम्पदा संरक्षण शाखा (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>उप - प्रशासक (प्राविधिक) (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>सहायक प्रशासक (ईञ्जिनियर) (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>वरिष्ठ सहायक (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>सव - ईञ्जिजियर (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>प्रा.स. ( सव ड्राफ्टमेन ) (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className="flex flex-wrap justify-center gap-4 col-md-3">
        <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
            <tbody>
                <tr className='transition-colors duration-300 bg-white hover:bg-gray-50'>
                    <td className='h-[60px] w-[350px] px-4 py-3'>
                        <h1 className='text-[19px] font-bold text-[#00ACEE]'>लेखा परीक्षण तथा वेरुजु अनुगमन शाखा (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>उप - प्रशासक (लेखा) (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>सहायक प्रशासक (लेखा) (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>वरिष्ठ सहायक (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'>
                        <h1 className='text-[19px] text-[#EE4200]'>कार्यालय सहायक (1)</h1>
                    </td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'></td>
                </tr>
                <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                    <td className='px-4 py-3'></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

                    </div>
                )}

{showDetail && (

<div className='row details2'>
                        <hr className='my-2 border-black border-solid border-3' />
                        <div className='my-3 col-sm-6'>
    <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
        <tbody>
            <tr className='transition-colors duration-300 bg-white hover:bg-gray-50'>
                <td className='px-4 py-3 font-bold text-center text-gray-700 border-r border-gray-300'>सह प्रशासक (1)</td>
                <td className='px-4 py-3 font-bold text-center text-gray-700 border-r border-gray-300'>वरिष्ठ सहायक (1)</td>
                <td className='px-4 py-3 font-bold text-center text-gray-700'>कार्यालय सहयोगी (1)</td>
            </tr>
        </tbody>
    </table>
</div>
                        <div className='flex justify-end my-3 col-sm-5'>
                            <button onClick={closeDetail} className='font-bold'>
                                <FontAwesomeIcon icon={faX} size="2x" color="red" className='w-[30px] h-[30px] bg-black rounded-full p-1' />
                            </button>
                        </div>
                        <div className='row col-sm-12'>
        <div className="flex flex-wrap justify-center gap-4 col-md-3">
            <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
                <tbody>
                    <tr className='transition-colors duration-300 bg-white hover:bg-gray-50'>
                        <td className='h-[60px] w-[350px] px-4 py-3'>
                            <h1 className='text-[19px] font-bold text-[#00ACEE]'>आन्तरिक प्रशासन तथा सूचना प्रविधि शाखा (1)</h1>
                        </td>
                    </tr>
                    <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                        <td className='px-4 py-3 text-center'>
                            <h1 className='text-[19px] text-[#EE4200]'>उप - प्रशासक (1)</h1>
                        </td>
                    </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>सहायक प्रशासक (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>वरिष्ठ सहायक (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>वरिष्ठ कम्प्युटर सहायक (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>कार्यालय सहायक (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>सवारी चालक (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>कार्यालय सहयोगी (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>सूचना प्रविधि अधिकृत (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>वरिष्ठ सहायक (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>कार्यालय सहायक (1)</h1></td>
                                            </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex  justify-center col-md-3">
                                <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
                                    <tbody>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td className='h-[60px] w-[350px] px-4 py-3'>
                                                     <h1 className='text-[19px] font-bold text-[#00ACEE]'>अर्थ तथा वित्त व्यवस्थापन शाखा (1)</h1>
                                            </td>
                                        </tr>
                                      <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>उप - प्रशासक (लेखा) (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>सहायक प्रशासक (लेखा) (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>सहायक प्रशासक (कोष नि.) (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>वरिष्ठ सहायक (लेखा) (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>कार्यालय सहायक (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                        <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                     
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-center col-md-3">
                                <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
                                    <tbody>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td className='h-[60px] w-[350px]  px-5 py-3'>
                                                    <h1 className='text-[19px] font-bold text-[#00ACEE]'>भूमि व्यवस्थापन शाखा (1)</h1>
                                            </td>
                                        </tr>
                                      <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>उप - प्रशासक (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>जग्गा प्रशासक अधिकृत (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>अतिक्रमण व्यवस्थापन अधिकृत (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>वरिष्ठ सहायक (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>कार्यालय सहायक (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                        <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-center col-md-3">
                                <table className='w-full overflow-hidden border border-gray-300 rounded-lg shadow-lg'>
                                    <tbody>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td className='h-[66px] w-[350px] px-5 py-4'>
                                                 <h1 className='text-[19px] font-bold text-[#00ACEE]'>कानून शाखा (1)</h1>
                                            </td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>उप - प्रशासक (कानून) (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>सहायक प्रशासक (कानून) (1)</h1></td>
                                            </tr>
                                           <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                                <td className='px-4 py-3 text-center'><h1 className='text-[19px] text-[#EE4200] '>वरिष्ठ सहायक (कानून) (1)</h1></td>
                                            </tr>
                                            <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] text-[#EE4200] h-[50px]'></h1></td>
                                        </tr>
                                      
                                        <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] text-[#EE4200] h-[50px]'></h1></td>
                                        </tr>
                                        <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] text-[#EE4200] h-[50px]'></h1></td>
                                        </tr>
                                        <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                        <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                        <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                       <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
                                        </tr>
                                        <tr className='transition-colors duration-300 border-t border-gray-300 hover:bg-gray-100'>
                                            <td><h1 className='text-[19px] h-[50px] text-[#EE4200] '></h1></td>
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
