import React, { useEffect, useState } from 'react'
import { MasonryLayout } from './MasonryLayout';
import HashLoader from 'react-spinners/HashLoader';

export const Search = ({searchTerm,setSearchTerm,posts}) => {


    const [loading, setLoading] = useState(false);

    

    // const searchPosts = () => {
    //     if (searchTerm !== '') {
    //         setLoading(true);
    //         const query = searchQuery(searchTerm.toLowerCase());
    //         client.fetch(query).then((data) => {
    //           setPosts(data);
    //           setLoading(false);
    //         });
    //       } else {
    //         client.fetch(feedQuery).then((data) => {
    //           setPosts(data);
    //           setLoading(false);
    //         });
    //       }
    
    // }

    
  
    useEffect(() => {
        setSearchTerm('');
    }, []);
  
  return (
    <div>
        {/* <div className='p-2 md:p-5'>
        <div className='hidden z-40 md:flex justify-center items-center w-full border-b py-5'>
        <div className='w-[500%] flex'>
            <div className='w-[50%] mx-auto flex justify-center items-center'>
            <input type='text' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search for a post.' className='bg-gray-50 p-2 border-2 w-full border-black rounded-xl'></input>
            <CiSearch size={40} onClick={searchPosts} />
            </div>
        </div>

        <div className='flex justify-end items-center gap-4 w-full cursor-pointer hover:scale-105 transition duration-500'>
            <img className='h-11 w-11 rounded-full' src={user?.image} />
            <h1>{user?.userName}</h1>
        </div>
        </div>
        </div> */}
        <div>
        <div>

        {loading && <div className='flex justify-center items-center h-screen'><HashLoader color="#dc2626" /></div>}
        {posts?.length !== 0 && <MasonryLayout posts={posts} />}
        {posts?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Posts Found!</div>
        )}
        </div>
        </div>
    </div>
  )
}
