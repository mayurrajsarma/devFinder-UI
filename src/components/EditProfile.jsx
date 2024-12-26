import React, { useState } from 'react'
import UserCard from './UserCard';

const EditProfile = ({user}) => {
    const {firstName,lastName,photoUrl,skills} = user ;
    const [fName,setFName] = useState(firstName);
    const [lName,setLName] = useState(lastName);
    const [age,setAge] = useState(user.age);
    const [photo,setPhoto] = useState();
    const [about,setAbout] = useState(user.about);
  return (
    <div className='flex'>
        <div data-theme="cupcake" className="card bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title">Edit Form</h2>
                
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder={fName}
                        onChange={(e)=> setFName(e.target.value)} 
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder={lName} 
                        onChange={(e)=>setLName(e.target.value)}
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
                        placeholder={about} 
                        onChange={(e)=>setAbout(e.target.value)}
                    />
                </label>
                
         

                <div className="card-actions justify-center">
                    <button className="btn btn-primary">SAVE</button>
                </div>
            </div>
        </div>
        <div>
            <UserCard user={user}/>
        </div>
    </div>
  )
}

export default EditProfile

