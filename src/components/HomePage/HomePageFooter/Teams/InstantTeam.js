import React from "react";
import "./Teams.css";
import { useEffect } from "react";
import "../../../../App.css";
import logo from "../../../../media/logo192.png";
import logo1 from "../../../../media/Teams/logo.gif";
import { useEditing } from "../../../../context/EditingProvider";
const InstantTeam = ({ name, image, post, number }) => {
  const { isEditing, setIsEditing } = useEditing();
  return (
    <div className="flex flex-row items-center justify-center w-full p-2 py-2 border-b border-neutral-400/20">
      <div className="relative flex flex-col justify-center ">
        <img src={image} className="rounded-full w-36 lg:w-44 emerge " />
      </div>
      <div
        className={` flex-col relative h-full w-[70%] flex justify-center gap-1 items-center  text-white overflow-hidden`}
      >
        <q className="text-xl font-bold lg:text-5xl text-yellow-500/90">
          Zero tolerance in guthi {post}
        </q>
        <h1 className="text-lg font-semibold text-white">{name}</h1>
        <h2 className="text-base font-semibold">{post}</h2>
        <h4>{number}</h4>
      </div>
    </div>
  );
};

export default InstantTeam;
