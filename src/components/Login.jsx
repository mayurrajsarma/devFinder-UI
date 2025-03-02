import React, { useState } from 'react'
import { BASE_URL, LOGIN_BG_IMG } from '../utils/constants'
import Footer from './Footer'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch() ;
    const [emailId,setEmailId] = useState("elon@email.com") ;
    const [password,setPassword] = useState("Elon@123") ;
    const [firstName,setFirstName] = useState("") ;
    const [lastName,setLastName] = useState("") ;
    const [error,setError] = useState() ;
    const [isLogin,setIsLogin] = useState(true);
    const navigate = useNavigate() ;

    const handleLogin = async ()=> {
        try {
            const res = await axios.post(BASE_URL + "/login",{
                emailId,
                password,
            },
            {
            withCredentials:true,
            });
            // console.log(res.data);
            navigate("/") ;
            dispatch(addUser(res.data));
        } 
        catch (err) {
           setError(err?.response?.data || "Something went wrong"); 
           console.error(err) 
        }
    }

    const handleSignUp = async ()=> {
        try {
            const res = await axios.post(BASE_URL + "/signup",{
                firstName,
                lastName,
                emailId,
                password
            },{withCredentials: true});
            // console.log(res.data) ;
            dispatch(addUser(res?.data?.data));
            return navigate("/profile") ;
        } catch (err) {
            setError(err?.response?.data || "Something went wrong"); 
            console.log(err);
        }
    }

    const toggleLogin = ()=> {
        setIsLogin(!isLogin) ;
    }


    return (
        <div className=''>
            <div className='absolute inset-0'>
                <img className='w-full h-screen object-cover' src={LOGIN_BG_IMG} alt='BG' />
            </div>

            <div className='flex justify-center items-center min-h-screen'>
                <div className="card bg-base-300 shadow-xl w-full max-w-sm">
                    <div className="card-body ">
                        <h1 className="card-title mb-2">{isLogin? "Login": "Sign Up"}</h1>
                        {!isLogin && <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input 
                                type="text"
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)} 
                                className="grow" 
                                placeholder="Firstname" 
                            />
                        </label>}
                        {!isLogin && <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                                className="grow" 
                                placeholder="Lastname" />
                        </label>}
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input 
                                type="text" 
                                value={emailId}
                                onChange={(e)=>setEmailId(e.target.value)} 
                                className="grow" 
                                placeholder="Email" 
                            />
                        </label>
                        
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                            </svg>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e)=>setPassword(e.target.value)}
                                className="grow" 
                                placeholder="Password" 
                            />
                        </label>
                        {error && <p className='text-red-500 mb-3'>{error}</p>}
                        <p className='mb-4' >{isLogin?(
                            <>New to DevFinder? <span className="text-red-500 cursor-pointer hover:text-red-700  transition" onClick={toggleLogin}>Sign up</span> now.</> 
                        ):( 
                            <>Already registered? <span className="text-red-500 cursor-pointer hover:text-red-700" onClick={toggleLogin}>Login</span> now.</>)}</p>
                        <div className="card-actions justify-center ">
                            <button className="btn  btn-primary" onClick={isLogin? handleLogin : handleSignUp}>{isLogin? "Login": "Sign Up"}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    
    )
}

export default Login