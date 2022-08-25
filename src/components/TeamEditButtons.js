import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import context from '../context/MyContext';
import { deleteScrimFromTeam } from '../supabase/utils/scrimTimeUtils';
import { deleteTeam } from '../supabase/utils/teamUtils';
import Modal from './Modal';

function TeamEditButtons() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isEditing, setIsEditing, user, ownerId, setIsOwner, isOwner, teamName } = useContext(context); 

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenSave, setIsOpenSave] = useState(false);

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
    await deleteScrimFromTeam("paladins_teams_scrims", id);
    await deleteTeam("paladins_teams", id);
    navigate("/teams");
    window.location.reload();
  };

  const saveAndCancelButtons = (
    <div className="d-flex justify-content-around w-50">
          <button type="button" className="btn btn-lg btn-success" onClick={() => { setIsOpenSave(true) }}>
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </div>
  );

  const editAndDeleteButtons = (
    <div className="w-50 d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleEditButton}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={() => {setIsOpenDelete(true)}}
          >
            Delete
          </button>
        </div>
  )

  const modalDeleteHeader = (
    <div>Do you want to delete the team {teamName}?</div>
  );

  const modalDeleteCotent = (
    <div className="d-flex justify-content-around w-100">
      <button type="button" className="btn btn-success" onClick={handleDeleteButton}>
        Confirm
      </button>
      <button type="button" className="btn btn-danger" onClick={() => {setIsOpenDelete(false)}}>
        Cancel
      </button>
    </div>
  );

  const modalSaveHeader = (
    <div>
      <strong>Note:</strong> The team logo change may take up to a few minutes
      to take effect
    </div>
  );

  const modalSaveContent = (
    <button type="submit" className='btn btn-success' onClick={()=> { setIsOpenSave(false) }}>Ok</button>
  )

  return (
    <section className="container d-flex justify-content-around align-items-start">
      <Modal
        header={modalDeleteHeader}
        content={modalDeleteCotent}
        isOpen={isOpenDelete}
      />
      <Modal 
        header={modalSaveHeader} 
        content={modalSaveContent} 
        isOpen={isOpenSave} 
      />
      {isOwner && isEditing && saveAndCancelButtons}
      {isOwner && !isEditing && editAndDeleteButtons}
    </section>
  );
}

export default TeamEditButtons