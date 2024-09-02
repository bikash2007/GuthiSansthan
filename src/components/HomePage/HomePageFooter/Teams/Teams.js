import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../../media/guthi.png";
import InstantTeam from "./InstantTeam";
import AddTeam from "./AddTeam"; // Make sure the import is default
import { useEditing } from "../../../../context/EditingProvider";
import axios from "axios";

export const Teams = () => {
  const { t } = useTranslation(); // Translation hook
  const { isEditing } = useEditing(); // Editing context
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get("https://ingnepal.org.np/api/teams/");
        setTeamData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full h-full pb-5 flex flex-col bg-black/40 items-center">
      <div className="w-full py-1 flex justify-center bg-neutral-200/30">
        <img src={logo} height={200} width={200} alt="Logo" />
      </div>
      <div className="h-full w-full flex flex-col items-center overflow-auto px-2">
        {teamData.map((teamMember) => (
          <InstantTeam
            key={teamMember.id}
            firstName={teamMember.first_name}
            lastName={teamMember.last_name}
            position={teamMember.position}
            post={teamMember.post}
            photo={teamMember.photo}
            branch={teamMember.branch}
          />
        ))}
        {isEditing && <AddTeam />}
      </div>
    </div>
  );
};
