import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import context from '../context'
import displayINRCurrency from '../helper/displayCurrency'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js';

const UserCart = () => {

  const [data, setData] = useState([])

  /* geting context data */
  const Context = useContext(context)

  /* Loading view */
  const [loading, setLoading] = useState(false)
  const loadingCart = new Array(Context.cartItemsCount).fill(null)

  /* Fetching cart items */
  const fetchCartItems = async () => {
    const response = await fetch(SummaryApi.userCartView.url, {
      method: SummaryApi.userCartView.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json",
      }
    })
    const dataResponse = await response.json()
    if (dataResponse.success) {
      setData(dataResponse?.data)
    }
  }

  const handleLoading = async () => {
    await fetchCartItems()
  }

  useEffect(() => {
    setLoading(true)
    handleLoading()
    setLoading(false)
    // Context.fetchCountCartItems()
  }, [])

  const increaseQauntity = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1
      })
    })
    const dataResponse = await response.json()
    if (dataResponse.success) {
      fetchCartItems()
    }
  }

  const decreaseQauntity = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1
        })
      })
      const dataResponse = await response.json()
      if (dataResponse.success) {
        fetchCartItems()
      }
    }
  }

  /* Delete Product from cartr*/
  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id
      })
    })
    const dataResponse = await response.json()
    if (dataResponse.success) {
      setLoading(false)
      fetchCartItems()
      toast.success(dataResponse.message)
      Context.fetchCountCartItems()
    }
  }

  const qauntityCount = data.reduce((previousValue, currentValue) => previousValue + currentValue?.quantity, 0)

  const totalPrice = data.reduce((previous, current) => previous + (current?.quantity * current?.productId?.sellingPrice), 0)


  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        cartItems: data
      })
    })
    const dataResponse = await response.json()
    if(dataResponse?.id){
      stripePromise.redirectToCheckout({sessionId : dataResponse.id})
    }
    console.log("Payment Response", dataResponse)
  }

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {
          data.length === 0 && loading && (
            <p className='bg-white text-red-600 py-5'>No Items in your Cart</p>
          )
        }
      </div>
      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* View Cart Items */}
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart.map((el, index) => {
                return (
                  <div key={el + "cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'></div>
                )
              })
            ) : (
              data.map((product, index) => {
                return (
                  <div key={product?._id} className='w-full bg-white h-32 my-2 border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                    {/* product img */}
                    <div className='w-32 h-32 bg-slate-200 p-2'>
                      <img src={product?.productId?.productImage[0]} alt="" className='w-full h-full object-scale-down mix-blend-multiply' />
                    </div>
                    <div className='px-4 py-2 relative'>
                      {/* Delete item */}
                      <div onClick={() => deleteCartProduct(product?._id)} className='absolute right-0 top-0 p-1 m-1 cursor-pointer text-red-600 lg:text-2xl rounded-full  hover:bg-red-600 hover:text-white'>
                        <MdDelete />
                      </div>
                      <h2 className='text-lg lg:text-1xl text-ellipsis line-clamp-1 font-semibold'>{product?.productId?.productName}</h2>
                      <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                      <div className='flex justify-between'>
                        <p className='font-medium text-red-600 text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                        <p className='font-medium text-slate-600 text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                      </div>
                      <div className='flex items-center gap-3 mt-1'>
                        <button onClick={() => decreaseQauntity(product?._id, product?.quantity)} className='font-bold border border-red-600 text-red-600 w-6 h-6 rounded flex justify-center items-center hover:bg-red-600 hover:text-white'>-</button>
                        <span className='text-red-600 font-medium text-lg'>{product?.quantity}</span>
                        <button onClick={() => increaseQauntity(product?._id, product?.quantity)} className='font-bold border border-red-600 text-red-600 w-6 h-6 rounded flex justify-center items-center hover:bg-red-600 hover:text-white'>+</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

        {/*Summary -  Total items in cart */}
        {
          data[0] && (
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
              {
                loading ? (
                  <div className='h-36 bg-slate-200 animate-pulse'></div>
                ) : (
                  <div className='h-34 bg-white'>
                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                    <div className='flex items-center justify-between gap-2 px-4 font-medium text-lg text-slate-600'>
                      <p>Qauntity</p>
                      <p>{qauntityCount}</p>
                    </div>

                    <div className='flex items-center justify-between gap-2 px-4 font-medium text-lg text-slate-600'>
                      <p>Total Price</p>
                      <p>{displayINRCurrency(totalPrice)}</p>
                    </div>
                    <div className='mt-2'>
                      <button className='bg-blue-600 p-1 text-white w-full hover:bg-blue-800 transition-all' onClick={handlePayment}>Proceed To Payment</button>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }



      </div>
    </div>
  )
}

export default UserCart
