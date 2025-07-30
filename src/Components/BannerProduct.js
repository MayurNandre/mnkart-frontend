import React, { useEffect, useState } from 'react'
/* web img */
import img1 from '../assest/banner/img1.webp'
import img2 from '../assest/banner/img2.webp'
import img3 from '../assest/banner/img3.jpg'
import img4 from '../assest/banner/img4.jpg'
import img5 from '../assest/banner/img5.webp'
/* mob img */
import img1mobile from '../assest/banner/img1_mobile.jpg'
import img2mobile from '../assest/banner/img2_mobile.webp'
import img3mobile from '../assest/banner/img3_mobile.jpg'
import img4mobile from '../assest/banner/img4_mobile.jpg'
import img5mobile from '../assest/banner/img5_mobile.png'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(0)


    const deskTopImages = [
        img1,
        img2,
        img3,
        img4,
        img5
    ]

    const mobileTopImages = [
        img1mobile,
        img2mobile,
        img3mobile,
        img4mobile,
        img5mobile
    ]

    const nextImage = () => {
        if (deskTopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
    }

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(preve => preve - 1)
        }
    }

    /* Sliding top banner on perticular time */
    useEffect(() => {
        const interval = setInterval(() => {
            if (deskTopImages.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        }, 10000)
        return () => clearInterval(interval)
    }, [currentImage])




    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-60 md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>

                {/* Desktop and tablet version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        deskTopImages.map((imgurl, index) => {
                            return (
                                <div className='w-full h-full  min-w-full min-h-full transition-all' key={imgurl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imgurl} alt="" className='w-full h-full ' />
                                </div>
                            )
                        })
                    }
                </div>
                {/* Desktop and tablet version end*/}

                {/*  Mobile  version */}
                <div className='absolute z-10 w-full h-full flex items-center md:hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileTopImages.map((imgurl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imgurl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imgurl} alt="" className='w-full h-full object-fill' />
                                </div>
                            )
                        })
                    }
                </div>
                {/*  Mobile version end*/}
            </div>
        </div>
    )
}

export default BannerProduct
