import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/home')
  }, [navigate])
  


  return <div></div>
}

export default Index