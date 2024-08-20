import React from "react";
import "../../../../App.css";
import { useEditing } from "../../../../context/EditingProvider";

const InstantTeam = ({ name, image, post, number, quotes }) => {
  const { isEditing } = useEditing();

  return (
    <div className="py-4 w-full flex flex-col lg:flex-row p-4 items-center justify-center border-b border-neutral-400/20 bg-neutral-900/50">
      <div className="flex justify-center relative w-full lg:w-1/3">
        <img
          src={image}
          className="rounded-full w-48 lg:w-60 object-cover emerge"
          alt={`${name}'s profile`}
        />
      </div>
      <div className="flex flex-col relative h-full w-full lg:w-2/3 justify-center items-center lg:items-start text-white mt-4 lg:mt-0 lg:ml-8 text-center lg:text-left">
        <q className="text-3xl lg:text-6xl font-extrabold text-yellow-500/90">
          {quotes}
        </q>
        <h1 className="text-xl lg:text-3xl font-semibold mt-2">{name}</h1>
        <h2 className="text-lg lg:text-2xl font-medium text-gray-300">
          {post}
        </h2>
        <h4 className="text-md lg:text-lg text-gray-400">{number}</h4>
      </div>
    </div>
  );
};

export default InstantTeam;
