import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection, removeConnection } from '../utils/connectionSlice'

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

    const handleRemoveRequest = async (id)=> {
        try {
            const res = await axios.post(BASE_URL + "/request/remove/" + id,
                {},
                {withCredentials: true}
            );
            dispatch(removeConnection(id)) ; 
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getConnections();
        // console.log(connections)
    },[])



    return connections && (
        <div data-theme="dim" className='min-h-screen flex justify-center '>
            <div className='mt-20 p-2 '>
                <h1 className='text-3xl font-bold p-5 mb-10 text-center '>Connections</h1>
                <div className='h-[460px] overflow-auto p-2 '>
                    {connections.map((connection)=>{
                        const {firstName,lastName,_id,photoUrl} = connection.user;
                        return (
                            <div key={_id} className='flex mb-4 bg-slate-900 '>
                                <div className='py-2'>
                                    <img className='rounded-full w-20 h-20 object-cover' src={photoUrl}></img>
                                </div>
                                <div className='ml-2  py-6 w-full flex justify-between'>
                                    <h2 className='text-white py-2'>{firstName + " " + lastName}</h2>
                                    <button className="btn btn-outline btn-error mr-4" onClick={()=> handleRemoveRequest(connection.connectionId)}>Remove</button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            </div> 
        </div>
  )
}

export default Connections;