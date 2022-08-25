import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import UserContacts from '../components/userPresentation/UserContacts';
import UserContactsEdit from '../components/userPresentation/UserContactsEdit';
import UserInfo from '../components/userPresentation/UserInfo';
import UserTeams from '../components/userPresentation/UserTeams';
import context from '../context/MyContext';
import { getUserById, getUserContacts, upsertUserContacts } from '../supabase/utils/userUtils';


function Profile() {
  const { userId } = useParams();
  const { user } = useContext(context);
  const [pagedUser, setPagedUser] = useState({})
  const [isUser, setIsUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userContacts, setUserContacts] = useState([]);
  const [userContactsReference, setUserContactsReference] = useState([]);
  
  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserById(userId);
      setPagedUser(userData);
    }
    getUser();
  }, [userId])
  

  useEffect(() => {
    const getContacts = async () => {
      const userContactsArray = await getUserContacts(userId);
      if (!userContactsArray) {
        setUserContacts([{ provider: "discord", contact: pagedUser.name }]);
        setUserContactsReference([{ provider: "discord", contact: pagedUser.name }]);
        return
      }  
      setUserContacts(userContactsArray.contacts);
      setUserContactsReference(userContactsArray.contacts);
    };
    getContacts();
  }, [pagedUser, userId]);

  useEffect(() => {
    setIsUser(userId === user.id);
  }, [user, userId]);

  const finishEdit = async (cancel) => {
    setIsEditing(false);
    if(cancel) return setUserContacts(userContactsReference);

    console.log(await upsertUserContacts(userId, userContacts))
  }

  return (
    <div>
      <Header />
      <main className="w-100 d-flex flex-column align-items-center">
        <UserInfo user={pagedUser} />
        <hr className="w-100 border-top border-dark border-3" />
        {isEditing ? (
          <UserContactsEdit userContacts={userContacts} setUserContacts={setUserContacts} finishEdit={finishEdit} />
        ) : (
          <UserContacts userContacts={userContacts} />
        )}
        {isUser && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn btn-primary mt-4"
          >
            Edit Contacts
          </button>
        )}
        <hr className="w-100 border-top border-dark border-3" />
        <UserTeams userId={pagedUser.provider_id} />
      </main>
    </div>
  );
}

export default Profile