import { loadStripe } from '@stripe/stripe-js';
import { useContext, useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import context from '../context';
import displayINRCurrency from '../helper/displayCurrency';

const UserCart = () => {
  const [data, setData] = useState([]);
  const [addressInfo, setAddressInfo] = useState({ fullName: '', phone: '', address: '' });
  const Context = useContext(context);
  const [loading, setLoading] = useState(false);
  const loadingCart = new Array(Context.cartItemsCount).fill(null);

  const fetchCartItems = async () => {
    const response = await fetch(SummaryApi.userCartView.url, {
      method: SummaryApi.userCartView.method,
      credentials: 'include',
      headers: { "content-type": "application/json" },
    });
    const dataResponse = await response.json();
    if (dataResponse.success) setData(dataResponse?.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchCartItems().finally(() => setLoading(false));
  }, []);

  const updateQuantity = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ _id: id, quantity: qty })
    });
    const dataResponse = await response.json();
    if (dataResponse.success) fetchCartItems();
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ _id: id })
    });
    const dataResponse = await response.json();
    if (dataResponse.success) {
      setLoading(false);
      fetchCartItems();
      toast.success(dataResponse.message);
      Context.fetchCountCartItems();
    }
  };

  const quantityCount = data.reduce((acc, item) => acc + item?.quantity, 0);
  const totalPrice = data.reduce((acc, item) => acc + (item?.quantity * item?.productId?.sellingPrice), 0);

  const handlePayment = async () => {
    const { fullName, phone, address } = addressInfo;
    if (!fullName || !phone || !address) {
      toast.error("Please fill in all address fields");
      return;
    }
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cartItems: data, shippingInfo: addressInfo })
    });
    const dataResponse = await response.json();
    if (dataResponse?.id) stripePromise.redirectToCheckout({ sessionId: dataResponse.id });
  };

  return (
    <div className='container mx-auto p-4'>
      {data.length === 0 && !loading && <p className='text-center text-red-600 py-5'>No Items in your Cart</p>}
      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='w-full max-w-3xl'>
          {loading ? (
            loadingCart.map((_, index) => <div key={index} className='w-full bg-slate-200 h-32 my-2 animate-pulse rounded'></div>)
          ) : (
            data.map(product => (
              <div key={product?._id} className='w-full bg-white h-32 my-2 rounded flex border'>
                <div className='w-32 h-32 bg-slate-200 p-2'>
                  <img src={product?.productId?.productImage[0]} alt='' className='w-full h-full object-contain mix-blend-multiply' />
                </div>
                <div className='flex-1 p-2 relative'>
                  <div onClick={() => deleteCartProduct(product?._id)} className='absolute right-2 top-2 cursor-pointer text-red-600 text-xl hover:bg-red-600 hover:text-white rounded-full p-1'>
                    <MdDelete />
                  </div>
                  <h2 className='text-sm md:text-lg font-semibold truncate'>{product?.productId?.productName}</h2>
                  <p className=' text-sm md:text-lg capitalize text-slate-500'>{product?.productId?.category}</p>
                  <div className='flex justify-between mt-1'>
                    <p className='font-medium text-red-600 text-sm'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                    {/* total price */}
                    <div className="relative group inline-block cursor-pointer">
                      <p className="font-medium text-slate-600 text-sm">
                        {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
                      </p>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
                        Total = Price × Quantity
                      </div>
                    </div>
                    {/* total price */}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(product?._id, product?.quantity - 1)}
                      disabled={product?.quantity <= 1}
                      className="w-6 h-6 md:w-8 md:h-8 text-sm md:text-lg border border-red-600 text-red-600 rounded flex justify-center items-center hover:bg-red-600 hover:text-white"
                    >
                      -
                    </button>
                    <span className="text-sm md:text-lg font-medium">{product?.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product?._id, product?.quantity + 1)}
                      className="w-6 h-6 md:w-8 md:h-8 text-sm md:text-lg border border-red-600 text-red-600 rounded flex justify-center items-center hover:bg-red-600 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {data.length > 0 && (
          <div className='w-full max-w-sm'>
            <div className='bg-white rounded shadow-md'>
              <h2 className='bg-red-600 text-white px-4 py-2 text-lg font-semibold'>Summary</h2>
              <div className='px-4 py-2 text-slate-700'>
                <div className='flex justify-between mb-2'>
                  <span>Quantity</span>
                  <span>{quantityCount}</span>
                </div>
                <div className='flex justify-between mb-4'>
                  <span>Total Price</span>
                  <span>{displayINRCurrency(totalPrice)}</span>
                </div>

                <h3 className='font-semibold mb-2'>Delivery Address</h3>
                <input
                  type='text'
                  placeholder='Full Name'
                  className='w-full p-2 mb-2 border rounded'
                  value={addressInfo.fullName}
                  onChange={(e) => setAddressInfo({ ...addressInfo, fullName: e.target.value })}
                />
                <input
                  type='tel'
                  placeholder='Phone Number'
                  className='w-full p-2 mb-2 border rounded'
                  value={addressInfo.phone}
                  onChange={(e) => setAddressInfo({ ...addressInfo, phone: e.target.value })}
                />
                <textarea
                  placeholder='Full Address'
                  className='w-full p-2 mb-4 border rounded'
                  value={addressInfo.address}
                  onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
                />
                <button onClick={handlePayment} className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800'>Proceed To Payment</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCart;
