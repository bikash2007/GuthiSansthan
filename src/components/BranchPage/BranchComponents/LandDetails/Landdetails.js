import React from 'react';

export default function Landdetails() {
  return (
    <div className='container py-4 mx-auto'>
      <div className="flex flex-wrap justify-center row">
       
      <div className="flex justify-center col-md-4">
      
          <button className='px-10 py-3 text-lg text-white transition-transform transform bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105'>
          तैनाथी
          </button>
        </div>
        <div className="flex justify-center col-md-4">
          <button className='px-10 py-3 text-lg text-white transition-transform transform bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105'>
          अधिनस्थ
          </button>
        </div>
        <div className="flex justify-center col-md-4">
          <button className='px-10 py-3 text-lg text-white transition-transform transform bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105'>
          रैतानी
          </button>
        </div>
    
     
      </div>
    </div>
  );
}
