import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Lawform() {
  return (
    <div className="container flex justify-center py-5">
      <div className="w-full max-w-md p-6 transition-all duration-300 bg-white shadow-lg card rounded-4 hover:shadow-2xl hover:scale-105">
        <h3 className="mb-5 text-2xl font-semibold text-center text-gray-800">Upload Your Document</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="pdfTitle" className="text-gray-700 form-label">PDF Title</label>
            <input
              type="text"
              className="block w-full px-3 py-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:shadow-md hover:border-blue-500"
              id="pdfTitle"
              name="title"
              placeholder="Enter PDF Title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photoUpload" className="text-gray-700 form-label">Photo</label>
            <input
              type="file"
              className="block w-full px-3 py-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:shadow-md hover:border-blue-500"
              id="photoUpload"
              name="photo"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pdfLink" className="text-gray-700 form-label">PDF Link</label>
            <input
              type="text"
              className="block w-full px-3 py-2 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:shadow-md hover:border-blue-500"
              id="pdfLink"
              name="pdfLink"
              placeholder="Enter PDF Link"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-blue-600 text-white font-medium text-base leading-tight uppercase rounded shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:translate-y-[-2px] focus:bg-blue-700 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
