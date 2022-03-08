import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import context from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import { upsertLogo } from "../supabase/utils/logoUtils";
import { insertTeam } from '../supabase/utils/teamUtils';
import PlayerInputs from "../components/inputs/PlayerInputs";
import { handleDuplicateError, resetErrors } from "../supabase/utils/errorHandler";
import IsRecruitingInput from "../components/inputs/IsRecruitingInput";
import AvailableVacancyInput from "../components/inputs/AvailableVacancyInput";
import RolesSelectInputs from "../components/inputs/RolesSelectInputs";
import TeamNameInput from "../components/inputs/TeamNameInput";
import TeamTagInput from "../components/inputs/TeamTagInput";
import ImageInput from "../components/inputs/ImageInput";
import { range } from "lodash";
import { upsertScrim } from "../supabase/utils/scrimTimeUtils";

function CreateTeam() {
  const navigate = useNavigate();
  const {
    user,
    playerInputs,
    teamName,
    teamAcronym,
    isRecruiting,
    availableRoles,
    availableVacancy,
    logoImg,
    setIsEditing,
  } = useContext(context);
  const roles = ["Mid Tank", "Off Tank", "Support", "Damage", "Flank", "Flex"];

  useEffect(() => {
    setIsEditing(true);
  }, []);

  const saveLogo = async () => {
    if (!logoImg) return
   await upsertLogo("team-logos", logoImg, user.id, teamName);
  };
 
  const submitTeam = async (e) => {
    e.preventDefault();
    const body = {
      owner_id: user.id,
      name: teamName || null,
      acronym: teamAcronym || null,
      players: JSON.stringify(playerInputs.main),
      subs: JSON.stringify(playerInputs.subs),
      is_recruiting: isRecruiting,
      recruiting_roles: JSON.stringify(availableRoles),
      available_vacancy: Number(availableVacancy),
      owner_discord: user.identities[0].identity_data.name,
      owner_discord_id: user.identities[0].identity_data.provider_id,
      owner_avatar: user.identities[0].identity_data.avatar_url,
    };
    resetErrors();
    
    const id = await insertTeam("paladins_teams", body, handleDuplicateError);  
    if (!id) return
     
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const dayTimes = {};

    days.forEach((day) => {
      dayTimes[day] = {};
      range(0, 24).forEach((key) => {
        dayTimes[day][key] = false;
      });
    });

     const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
       dayTimes;

     const timeBody = {
       team_id: id,
       owner_id: user.id,
       monday: JSON.stringify(monday),
       tuesday: JSON.stringify(tuesday),
       wednesday: JSON.stringify(wednesday),
       thursday: JSON.stringify(thursday),
       friday: JSON.stringify(friday),
       saturday: JSON.stringify(saturday),
       sunday: JSON.stringify(sunday),
     };

    const data = await upsertScrim("paladins_teams_scrims", timeBody);
    console.log(data);
    await saveLogo();
    navigate(`/team/${id}`)
  }

  return (
    <div>
      <Header />
      <div className="mt-5 bg-body" style={{ minHeight: "1500px" }}>
        <form
          onSubmit={submitTeam}
          className="d-flex flex-column align-items-center container"
        >
          <ImageInput />
          <section className="d-flex mb-3 container justify-content-around">
            <TeamNameInput />
            <TeamTagInput />
          </section>
          <hr className="border-top border-dark border-3 w-100" />
          <PlayerInputs playerType="main" roles={roles} numberOfInputs={5} />
          <hr className="border-top border-dark border-3 w-100" />
          <PlayerInputs playerType="subs" roles={roles} numberOfInputs={3} />
          <hr className="border-top border-dark border-3 w-100" />
          <section className="d-flex container flex-column align-items-center mt-3">
            <IsRecruitingInput />
            <div className="d-flex flex-row justify-content-around w-100 align-items-center mb-4">
              <AvailableVacancyInput />
              <RolesSelectInputs roles={roles} />
            </div>
          </section>
          <button type="submit" className="btn btn-success btn-lg">Criar</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTeam;
