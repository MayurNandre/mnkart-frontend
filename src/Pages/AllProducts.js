import React, { useEffect, useState } from 'react'
import UploadProduct from '../Components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCards from '../Components/AdminProductCards'

const AllProducts = () => {
  /* For Opening and closing functionality of upload peoduct component */
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  /* For Storing All Product Fetched From The Database */
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async () => {
    const responseData = await fetch(SummaryApi.getProducts.url, {
      method: SummaryApi.getProducts.method
    })
    /* Converting response in json */
    const dataResponse = await responseData.json()

    console.log(dataResponse)
    /* Assigning the fetched product in allProducts state */
    setAllProducts(dataResponse?.data || [])

  }

  useEffect(() => {
    fetchAllProducts()
  }, [])


  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h1 className='font-bold text-lg '>All Products</h1>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full transition-all' onClick={() => setOpenUploadProduct(true)}>Uplod Product</button>
      </div>
      {/* All Product */}
      <div className='flex items-center flex-wrap gap-6 py-4 h-[calc(100vh-190px)] overflow-y-scroll' >
        {
          allProducts.map((product, index) => {
            return (
              <AdminProductCards fetchProducts={fetchAllProducts} data={product} key={index + "allProducts"} />
            )
          })
        }
      </div>
      {/* Upload Product Component */}
      {
        openUploadProduct && (
          <UploadProduct fetchProducts={fetchAllProducts} onClose={() => setOpenUploadProduct(false)} />
        )
      }

    </div>
  )
}

export default AllProducts
