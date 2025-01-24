import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {BASE_URL} from "../utils/constants" ;
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age || "");
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [about,setAbout] = useState(user.about);
    const [gender,setGender] = useState(user.gender || "");
    const [error,setError] = useState("") ;
    const [msg,setMsg] = useState("") ;
    const dispatch = useDispatch() ;

    const saveProfile = async()=> {
        //clear the error before saving the profile
        setError("") ;
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit",{
                firstName,
                lastName,
                age,
                photoUrl,
                about,
                gender
            },{withCredentials:true});
            dispatch(addUser(res?.data?.data))
            setMsg(res?.data?.message);
            setTimeout(()=> {
                setMsg("");
            },2000) ;
        } catch (error) {
            setError(error.response.data) ;
        }
    }

  return (
    <div className=''>
        {msg && <div className="absolute toast toast-top toast-start  mt-14">
            <div className="alert alert-success">
                <span>{msg}</span>
            </div>
        </div>}
        
        <div className='mt-40 md:flex lg:flex w-screen justify-center'>
            <div className='flex justify-center '>
                <UserCard user={{firstName,lastName,age,about,photoUrl,gender}}/>
            </div>
            <div data-theme="cupcake" className=" card bg-base-300 mt-5 sm:mt-5 md:mt-0 lg:mt-0 xl-mt-0 mx-5 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="card-body">
                    <h2 className="card-title mb-10">Edit Form</h2>
                    
                    <span className="label-text">Firstname :</span>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={firstName}
                            onChange={(e)=> setFirstName(e.target.value)} 
                        />
                    </label>

                    <span className="label-text">Lastname :</span>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={lastName} 
                            onChange={(e)=>setLastName(e.target.value)}
                        />
                    </label>

                    <span className="label-text">Age :</span>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={age}
                            onChange={(e)=>setAge(e.target.value)} 
                        />
                    </label>

                    <span className="label-text">Gender :</span>
                    {/* <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={gender}
                            onChange={(e)=>setGender(e.target.value)} 
                        />
                    </label> */}
                    <select className="select w-full max-w-xs" placeholder={gender} onChange={(e)=>setGender(e.target.value)}>
                        <option disabled selected>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <span className="label-text">PhotoURL :</span>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={photoUrl}
                            onChange={(e)=>setPhotoUrl(e.target.value)} 
                        />
                    </label>

                    <span className="label-text">About :</span>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={about} 
                            onChange={(e)=>setAbout(e.target.value)}
                        />
                    </label>
                    
                    <p className='mt-4 text-red-600'>{error}</p>
            

                    <div className="card-actions justify-center">
                        <button onClick={saveProfile} className="btn btn-primary">SAVE</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default EditProfile

