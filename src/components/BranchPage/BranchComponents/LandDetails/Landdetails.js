import React, { useState } from 'react';
import Raitani from './Raitani/Raitani'
import Adhinash from './Adhinasth/Adhinasth'
import Tainathi from './Tainathi/Tainathi';



export default function Landdetails() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className='container py-4 mx-auto'>
      <div className="flex flex-wrap justify-center row">
        <div className="flex justify-center col-md-4">
          <button
            className='px-10 py-3 text-lg text-white transition-transform transform bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105'
            onClick={() => handleButtonClick('Tainathi')}
          >
            तैनाथी
          </button>
        </div>
        <div className="flex justify-center col-md-4">
          <button
            className='px-10 py-3 text-lg text-white transition-transform transform bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105'
            onClick={() => handleButtonClick('Adhinasth')}
          >
            अधिनस्थ
          </button>
        </div>
        <div className="flex justify-center col-md-4">
          <button
            className='px-10 py-3 text-lg text-white transition-transform transform bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105'
            onClick={() => handleButtonClick('Raitani')}
          >
            रैतानी
          </button>
        </div>
      </div>
      
      {/* Conditionally render components based on the activeComponent state */}
      <div className="mt-6">
        {activeComponent === 'Tainathi' && <Tainathi />}
        {activeComponent === 'Adhinasth' && <Adhinash />}
        {activeComponent === 'Raitani' && <Raitani />}
      </div>
    </div>
  );
}
