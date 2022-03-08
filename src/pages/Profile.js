import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { getUserById } from '../supabase/utils/userUtils';

function Profile() {
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    const getUser = async () => {
      await getUserById("ff7727ff-cdf6-4559-8450-086dc576f865");
    }
    getUser();
  }, [])
  return (
    <div>
      <Header />

    </div>
  )
}

export default Profile