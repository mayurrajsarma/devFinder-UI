import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const UserCard = ({user}) => {
    // console.log(user) ;
    const dispatch = useDispatch() ;

    const handleSendRequest = async (status,id)=> {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + id,
                {},
                {withCredentials: true}
            );
            dispatch(removeUserFromFeed(id)) ; 
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div>
        <div className="card glass w-96">
            <figure>
                <img
                className='p-3'
                src={user.photoUrl}
                alt="car!" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-stone-950">{user.firstName} {user.lastName}</h2>
                <h3>{user.age},{user.gender}</h3>
                <p className=''>{user.about || "This is about section"} </p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored",user._id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested",user._id)}>Interested</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard