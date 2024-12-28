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


  return feed && ( //when the feed is fetched then load the screen
    <div className=''>
      <div className='absolute h-screen bg-cover overflow-hidden sm:bg-contain sm:bg-top'>
        <img className='md:h-auto  bg-gradient-to-b from-black' src={FEED_BG_IMG} alt='BG' />
      </div>
      <div className='absolute left-1/2 transform -translate-x-1/2 mt-40'>
        <UserCard user={feed[0]}/>
      </div>
    </div>
  )
}

export default Feed;