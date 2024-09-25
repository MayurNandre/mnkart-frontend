import React, { useContext } from 'react'
import scrollToTop from '../helper/scrollToTop'
import displayINRCurrency from '../helper/displayCurrency'
import addToCart from '../helper/addToCart'
import { Link } from 'react-router-dom'
import context from '../context'

const VerticalCard = ({loading,data=[]}) => {
    const loadingList = new Array(13).fill(null)
    const  {fetchCountCartItems} = useContext(context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchCountCartItems()
    }
    return (
        <div className='lg:grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] md:justify-around justify-center  transition-all gap-4'>
            {
                loading ? (
                    loadingList.map((v,index) => {
                        return (
                            <div key={"Loading"+index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                <div className='bg-slate-200 p-4 h-48 md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className=' p-2 rounded-full bg-slate-200 animate-pulse'></h2>
                                    <p className='capitalize text-slate-500  p-2 rounded-full bg-slate-200 animate-pulse'></p>
                                    <div className='flex gap-3'>
                                        <p className='  p-2 rounded-full bg-slate-200 w-full animate-pulse'></p>
                                        <p className=' p-2 rounded-full bg-slate-200 w-full animate-pulse'></p>
                                    </div>
                                    <button className='text-sm rounded-full h-4 p-2  bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data?.map((product, index) => {
                        return (
                            <Link key={"Product"+index} to={"/product/" + product?._id} className='w-full min-w-[300px] md:min-w-[300px] max-w-[300px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollToTop}>
                                <div className='bg-slate-200 p-4 h-48 md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product?.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white rounded-full px-2 py-0.5' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
            }
        </div>
    )
}

export default VerticalCard
