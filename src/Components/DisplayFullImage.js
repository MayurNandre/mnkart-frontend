import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayFullImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-slate-100 bg-opacity-50'>
            <div className='bg-white shadow-2xl rounded max-w-5xl mx-auto'>
             <div className='p-4 w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            < IoMdClose />
          </div>
            <div className='flex justify-center p-4 max-h-[80vh] max-w-[35vw]'>
            <img src={imgUrl} className='w-full h-full' />
        </div>
            </div>
        
        </div>
    )
}

export default DisplayFullImage
