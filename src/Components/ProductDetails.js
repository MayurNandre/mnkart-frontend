import React, { useCallback, useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import { useNavigate, useParams } from 'react-router-dom'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import displayINRCurrency from '../helper/displayCurrency'
import CategoryWiseProductDisplay from './CategoryWiseProductDisplay'
import context from '../context'
import addToCart from '../helper/addToCart'

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })


    const [loading, setLoading] = useState(false)
    const [activeImg, setActiveimg] = useState("")
    const productImageListLoading = new Array(4).fill(null)
    const params = useParams()
    const [zoomImgCoordinate, setZoomImgCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImg, setZoomImg] = useState(false)

    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()
        setData(dataResponse.data)
        setActiveimg(dataResponse.data.productImage[0])
    }
    // console.log(data)

    useEffect(() => {
        fetchProductDetails()
    }, [params?.id])
/* Mouse Enter */
    const handleMouseEnterProduct = (imgUrl) => {
        setActiveimg(imgUrl)
    }
    /* Zoom image Handler */
    const handleZoomImage = useCallback((e) => {
        setZoomImg(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        // console.log("Coordinates :", left, top, width, height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImgCoordinate({
            x,
            y
        })
    }, [zoomImgCoordinate])
/* Zoom */
    const handleLeaveImgZoom = () => {
        setZoomImg(false)
    }
/* context */
    const  {fetchCountCartItems} = useContext(context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchCountCartItems()
     }

     const navigate=useNavigate()
/* Buy Handler */
const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    navigate("/user-cart")
    fetchCountCartItems()
 }

    return (
        <div className='container p-4 mx-auto'>

            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* Product Img */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-4'>
                        <img src={activeImg} alt="" className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImgZoom} />
                        {/* Product Zoom */}
                        {
                            zoomImg && (
                                <div className='absolute min-w-[500px] min-h-[385px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden'>
                                    <div className='w-full h-full min-h-[400px] min-w-[500px]mix-blend-multiply scale-105'
                                        style={
                                            {
                                                backgroundImage: `url(${activeImg})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: `${zoomImgCoordinate.x * 100}% ${zoomImgCoordinate.y * 100}%`
                                            }
                                        }>

                                    </div>
                                </div>
                            )
                        }

                    </div>
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-4 lg:flex-col overflow-scroll scrollbar-none h-full animate-pulse'>
                                    {
                                        productImageListLoading.map((e1,index) => {
                                            return (
                                                <div key={"laoding"+index} className='h-20 w-20 bg-slate-200 rounded'></div>
                                            )
                                        })
                                    }  </div>
                            ) : (
                                <div className='flex gap-4 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data?.productImage?.map((imgUrl, index) => {
                                            return (
                                                <div key={"IMG"+index} className='h-20 w-20 bg-slate-200 rounded p-1' >
                                                    <img key={imgUrl} src={imgUrl} alt="" className='w-full h-full object-scale-down mix-blend-multiply hover:scale-110 cursor-pointer'
                                                        onMouseEnter={() => handleMouseEnterProduct(imgUrl)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* Product details Loading*/}
                {
                    loading ? (
                        <div className='flex flex-col w-full gap-4 mt-2'>
                            <p className='bg-slate-200 h-6 w-full rounded-full animate-pulse lg:h-8'></p>
                            <h2 className='h-6 w-full rounded-full bg-slate-200 animate-pulse lg:h-8'></h2>
                            <p className='bg-slate-200 h-6 w-full  rounded-full animate-pulse lg:h-8'></p>
                            <div className='rounded-full bg-slate-200 h-6 w-full lg:h-8'></div>
                            {/*Price Section  */}
                            <div className='flex items-center gap-2'>
                                <p className=' bg-slate-200 h-6 w-full rounded-full animate-pulse lg:h-8'></p>
                                <p className=' bg-slate-200 h-6 w-full rounded-full animate-pulse lg:h-8'></p>
                            </div>
                            {/* Buttons */}
                            <div className='flex items-center flex-row gap-2 my-1'>
                                <button className='rounded-full p-3 min-w-[120px] bg-slate-200 animate-pulse lg:h-8'></button>
                                <button className='rounded-full p-3 min-w-[120px] bg-slate-200 animate-pulse lg:h-8'></button>
                            </div>
                            {/* Description */}
                            <div className=''>
                                <p className='bg-slate-200 h-6 w-full mb-4 rounded-full animate-pulse lg:h-8'></p>
                                <p className='bg-slate-200 h-6 w-full rounded-full animate-pulse lg:h-8'></p>
                            </div>
                        </div>
                    ) : (
                        /* -------------Product details-------------*/
                        <div className='flex flex-col gap-2 my-2'>
                            <p className='bg-red-200 text-red-600 px-3 rounded-full w-fit font-bold text-xl'>{data?.brandName}</p>
                            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                            <p className='text-slate-500 capitalize'>{data?.category}</p>
                            <div className='text-red-500 flex items-center flex-row gap-1 text-xl'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalf />
                            </div>
                            {/*Price Section  */}
                            <div className='flex items-center gap-2 font-medium my-1 lg:text-3xl text-2xl'>
                                <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                                <p className='text-slate-500 line-through'>{displayINRCurrency(data?.price)}</p>
                            </div>
                            {/* Buttons */}
                            <div className='flex items-center flex-row gap-4 my-1'>
                                <button onClick={(e)=>handleBuyProduct(e,data?._id)} className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 hover:bg-red-600 hover:text-white'>Buy</button>
                                <button onClick={(e)=>handleAddToCart(e,data?._id)} className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 hover:bg-red-600 hover:text-white'>Add to cart</button>
                            </div>
                            {/* Description */}
                            <div>
                                <p className='text-slate-600 font-medium text-xl my-1'>Description</p>
                                <p className='text-slate-800'>{data?.description}</p>
                            </div>
                        </div>
                    )
                }
            </div >
            {
                data?.category && (
                    <CategoryWiseProductDisplay heading={"Recommended Product's"} category={data?.category} />
                )
            }
        </div >
    )
}

export default ProductDetails
