import React, { useCallback, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PlayerInputs from "../components/inputs/PlayerInputs";
import context from "../context/MyContext";
import TeamScrimMenu from "../components/TeamScrimMenu";
import { changeLogoPath, getTeamLogo, upsertLogo } from "../supabase/utils/logoUtils";
import { getTeamById, updateTeam } from "../supabase/utils/teamUtils";
import TeamNameInput from "../components/inputs/TeamNameInput";
import TeamTagInput from "../components/inputs/TeamTagInput";
import { resetErrors, handleDuplicateError } from "../supabase/utils/errorHandler";
import IsRecruitingInput from "../components/inputs/IsRecruitingInput";
import AvailableVacancyInput from "../components/inputs/AvailableVacancyInput";
import RolesSelectInputs from "../components/inputs/RolesSelectInputs";
import ImageInput from "../components/inputs/ImageInput";
import TeamEditButtons from "../components/TeamEditButtons";

function CreateTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    user,
    playerInputs,
    setPlayerInputs,
    teamName,
    setTeamName,
    teamAcronym,
    setTeamAcronym,
    isRecruiting,
    setIsRecruiting,
    availableRoles,
    setAvailableRoles,
    availableVacancy,
    setAvailableVacancy,
    hasAvatar,
    setHasAvatar,
    oldName,
    setOldName,
    logoImg,
    setLogoUrl,
    setOwnerId,
    ownerId,
    setIsEditing,
  } = useContext(context);
  
  
  const roles = ["Mid Tank", "Off Tank", "Support", "Damage", "Flank", "Flex"];

  const renderTeam = (team) => {
    const {
      name,
      owner_id,
      acronym,
      players,
      subs,
      is_recruiting,
      recruiting_roles,
      available_vacancy
    } = team;

    const renderLogo = async () => {
      const resultLogoUrl = await getTeamLogo(owner_id, name)
      if(!resultLogoUrl) return setHasAvatar(false);
      setLogoUrl(resultLogoUrl);
      setHasAvatar(true);
    };

    setTeamName(name);
    setOldName(name);
    setOwnerId(owner_id);
    setTeamAcronym(acronym);
    setPlayerInputs({main: JSON.parse(players), subs: JSON.parse(subs)});
    setIsRecruiting(is_recruiting);
    setAvailableRoles(JSON.parse(recruiting_roles));
    setAvailableVacancy(available_vacancy);
    renderLogo();
    setIsEditing(false);
  };

  const memorizedRenderTeam = useCallback(
    renderTeam, 
    [
      setAvailableRoles, 
      setAvailableVacancy, 
      setHasAvatar, 
      setIsEditing, 
      setIsRecruiting, 
      setLogoUrl, 
      setOldName, 
      setOwnerId, 
      setPlayerInputs, 
      setTeamAcronym, 
      setTeamName
    ]
  )

  useEffect(() => {
    const getTeam = async () => {
      const data = await getTeamById(id, "paladins_teams");
      if (!data) return navigate("/not-found");
      memorizedRenderTeam(data);
    };
    getTeam();
  }, [id, navigate, memorizedRenderTeam]);

  const saveLogo = async () => {
    if (!logoImg) return;

    await upsertLogo('team-logos', logoImg, user.id, teamName)
  };

  const moveLogo = async () => {
    changeLogoPath(ownerId, oldName, teamName);
  };

  const editTeam = async (e) => {
    e.preventDefault();
    const body = {
      owner_id: user.id,
      name: teamName || null,
      acronym: teamAcronym || null,
      players: JSON.stringify(playerInputs.main),
      subs: JSON.stringify(playerInputs.subs),
      is_recruiting: isRecruiting,
      recruiting_roles: JSON.stringify(availableRoles),
      available_vacancy: availableVacancy,
      owner_discord: user.identities[0].identity_data.name,
      owner_discord_id: user.identities[0].identity_data.provider_id,
      owner_avatar: user.identities[0].identity_data.avatar_url,
    };
    resetErrors();
    
    const data = await updateTeam(id, 'paladins_teams', body, handleDuplicateError);
    if (!data) return;

    if (oldName !== teamName && hasAvatar) {
      await moveLogo();
    }
    
    await saveLogo();

    window.location.reload();
  };

  

  return (
    <div>
      <Header />
      <div className="mt-5 bg-body" style={{ minHeight: "2000px" }}>
        <form
          onSubmit={editTeam}
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
          <TeamEditButtons />
        <hr className="border-top border-dark border-3 w-100 mt-4" />
        </form>
        <TeamScrimMenu teamId={id} />
      </div>
    </div>
  );
}

export default CreateTeam;
