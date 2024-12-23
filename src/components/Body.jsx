import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate() ;
  const userStore = useSelector((store)=> store.user) ;
  
  //loged in=> browse page, logout =>login page
  const fetchUser = async ()=> {
    try {
      const res = await axios.get(BASE_URL + "/profile/view",{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
      navigate("/") ; //once loged in cannot go to log in page
    } catch (error) {
        if(error.status === 401)
        {
          navigate("/login");
        }
        console.log(error) ;
    }
  };

  useEffect(()=> {
    if(!userStore) {
      fetchUser();
    }
  },[]);

  return (
    <div className=''>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default Body