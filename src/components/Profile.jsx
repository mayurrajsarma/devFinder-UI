import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from './EditProfile';
import UserCard from './UserCard';

const Profile = () => {
  const user = useSelector((store)=> store.user) ;
  
  // console.log(user);
  return user && (
    
    <div data-theme="dim" className='min-h-screen'>
      <div  className='flex '>
        <EditProfile user={user}/>
      </div>
      
    </div>
    
  )
}

export default Profile