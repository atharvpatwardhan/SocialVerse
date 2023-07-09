import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Feed } from '../components/Feed'
import { CreatePost } from '../components/CreatePost'
import { PostInfo } from '../components/PostInfo'
import { Search } from '../components/Search'
import { UserProfile } from '../components/UserProfile'

export const Posts = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='p-2 md:p-5 hide-scrollbar'>
      <div className='h-full'>
      {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Feed user={user} />} ></Route>
          <Route path='/user/:userId' element={<UserProfile user={user} />} />
          <Route path='/category/:categoryId' element={<Feed user={user} />}></Route>
          <Route path='/createpost' element={<CreatePost user={user} />}></Route>
          <Route path='/post/:postId' element={<PostInfo user={user} />}></Route>
          <Route path='/search' element={<Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />}></Route>
        </Routes>
      </div>
    </div>
  )
}
