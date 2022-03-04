import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import context from '../context/MyContext';
import { deleteScrimFromTeam } from '../supabase/utils/scrimTimeUtils';
import { deleteTeam } from '../supabase/utils/teamUtils';

function TeamEditButtons() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isEditing, setIsEditing, user, ownerId, setIsOwner, isOwner } = useContext(context); 

  

  useEffect(() => {
    if (!user) return;
    const isUserOwner = ownerId === user.id;
    setIsOwner(isUserOwner);
  }, [ownerId, setIsOwner, user]);

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleCancelButton = async () => {
    window.location.reload()
  };

  const handleDeleteButton = async () => {
    await deleteScrimFromTeam("paladins-teams-scrims", id);
    await deleteTeam("paladins-teams", id);
    navigate("/create-team");
    window.location.reload();
  };

  return (
    <section className='container d-flex justify-content-around'>
      {isOwner && isEditing && (
        <div className="d-flex justify-content-around w-50">
          <button type="submit" className="btn btn-lg btn-success">
            Salvar
          </button>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={handleCancelButton}
          >
            Cancelar
          </button>
        </div>
      )}
      {isOwner && !isEditing && (
        <div className="w-50 d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleEditButton}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={handleDeleteButton}
          >
            Deletar
          </button>
        </div>
      )}
    </section>
  );
}

export default TeamEditButtons