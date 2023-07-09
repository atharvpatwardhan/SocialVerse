import './App.css';
import {Routes, Route} from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './pages/Home';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { Navbar } from './components/Navbar';
import { useState } from 'react';


function App() {

  const [searchTerm, setSearchTerm] = useState('');   

  
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);



  return (
    <GoogleOAuthProvider clientId= {process.env.REACT_APP_GOOGLE_API_TOKEN} >
      <Navbar loading={loading} setLoading={setLoading} searchTerm={searchTerm} setSearchTerm={setSearchTerm} posts={posts} setPosts = {setPosts} />
      <div className='hide-scrollbar'>
        <Routes>
          <Route path='login' element={<Login />}></Route>
          <Route path='/*' element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} posts={posts} setPosts = {setPosts} />}></Route>
        </Routes>
      </div>
    </GoogleOAuthProvider>
    
  );
}

export default App;
