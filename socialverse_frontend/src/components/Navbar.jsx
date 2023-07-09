import React, { useEffect, useState } from 'react'
import { userQuery } from '../utils/userData';
import { client } from '../client';
import { SearchBar } from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({searchTerm,setSearchTerm,posts,setPosts,loading,setLoading}) => {

    const [user,setUser] = useState(null);


    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    const navigate = useNavigate();

    useEffect(()=>{

        const query = userQuery(userInfo?.sub);

        client.fetch(query)

        .then((data)=>{
            setUser(data[0]);
        })
        

    },[])


  return (
    <div className='hidden z-40 md:flex justify-center items-center w-full border-b py-1 h-20'>
        <Link to={"/"} className='flex hover:scale-105 transition duration-500 font-semibold px-5 gap-2 my-6 pt-1 w-190 justify-center mx-10 items-center text-red-600 text-4xl'>SocialVerse</Link>
        <div className='w-[500%] flex'>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} posts={posts} setPosts={setPosts} loading={loading} setLoading={setLoading} />
        </div>

        <div onClick={()=>navigate(`/user/${user?._id}`)} className='flex justify-end items-center gap-4 w-full cursor-pointer hover:scale-105 transition duration-500 px-4'>
            <img className='h-11 w-11 rounded-full' src={user?.image} />
            <h1>{user?.userName}</h1>
        </div>
    </div>
  )
}
