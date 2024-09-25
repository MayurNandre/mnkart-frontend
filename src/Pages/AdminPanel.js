import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector(state => state.user?.user)

  const navigate = useNavigate()

  useEffect(() => {
    if(user?.role !== ROLE.ADMIN){
      navigate("/")
    }
  },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] hidden md:flex'>
      {/* Sidebar content */}
      <aside className='bg-white min-h-full w-full max-w-60 customShadow  rounded-r'>
        {/* profile picture section */}
        <div className='h-32 flex justify-center items-center flex-col'>
          <div className='text-5xl cursor-pointer relative flex justify-center mt-3' >
            {
              user?.profilePic ? (
                <img src={user?.profilePic} alt={user?.name} className='w-20 h-20 rounded-full ' />
              ) : (<FaUserCircle />)
            }
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-xs'>{user?.role}</p>
        </div>
        {/* ----------profile picture section end---------- */}

        {/* -------Navigation------- */}
        <div>
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={"all-product"} className='px-2 py-1 hover:bg-slate-100'>All Product</Link>
          </nav>
        </div>
      </aside>
      {/* Main content */}
      <main className='h-full w-full p-2'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
