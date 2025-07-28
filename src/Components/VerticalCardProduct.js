import { useContext, useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import context from '../context'
import addToCart from '../helper/addToCart'
import displayINRCurrency from '../helper/displayCurrency'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

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


    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }
    let ProductLoad = 100;
    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='capitalize text-2xl font-semibold py-4'>{heading}</h2>

            <div ref={scrollElement} className='transition-all flex items-center gap-6 overflow-x-scroll scrollbar-none'>

                <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>

                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight} ><FaAngleRight /></button>
                {
                    loading ? (
                        loadingList.map(() => {
                            return (
                                <div key={ProductLoad++} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
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
                            <Link key={index} to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
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

export default VerticalCardProduct

