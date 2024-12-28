import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';

const Requests = () => {
    const getRequests = async ()=> {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received",
                {withCredentials:true} 
            );
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getRequests();
    },[]) ;

    return (
    <div>Requests</div>
    )
}

export default Requests