import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL, FEED_BG_IMG } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=> store.feed) ;

  const getFeed = async ()=> {
    //if(feed) return; => need to check when new user registers so updated feed should be shown
    try {
      const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true}) ;
      dispatch(addFeed(res?.data?.data)) ;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getFeed();
  },[])

  if(!feed) return ;
  
  if(feed.length == 0) {
    return (
      <div data-theme="dim" className='min-h-screen'>
            <div className='absolute left-1/2 transform -translate-x-1/2'>
                <div className='mt-[400px] '>
                    <h1 className='text-3xl font-bold tracking-tighter'>No new users found!</h1>
                </div>
            </div>
        </div>
    )
  }

  return feed && ( //when the feed is fetched then load the screen
    <div data-theme="dim" className=''>
      {/* <div className='absolute inset-0'>
        <img className='w-full h-screen object-cover' src={FEED_BG_IMG} alt='BG' />
      </div> */}
      <div className='flex justify-center items-center min-h-screen mx-5'>
        <UserCard user={feed[0]}/>
      </div>
    </div>
  )
}

export default Feed;