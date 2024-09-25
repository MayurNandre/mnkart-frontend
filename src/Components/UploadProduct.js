import React, { useState } from 'react'
import productCategory from '../helper/productCategory'
import uploadImage from '../helper/uploadImage'
import DisplayFullImage from './DisplayFullImage'
import { toast } from 'react-toastify';
/* React Icons */
import { FaCloudUploadAlt } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common'

const UploadProduct = ({
  onClose,
  fetchProducts
}) => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  /* for Open close the component (DisplayFullScreenImage) */
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  /*for Providing clicked img url to the (DisplayFullScreenImage) Component */
  const [fullScreenImage, setFullScreenImage] = useState()

  // ---------handles Input data---------
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  /* ----------- handle Upload Product----------- */
  const handleUploadProduct = async (e) => {
    /* -----------Taking the img and upload on cloudinary----------- */
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)
    /* Seting img url from cloudinary to the state hook by assigning previous value and new one */
    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  /* Handle delete product image via delete icon */
  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage]
    /* deleting the img by there index */
    newProductImage.splice(index, 1)

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage]
      }
    })
  }

  /*----------Submiting : Upload Product---------- */
  const handleSubmit = async (e) => {
    e.preventDefault()
    /* Uploading Product to DataBase */
    const responseData = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const Response = await responseData.json()

    if(Response.success){
      toast.success(Response.message)
      onClose()
      fetchProducts()
    }

    if(Response.error){
      toast.error(Response.message)
    }
  }

  return (
    /* outside the product add box */
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-60 bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
      {/*add   product box */}
      <div className='bg-white p-4 rounded shadow-md w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'> Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            < IoMdClose />
          </div>
        </div>

        {/* Form to add product */}
        <form action="" className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name :</label>
          <input
            className='p-2 bg-slate-100 border rounded '
            type="text"
            id="productName"
            name='productName'
            placeholder='Enter Product Name'
            value={data.productName}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="brandName" className='mt-2'>Brand Name :</label>
          <input
            className='p-2 bg-slate-100 border rounded '
            type="text"
            id="brandName"
            name='brandName'
            placeholder='Enter Brand Name'
            value={data.brandName}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="category" className='mt-2'>Category :</label>
          <select required name="category" id="category" value={data.category} className='p-2 bg-slate-100 border rounded' onChange={handleOnChange}>
            <option value="">Select Product Category</option>
            {
              productCategory.map((cat, index) => {
                return (
                  <option value={cat.value} key={cat.value + index}>{cat.label}</option>
                )
              })
            }
          </select>

          {/* product image section start */}
          <label htmlFor="productImage" className='mt-2'>Product Image :</label>
          {/* Product Image Upload Box */}
          <label htmlFor="uploadImageInput">
            <div className='w-full h-32 p-2 bg-slate-100 border rounded flex justify-center items-center cursor-pointer'>
              <div className='text-slate-500 flex flex-col justify-center items-center gap-2'>
                <span className='text-5xl'><FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type="file" id='uploadImageInput' name='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>
            </div>
          </label>
          {/* Section detail : Choosen images will apear below */}
          <div>
            {
              data?.productImage[0] ? (
                <div className='flex items-center gap-2'>{
                  data.productImage.map((img, index) => {
                    return (
                      <div className='relative group'>
                        <img
                          key={index}
                          src={img}
                          alt={img}
                          width={80}
                          height={80}
                          className='bg-slate-100 border cursor-pointer'
                          onClick={() => {
                            setOpenFullScreenImage(true)
                            setFullScreenImage(img)
                          }} />
                        {/* Delete icon for deleting the selected img */}
                        <div onClick={() => { handleDeleteProductImage(index) }} className='cursor-pointer absolute bottom-1 right-1 p-1  bg-red-500 rounded-full hover:bg-red-700 transition-all text-white hidden group-hover:block'>
                          <MdDelete />
                        </div>
                      </div>
                    )
                  })
                }</div>
              ) : (
                <p className='text-red-600 text-xs'>*Upload Product Image</p>
              )
            }
          </div>
          {/* Section detail : Choosen images will apear  End*/}
          {/* product image section end */}
          <label className='mt-3 ' htmlFor="price">Price :</label>
          <input
            className='p-2 bg-slate-100 border rounded '
            type="number"
            id="price"
            name='price'
            placeholder='Enter Price'
            value={data.price}
            onChange={handleOnChange}
            required
          />

          <label className='mt-3' htmlFor="sellingPrice">Selling Price :</label>
          <input
            className='p-2 bg-slate-100 border rounded '
            type="text"
            id="sellingPrice"
            name='sellingPrice'
            placeholder='Enter Selling Price'
            value={data.sellingPrice}
            onChange={handleOnChange}
            required
          />

          <label className='mt-3' htmlFor="description">Description :</label>
          <textarea
            className='bg-slate-100 h-28 border rounded mb-3 resize-none p-1'
            name="description"
            id="description"
            value={data.description}
            placeholder='Enter Product Description'
            onChange={handleOnChange}
            required
          ></textarea>

          <button className='px-3 py-2 mb-10 bg-red-600 hover:bg-red-700 rounded text-white font'>Upload Product</button>
        </form>
      </div>
      {/* -----------Display the image in full view when you click on it----------- */}
      {
        openFullScreenImage &&
        <DisplayFullImage imgUrl={fullScreenImage} onClose={() => { setOpenFullScreenImage(false) }} />
      }
    </div>
  )
}

export default UploadProduct
