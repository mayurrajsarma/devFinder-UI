import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store)=> store.user) ;
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  const handleLogout = async ()=> {
    try {
      await axios.post(BASE_URL + "/logout",{},{
        withCredentials: true
      }) ;
      dispatch(removeUser()) ;
      navigate("/login") ;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar absolute z-10 bg-gradient-to-b from-black/80 via-black/50 to-transparent ">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-3xl text-white">DevFinder</Link>
        </div>
        {user &&  <div className="flex-none gap-2">
          <p className='text-white'>Hello, {user.firstName}</p>
          <div className="dropdown dropdown-end mx-3">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl} 
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/Connections">Connections</Link></li>
              <li><Link to="/Requests">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
              
            </ul>
          </div>
        </div>}
      </div>
  )
}

export default NavBar