import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {BiSolidHomeAlt2} from 'react-icons/bi';
import { categories } from '../constants/categories';
import { MdAddBox } from 'react-icons/md';


export const SideBar = () => {


    const navigate = useNavigate();





  return (
    <div className='flex flex-col justify-between bg-white overflow-y-scroll min-w-210 hide-scrollbar border-r'>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col gap-5 w-full my-10'>
            <NavLink to={"/"} className={({isActive})=> isActive ? "flex text-md w-full font-bold justify-center items-center gap-2 border-r-2 border-red-600" : "flex text-md justify-center items-center gap-2"}>
                <BiSolidHomeAlt2 color='black' />
                Home
            </NavLink>
            <NavLink to={"/createpost"} className={({isActive})=> isActive ? "flex text-md font-bold justify-center items-center gap-2 border-r-2 border-red-600" : "flex text-md justify-center items-center gap-2"}>
                <MdAddBox />
                Create
            </NavLink>
            <h1 className='flex mx-auto justify-start text-md font-semibold'>Explore Categories</h1>
            {categories.map((c)=>(
                <div onClick={()=>navigate(`/category/${c.name}`)} key={c.name} className='flex justify-start gap-4 mx-20 md:mx-5 cursor-pointer hover:bg-gray-100 py-1 rounded-xl px-5'>
                    <img src={c.image} className='h-8 w-8 rounded-full' />
                    <h1 className='text-md'>{c.name}</h1>
                </div>
            ))}
            </div>
        </div>

    </div>
  )
}
