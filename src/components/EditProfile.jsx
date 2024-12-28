import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {BASE_URL} from "../utils/constants" ;
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age);
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [about,setAbout] = useState(user.about);
    const [gender,setGender] = useState(user.gender);
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
        {msg && <div className="toast toast-top toast-start mx-5">
        
            <div className="alert alert-success">
                <span>{msg}</span>
            </div>
        </div>}
        
        <div className='flex pt-20 '>
            <div data-theme="cupcake" className="card bg-base-300 w-96 mx-5">
                <div className="card-body">
                    <h2 className="card-title mb-10">Edit Form</h2>
                    
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={firstName}
                            onChange={(e)=> setFirstName(e.target.value)} 
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={lastName} 
                            onChange={(e)=>setLastName(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={age}
                            onChange={(e)=>setAge(e.target.value)} 
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder={gender}
                            onChange={(e)=>setGender(e.target.value)} 
                        />
                    </label>
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
            <div>
                <UserCard user={{firstName,lastName,age,about,photoUrl,gender}}/>
            </div>
        </div>
    </div>
  )
}

export default EditProfile

