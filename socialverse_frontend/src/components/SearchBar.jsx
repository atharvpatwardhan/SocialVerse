import React from 'react'
import {CiSearch} from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/userData';

export const SearchBar = ({searchTerm,setSearchTerm,posts,setPosts,loading,setLoading}) => {

  const navigate = useNavigate();


  
  const searchPosts = () => {
    if (searchTerm !== '') {
        setLoading(true);
        const query = searchQuery(searchTerm.toLowerCase());
        client.fetch(query).then((data) => {
          setPosts(data);
          setLoading(false);
        });
      } else {
        client.fetch(feedQuery).then((data) => {
          setPosts(data);
          setLoading(false);
        });
      }

}


  return (
    <div className='w-[50%] mx-auto flex justify-center items-center'>
        <input type='text' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} onFocus={()=>navigate('/search')} placeholder='Search for a post.' className='bg-gray-50 p-2 border-2 w-full border-black rounded-xl'></input>
        <CiSearch size={40} onClick={searchPosts} />
    </div>
  )
}
