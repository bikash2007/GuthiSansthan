import React from 'react'

export default function Editbutton() {
  return (
    <div className="z-50 flex flex-col gap-1 text-white ">
    <div className="flex px-2 py-1 bg-gray-600 border rounded-md cursor-pointer hover:bg-gray-700">
      Edit
    </div>
    <div
      className="flex px-2 py-1 bg-red-600 border rounded-md cursor-pointer hover:bg-red-700"
      onClick=""
    >
      Remove
    </div>
  
  </div>
  )
}
