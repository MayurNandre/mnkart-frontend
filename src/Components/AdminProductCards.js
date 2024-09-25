import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminProductEdit from './AdminProductEdit';
import displayINRCurrency from '../helper/displayCurrency';

const AdminProductCards = ({
    data,
    fetchProducts
}) => {
    /* EditProduct Component Open Close functionality */
    const [editProduct, setEditProduct] = useState(false)
    return (
        <div className='bg-white p-5 rounded'>
            <div className='w-40 '>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data.productImage[0]} alt='' className='mx-auto object-fill h-full' />
                </div>
                <h1 className='font-bold text-ellipsis line-clamp-2'>{data.productName}</h1>
                <div className='flex justify-between'>
                    <p className='font-semibold text-red-400'>
                        {
                            displayINRCurrency(data.sellingPrice)
                        }
                    </p>
                    <div onClick={() => setEditProduct(true)} className='w-fit ml-auto p-2 bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'>
                        <MdEdit />
                    </div>
                </div>
            </div>
            {
                editProduct && (
                    <AdminProductEdit fetchProducts={fetchProducts} productData={data} onClose={() => setEditProduct(false)} />
                )
            }
        </div>
    )
}

export default AdminProductCards

