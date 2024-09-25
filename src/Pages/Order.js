import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helper/displayCurrency'

const Order = () => {
  const [data, setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.orderList.url, {
      method: SummaryApi.orderList.method,
      credentials: 'include'
    })
    const responseData = await response.json()
    setData(responseData.data)
    console.log("orders :", responseData)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])
  return (
    <div>
      {
        !data[0] && (
          <p>No Data Available</p>
        )
      }
      <div className='p-4 w-full'>
        {
          data.map((item, index) => {
            return (
              <div key={item.userId + index}>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                <div className='border rounded'>

              <div className='flex flex-col lg:flex-row justify-between'>
                   <div className='grid gap-1'>
                              {
                                item?.productDetails?.map((product, index) => {
                                  return (
                                    <div key={product.productId + index} className='flex gap-3 bg-slate-100'>
                                      <img
                                        className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                                        src={product.image[0]} alt="" />
                                      <div>
                                        <div className='font-medium text-ellipsis line-clamp-1'>{product.name}</div>
                                        <div className='flex items-center gap-5 mt-1'>
                                          <div className='text-lg text-red-500'>{displayINRCurrency(product.price)}</div>
                                          <p>Quantity :{product.quantity}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </div>

                            <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                              {/* payment detail */}
                              <div>
                                <div className='text-lg font-medium'>Payment Details :</div>
                                <p className='ml-1'>Payment Method : {item.paymentDetails.payment_method_type}</p>
                                <p className='ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                              </div>
                              <div>
                                {/* Shipping details */}
                                <div className='text-lg font-medium'>Shipping Details :</div>
                                {
                                  item.shipping_options.map((shipping, index) => {
                                    return (
                                      <div className='ml-1' key={shipping.shipping_rate}>
                                        shipping Amount : {shipping.shipping_amount}
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>

                                
                   </div>


                            <div className='font-semibold ml-auto w-fit lg:text-lg '>
                              Total Amount : <span className='text-red-500'>{displayINRCurrency(item.totalAmount)}</span>
                            </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order
