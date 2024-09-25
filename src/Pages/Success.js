import React from 'react'
import successimg from '../assest/success.jpg'
import { Link } from 'react-router-dom'

const success = () => {
  return (
    <div className='bg-slate-200 rounded flex flex-col items-center justify-center my-10 py-4 mx-auto max-w-md'>
      <img width={150} height={150} className='mix-blend-multiply' src={successimg} alt="" />
      <p className='text-green-600 font-bold text-xl my-2'>Payment Successful</p>
      <Link to={'/order'} className='p-2 mt-5 rounded font-semibold border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white '>See Orders</Link>
    </div>
  )
}

export default success
