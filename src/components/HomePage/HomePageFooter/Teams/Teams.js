import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../../media/guthi.png";
import InstantTeam from "./InstantTeam";
import AddTeam from "./AddTeam";
import EditTeams from "./EditTeams";
import { useEditing } from "../../../../context/EditingProvider";
import axios from "axios";
import p2 from "../../../../media/Teams/p2.png";

export const Teams = () => {
  const { t } = useTranslation();
  const { isEditing } = useEditing();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [isEditingMode, setIsEditingMode] = useState(false); // State for add/edit mode

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

  const handleEdit = (id) => {
    const member = teamData.find((team) => team.id === id);
    setSelectedTeamMember(member);
    setIsEditingMode(true); // Switch to edit mode
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://ingnepal.org.np/api/teams/${id}`);
      setTeamData((prevData) => prevData.filter((team) => team.id !== id));
    } catch (error) {
      console.error("There was an error removing the team member!", error);
    }
  };

  const handleAddNew = () => {
    setSelectedTeamMember(null); // Clear selected member for adding new
    setIsEditingMode(true); // Switch to add mode
  };

  const handleCancel = () => {
    setIsEditingMode(false); // Switch back to viewing mode
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  const teamMemberWithId13 = teamData.find((member) => member.id === 13);
  const filteredTeamData = teamData.filter((member) => member.id !== 13); // Exclude the member with id 13

  return (
    <div className="w-full h-full pb-5 flex flex-col bg-black/40 items-center">
      <div className="w-full py-1 flex justify-center bg-neutral-200/30">
        <img src={logo} height={200} width={200} alt="Logo" />
      </div>
      <div className="h-full w-full flex flex-wrap items-center overflow-auto px-2">
        <div className="w-full flex justify-center py-2 flex-col items-center">
          <img
            src={p2}
            className="w-64 rounded-full hover:w-[200px] lg:w-[130px]"
          />
          <h1 className="text-xl lg:text-3xl font-semibold mt-2 text-white">
            अध्यक्ष
          </h1>
          <h3 className="text-md lg:text-lg text-gray-200">
            डा. शिवराज पण्डित
          </h3>
        </div>

        {/* Separate div to display the team member with id 13 */}
        {teamMemberWithId13 && (
          <div className="w-full flex justify-center py-2">
            <InstantTeam
              key={teamMemberWithId13.id}
              teamMember={teamMemberWithId13}
              onEdit={() => handleEdit(teamMemberWithId13.id)}
              onRemove={() => handleRemove(teamMemberWithId13.id)}
            />
          </div>
        )}

        {/* Render other team members excluding id 13 */}
        <div className="w-full flex justify-center gap-x-56 flex-wrap">
          {filteredTeamData.map((teamMember) => (
            <InstantTeam
              key={teamMember.id}
              teamMember={teamMember}
              onEdit={() => handleEdit(teamMember.id)}
              onRemove={() => handleRemove(teamMember.id)}
            />
          ))}
        </div>

        {isEditing && (
          <div className="w-full">
            {isEditingMode ? (
              <div>
                <button
                  onClick={handleCancel}
                  className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Cancel
                </button>
                {selectedTeamMember ? (
                  <EditTeams teamMember={selectedTeamMember} />
                ) : (
                  <AddTeam />
                )}
              </div>
            ) : (
              <button
                onClick={handleAddNew}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Add New Team Member
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
