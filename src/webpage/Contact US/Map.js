import React from 'react';
import MyMapIframe from './Addmap';

const App = () => {
  // The initial URL can be fetched from an API or a configuration
  const initialMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28265.26302559559!2d85.28983097431639!3d27.681514899999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b413bdd171%3A0xc840b9546bce0f91!2sRobotics%20Academy%20Of%20Nepal!5e0!3m2!1sen!2snp!4v1724670643292!5m2!1sen!2snp";

  return (
    <div className='flex justify-center items-center flex-col'>
       <div style={{ textAlign: 'center' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.3347153398263!2d85.34846031535164!3d27.737820299390577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198be9be4f77%3A0x6f93699acab397db!2sMANDIKHATAR!5e0!3m2!1sen!2snp!4v1724670984499!5m2!1sen!2snp"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Embed"
      ></iframe>
    </div>
    <div className=''>
    <MyMapIframe initialUrl={initialMapUrl} />
    </div>
   
    </div>
  );
};

export default App;
