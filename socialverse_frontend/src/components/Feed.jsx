import React, { useEffect, useState } from 'react'

import { client } from '../client';
import { useParams } from 'react-router-dom';
import { feedQuery, searchQuery } from '../utils/userData';
import { MasonryLayout } from './MasonryLayout';
import { Post } from './Post';
import HashLoader from 'react-spinners/HashLoader';

export const Feed = ({user}) => {

    // console.log(user);

    const [loading,setLoading] = useState(true);
    const [posts,setPosts] = useState(null);

    const {categoryId} = useParams();

    useEffect(()=>{
        if(categoryId){
            setLoading(true);

            const query = searchQuery(categoryId);

            client.fetch(query)
            .then((data)=>{
                setPosts(data);
                setLoading(false);
            });

        }else{
            setLoading(true);
            client.fetch(feedQuery)
            .then((data)=>{
                setPosts(data);
                setLoading(false);
            })

        }
    },[categoryId])

    if(loading) return <div className='flex justify-center items-center h-screen'><HashLoader color="#dc2626" /></div>

  return (
    <div className='hide-scrollbar'>
        {posts
        &&
        <MasonryLayout user={user} posts={posts} setPosts={setPosts} />}
    </div>
  )
}
