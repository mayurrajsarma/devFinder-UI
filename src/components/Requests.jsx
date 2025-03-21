import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const request = useSelector((store)=> store.request) ;

    const getRequests = async ()=> {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received",
                {withCredentials:true} 
            );
            dispatch(addRequest(res?.data?.data)) ;
            // console.log(res?.data?.data[0].fromUserId)
        } catch (error) {
            console.log(error)
        }
    }

    const reviewRequest = async(status,id)=> {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + id,{},{
                withCredentials: true
            });
            dispatch(removeRequest(id)) ;
        } catch (err) {
           console.log(err); 
        }
    }

    useEffect(()=> {
        getRequests();
    },[]) ;

    if(!request) return ;
    if(request.length === 0) return (
        <div data-theme="dim" className='min-h-screen'>
            <div className='absolute left-1/2 transform -translate-x-1/2'>
                <div className='mt-[400px] '>
                    <h1 className='text-3xl font-bold tracking-tighter'>No request found</h1>
                </div>
            </div>
        </div>
    )

    return request && (
        <div data-theme="dim" className='min-h-screen flex justify-center '>
            <div className=' mt-20 p-2'>
                <h1 className='text-3xl font-bold p-5 mb-10 text-center'>Request</h1>
                <div className='h-[460px] overflow-auto p-2'>
                    {request.map((req)=>{
                        const {firstName,lastName,_id,photoUrl} = req.fromUserId;
                        return (
                            <div key={_id} className='flex mb-4 bg-slate-900 h-25'>
                                <div className='py-2 '>
                                    <img className='rounded-full w-20 h-15 object-cover' src={photoUrl}></img>
                                </div>
                                <div className='ml-2  py-6 w-full flex justify-between '>
                                    <h2 className='text-white py-2 text-xs sm:text-sm md:text-lg w-1/2'>{firstName + " " + lastName}</h2>
                                    <div className=' mx-3 flex'>
                                        <button onClick={()=> reviewRequest("accept",req._id)} className="btn btn-outline btn-info mr-3 text-xs px-2 md:px-4 md:text-base">Accept</button>
                                        <button onClick={()=> reviewRequest("reject",req._id)} className="btn btn-outline btn-error text-xs px-2 md:px-4 md:text-base">Reject</button>
                                    </div>
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

export default Requests