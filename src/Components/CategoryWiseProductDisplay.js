import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import displayINRCurrency from '../helper/displayCurrency'
import addToCart from '../helper/addToCart'
import { Link } from 'react-router-dom'
import context from '../context'
import scrollToTop from '../helper/scrollToTop'

const CategoryWiseProductDisplay = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const  {fetchCountCartItems} = useContext(context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchCountCartItems()
    }


    const fetchData = async () => {
        setLoading(true)
        const categoryWiseProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        // console.log(categoryWiseProduct.data)
        setData(categoryWiseProduct?.data)

    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className='container px-4 my-6 relative'>

            <h2 className='capitalize text-2xl font-semibold py-4'>{heading}</h2>

            <div  className='lg:grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-around transition-all'>
                {
                    loading ? (
                        loadingList.map((value,index) => {
                            return (
                                <div key={"Loading"+index}  className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
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
                    ):(
                    data.map((product, index) => {
                        return (
                            <Link key={"Product"+index} to={"/product/"+product?._id} className=' my-4 w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollToTop}>
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
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white rounded-full px-2 py-0.5' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
                }
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay

