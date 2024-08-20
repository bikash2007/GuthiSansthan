import { useTranslation } from "react-i18next";
import firstPerson from "../../../../media/Teams/p1.png";
import secondPerson from "../../../../media/Teams/p2.png";

import logo from "../../../../media/guthi.png";
import { useEffect } from "react";
import "./Teams.css";

import InstantTeam from "./InstantTeam";
import { AddTeam } from "./AddTeam";
import { useEditing } from "../../../../context/EditingProvider";
export const Teams = () => {
  const { t } = useTranslation();
  const { isEditing, setIsEditing } = useEditing();
  return (
    <>
      <div className="flex flex-col items-center w-full h-full pb-5 bg-black/40">
        <div className="flex justify-center w-full py-1 bg-neutral-200/30 ">
          <img src={logo} height={200} width={200} />
        </div>
        <div className="flex flex-col w-full h-full px-2 overflow-auto">
          <InstantTeam
            image={firstPerson}
            name={"Sailesh Raj Kunwar"}
            post={"Chairman"}
            number={"9851072032"}
          />
          <InstantTeam
            image={secondPerson}
            name={"Dr.Shiva Raj Pandit"}
            post={"Chairman"}
            number={"9851072032"}
          />
          {isEditing && <AddTeam />}
        </div>
      </div>
    </>
  );
};
