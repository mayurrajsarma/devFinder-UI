import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch() ;
    const connections = useSelector((store)=> store.connection) ;
    
    const getConnections = async()=> {
        try {
            const res = await axios.get(BASE_URL +"/user/connection",
            {withCredentials:true});
            dispatch(addConnection(res?.data?.data)) ;
            
        } catch (err) {
            
        }
    }

    useEffect(()=>{
        getConnections();
        // console.log(connections)
    },[])



    return connections && (
        <div data-theme="dim" className='min-h-screen flex justify-center '>
            <div className='absolute mt-20 w-1/4 p-2'>
                <h1 className='text-3xl font-bold p-5 mb-10 text-center'>Connections</h1>
                {connections.map((connection)=>{
                    const {firstName,lastName,_id,photoUrl} = connection;
                    return (
                        <div key={_id} className='flex mb-4 bg-slate-900'>
                            <div className='py-2'>
                                <img className='rounded-full w-20 h-20 object-cover' src={photoUrl}></img>
                            </div>
                            <div className='ml-2  py-6 w-full flex justify-between'>
                                <h2 className='text-white py-2'>{firstName + " " + lastName}</h2>
                                <button className="btn btn-outline btn-error mr-4">Remove</button>
                            </div>
                        </div>

                    )
            })}
            </div> 
        </div>
  )
}

export default Connections;