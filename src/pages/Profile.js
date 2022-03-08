import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import UserInfo from '../components/userPresentation/UserInfo';
import { getUserById } from '../supabase/utils/userUtils';


function Profile() {
  const { userId } = useParams();
  
  const [pagedUser, setPagedUser] = useState({})
  
  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserById(userId);
      setPagedUser(userData)
      console.log(userData);
    }
    getUser();
  }, [userId])
  return (
    <div>
      <Header />
      <main>
        <UserInfo user={pagedUser} />
      </main>
    </div>
  )
}

export default Profile