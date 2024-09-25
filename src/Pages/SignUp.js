import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from "../helper/imageToBase64";
import SummaryApi from '../common';


/* ---------Icons--------- */
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

const SignUp = () => {
  // for password view hide functionality
  const [showPassword, setShowPassword] = useState(false)

  // for confirm password view hide functionality
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  //Storing form data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  })

  const navigate = useNavigate();

  /* --------Updating storing form data---------- */
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  /*  --------------Handle signup--------------  */
  const handleSubmit = async (e) => {
    e.preventDefault()

    /* Checing for password and confirm password is matching or not */
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data)
      })

      /* Converting fetched data in json format */
      const dataApi = await dataResponse.json()
      // console.log(dataApi)

      /* ---------Check if error or succes and show alert------------ */
      if(dataApi.success){
        toast.success(dataApi.message);
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message);
      }
      
    } else {
      toast.error("Password and Confirm Password Not Matched !");
    }

  }


  /* ----------Image upload Handler------------- */
  const handleUploadPic = async (e) => {
    const file = e.target.files[0]

    const image = await imageToBase64(file)

    setData((preve) => {
      return {
        ...preve,
        profilePic: image
      }
    })
  }
  // console.log("Signup Data", data)

  return (
    /* ------------Signup Box------------ */
    <section id='signup'>
      <div className='mx-auto container p-4'>

        {/* ------------Signup Icon------------ */}
        <div className='bg-white p-5 w-full max-w-sm mx-auto rounded'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcon} alt="Signup Icon" />
            </div>
            <form>
              <label>
                <div className='bg-slate-200 text-xs text-center pb-4 pt-2 absolute bottom-0 w-full bg-opacity-80 cursor-pointer'>
                  Upload Photo
                  <input type="file" className='hidden' onChange={handleUploadPic} />
                </div>
              </label>
            </form>
          </div>

          {/* ------------Signup Form start------------ */}
          <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

            {/* Name input */}
            <div>
              <label htmlFor="">Name :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type="text"
                  placeholder='Enter your name'
                  name="name"
                  onChange={handleOnChange}
                  value={data.name}
                  required
                  className='w-full h-full outline-none  bg-transparent' />
              </div>
            </div>

            {/* Email input */}
            <div>
              <label htmlFor="">Email :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type="email"
                  placeholder='Enter Email'
                  name="email" onChange={handleOnChange}
                  value={data.email}
                  required
                  className='w-full h-full outline-none  bg-transparent' />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="">Password :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter Your Password'
                  name="password"
                  onChange={handleOnChange}
                  value={data.password}
                  required
                  className='w-full h-full outline-none bg-transparent' />

                {/* hide show icon functionality for password field */}
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                  <span>
                    {
                      showPassword ? <FaEyeSlash /> : <FaEye />
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Password input */}
            <div>
              <label htmlFor="">Confirm Password :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Your  Password'
                  name="confirmPassword"
                  onChange={handleOnChange}
                  value={data.confirmPassword}
                  required
                  className='w-full h-full outline-none bg-transparent' />

                {/* hide show icon functionality for password field */}
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                  <span>
                    {
                      showConfirmPassword ? <FaEyeSlash /> : <FaEye />
                    }
                  </span>
                </div>
              </div>

            </div>


            <button className='hover:bg-red-700 bg-red-600 text-white w-full px-6 py-2 rounded-full mt-6 max-w-[150px] hover:scale-105 transition-all mx-auto block'>Signup</button>

          </form>
          {/* ------------Signup Form End------------ */}

          {/* Signup Page Link */}
          <p className='my-5'>Allready have an account ? <Link to={"/login"} className='text-red-600 hover:text-red-700  hover:underline'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
