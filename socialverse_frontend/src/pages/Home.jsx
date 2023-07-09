import React, {useRef,useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link,Route,Routes} from 'react-router-dom'
import { userQuery } from '../utils/userData'
import { SideBar } from '../components/SideBar'
import { UserProfile } from '../components/UserProfile'
import {client} from '../client';
import { Posts } from './Posts'
import { useState } from 'react'
import { CreatePost } from '../components/CreatePost'
import { Search } from '../components/Search'
import { Feed } from '../components/Feed'

export const Home = ({searchTerm,setSearchTerm,posts,setPosts}) => {

    const [sideBar,setSideBar] = useState(false);
    const [user,setUser] = useState(null);
    const scrollRef = useRef(null);

    const handleToggle = () => {
        setSideBar(!sideBar);
    }


    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();


    useEffect(()=>{

        const query = userQuery(userInfo?.sub);

        client.fetch(query)

        .then((data)=>{
            setUser(data[0]);
        })
        

    },[])

    useEffect(()=>{
        scrollRef.current.scrollTo(0,0);
    })

  return (
    <div className='flex md:flex-row flex-col h-screen transition-height duration-75 ease-out hide-scrollbar'>
        <div className='hidden md:flex flex-initial hide-scrollbar'>
            <SideBar user={user && user} />
        </div>
        <div className='flex md:hidden flex-row hide-scrollbar'>
            <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
            <HiMenu fontSize={40} className='cursor-pointer' onClick={handleToggle} />
            <Link to={"/"}>
                <h1>SocialVerse</h1>
            </Link>
            <Link to={`/user-profile/${user?._id}`}>
                <img src={user?.image} className='rounded-full' />
            </Link>
            </div>
            {sideBar && (
            <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                <div className='absolute w-full flex justify-end items-center p-2'>
                    <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={handleToggle}  />
                </div>
                <SideBar user={user && user} closeToggle = {handleToggle} />
            </div>
        )}
        </div>
        <div className='pb-2 flex-1 h-screen overflow-y-scroll hide-scrollbar' ref={scrollRef}>
            <Routes>
                <Route path='/user/:userId' element={<UserProfile user={user} />} />
                <Route path='/' element={<Posts user={user && user} />} />
                <Route path='/category/:categoryId' element={<Feed user={user} />}></Route>
                <Route path='/createpost' element={<CreatePost user={user && user} />} />
                <Route path='/search' element={<Search user={user} setSearchTerm={setSearchTerm} searchTerm={searchTerm} posts={posts} setPosts={setPosts} />} />
            </Routes>
        </div>
    </div>
  )
}
