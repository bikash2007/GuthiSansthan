import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../../media/guthi.png";
import InstantTeam from "./InstantTeam";
import { AddTeam } from "./AddTeam";
import { useEditing } from "../../../../context/EditingProvider";
import axios from "axios";

export const Teams = () => {
  const { t } = useTranslation();
  const { isEditing, setIsEditing } = useEditing();
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
      <div className="w-full py-1 flex justify-center bg-neutral-200/30 ">
        <img src={logo} height={200} width={200} alt="Logo" />
      </div>
      <div className="h-full w-full flex flex-col overflow-auto px-2">
        {teamData.map((teamMember) => (
          <InstantTeam
            key={teamMember.id}
            image={teamMember.user_detail.profile.photo}
            name={`${teamMember.user_detail.first_name} ${teamMember.user_detail.last_name}`}
            post={teamMember.position}
            number={teamMember.user_detail.profile.contact_no || "N/A"}
            quotes={teamMember.quote.English} // Adjust based on selected language
          />
        ))}
        {isEditing && <AddTeam />}
      </div>
    </div>
  );
};
