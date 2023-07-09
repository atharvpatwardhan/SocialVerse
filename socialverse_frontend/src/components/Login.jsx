import React from 'react'
import loginVideo from '../assets/pexels-joshua-6756650 (2160p).mp4'
import { GoogleLogin,googleLogout } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { client } from '../client'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate();

    const getUser = async (response) => {
        const decoded = jwt_decode(response.credential);
        console.log(decoded);
        localStorage.setItem('user',JSON.stringify(decoded));

        const {name, sub, picture} = decoded;


        const doc = {
            _id : sub,
            _type : 'user',
            userName : name,
            image : picture
        }

        client.createIfNotExists(doc)
        .then(()=>{navigate('/',{replace:true})});



    }

    const user = false;
  return (
    <div className='flex justify-center items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video
            className='w-full h-full object-cover'
            src={loginVideo}
            type = "video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            />
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                {/* <div className='p-5'>
                </div> */}
                <div className='shadow-2xl'>
                    {user ? (<div>Logged In</div>) : <GoogleLogin onSuccess={(response) => getUser(response)} onError={()=>console.log('error')} />}
                </div>

            </div>
        </div>
    </div>
  )
}
