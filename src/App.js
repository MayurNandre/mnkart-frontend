import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartItemsCount,setCartItemsCount] = useState(0)

  /* ----fetching user detail----- */
  const fetchUserDetails = async () => {

    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  }

const fetchCountCartItems = async()=>{
  const response = await fetch(SummaryApi.countCartItems.url,{
    method : SummaryApi.countCartItems.method,
    credentials : 'include',
  })
  const dataResponse = await response.json()
  setCartItemsCount(dataResponse?.data?.countItems)
}

  useEffect(() => {
    /* ---user detail---- */
    fetchUserDetails()
    /* Counting cart items */
    fetchCountCartItems()
  }, )

  return (
    <>
      {/* context provider is used to provide user detail to all the page iside them */}
      <context.Provider value={{
        fetchUserDetails, //fetch user detail
        cartItemsCount,//current User Cart items count
        fetchCountCartItems // User Cart items count fetching
      }}>

        <ToastContainer  position="bottom-left" theme="dark" autoClose={3500}/>
        <Header />
        <main className='min-h-[calc(100vh-100px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
      </context.Provider>
    </>
  );
}

export default App;
