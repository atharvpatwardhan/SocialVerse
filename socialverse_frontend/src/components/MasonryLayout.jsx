import React from 'react'
import Masonry from 'react-masonry-css';
import { Post } from './Post';


const breakPoints = {
    default : 4,
    3000 : 6,
    2000 : 5,
    1200 : 3,
    1000 : 2,
    500 : 1
}


export const MasonryLayout = ({user,posts,setPosts}) => {
  return (
        <Masonry className='flex flex-wrap'>
        {
            posts?.map((post)=>(
                <Post user={user} key={post._id} post={post} setPosts={setPosts} />
            ))
        }
        </Masonry>
  )
}
