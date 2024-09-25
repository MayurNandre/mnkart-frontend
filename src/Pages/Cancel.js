import React from 'react'
import cancelimg from '../assest/cancel.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div className='bg-slate-200 mx-auto max-w-md rounded flex flex-col items-center justify-center my-2 py-4 w-full'>
            <img width={150} height={150} className='mix-blend-multiply' src={cancelimg} alt="" />
            <p className='text-red-600 font-bold text-xl my-2'>Payment Cancelled</p>
            <Link to={'/user-cart'} className='p-2 mt-5 rounded font-semibold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white '>Go To Cart</Link>
        </div>
    )
}

export default Cancel
