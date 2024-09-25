import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
/* -----------------Icons----------------- */
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import context from '../context';
import LogoImg from '../assest/image.png'


const Header = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user?.user)
  // console.log("user header :", user)
  const dispatch = useDispatch();
  /* ---For Displaying the Admin Menu --- */
  const [menuDisplay, setMenuDisplay] = useState(false)
  const Context = useContext(context)
  /* Search.... */
const searchInput = useLocation()
const URLsearch = new URLSearchParams(searchInput?.search)
const serachQuery = URLsearch.getAll("q")
const [search,setSearch] = useState(serachQuery)

  /* ----User Logout Functionality----- */
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })
    const data = await fetchData.json() //Converting data into json format
    /* -----Checking if the error occured or success---- */
    if (data.success) {
      toast.success(data.message)
      /* Clearing user state/info in system */
      dispatch(setUserDetails(null))
      /* Redirecting to home page */
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message)
    }
  }

const handleSearch =(e)=>{
const { value } = e.target
setSearch(value)
if(value){
  navigate(`/search?q=${value}`)
}else{
  navigate("/search")
}

// console.log(value)
}



  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>

        {/*   -----------------Logo----------------- */}
        <div>
          <Link to={"/"}>
            {/* <Logo w={90} h={50} /> */}
            <div className='lg:max-w-[100px] lg:max-h-[90px] overflow-hidden lg:w-full lg:h-full rounded-full max-h-[35px] max-w-[55px]'>
            <img className='w-20  scale-x-150 scale-y-150 ' src={LogoImg} alt="" />
            </div>
          </Link>
        </div>

        {/*   -----------------SearchBox----------------- */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type="text" placeholder='Search Product here...' className='w-full outline-none' value={search} onChange={handleSearch}/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer'>
            <IoMdSearch />
          </div>
        </div>

        {/*   -----------------User navigate Icons----------------- */}
        <div className='flex items-center gap-7'>

          <div className='relative  flex justify-center ' >

            {
              user?._id && (
                /* ----------------User Profile PIcture---------------- */
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} alt={user?.name} className='w-10 h-10 rounded-full' />
                    ) : (<FaUserCircle />)
                  }
                </div>
              )
              /* ----------------User Profile PIcture End---------------- */
            }

            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 rounded shadow-lg  hidden md:block'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-product"} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }
                    <Link to={'/order'} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Orders</Link>
                  </nav>
                </div>
              )
            }
          </div>

          {/* ---------Shopping Cart--------- */}
          {
            user?._id && (
              <Link to={"/user-cart"} className='text-2xl cursor-pointer relative'>
                <span><FaShoppingCart /></span>
                <div className='bg-red-600 text-white h-5 w-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 '>
                  <p className='text-sm font-bold'>{Context?.cartItemsCount}</p>
                </div>
              </Link>
            )
          }

          <div>
            {/* If User Login then show logout */}
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 font-semibold'>Logout</button>
              ) : (
                <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
              )
            }

          </div>
        </div>

      </div>
    </header>
  )
}

export default Header
