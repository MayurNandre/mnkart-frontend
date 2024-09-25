import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
/* ----------Icons---------- */
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import context from '../context';


const Login = () => {
    // for password view hide functionality
    const [showPassword, setShowPassword] = useState(false)

    //Storing form data
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    /* Getting function from context */
    const  {fetchUserDetails,fetchCountCartItems} = useContext(context)

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

/* -------------Login Handle------------- */
    const handleSubmit = async (e) => {
        e.preventDefault()
        /* ----Fetch---- */
        const dataResponse = await fetch(SummaryApi.signin.url, {
            method: SummaryApi.signin.method,
            credentials : 'include',
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data)
          })
          const dataApi = await dataResponse.json();

          /* ----------check if everything is ok or not---------- */
          if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails()
            fetchCountCartItems()
          }
          if(dataApi.error){
            toast.error(dataApi.message);
          }
    }

    return (
        /* ------------Login Box------------ */
        <section id='login'>
            <div className='mx-auto container p-4'>

                {/* ------------Login Icon------------ */}
                <div className='bg-white p-5 w-full max-w-sm mx-auto rounded'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcon} alt="Login Icon" />
                    </div>

                    {/* ------------Login Form start------------ */}
                    <form action="" className='pt-6  flex flex-col gap-2' onSubmit={handleSubmit}>

                        {/* Email input */}
                        <div>
                            <label htmlFor="">Email :</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email" placeholder='Enter Email' name="email" onChange={handleOnChange} value={data.email} className='w-full h-full outline-none  bg-transparent' />
                            </div>
                        </div>

                        {/* Password input */}
                        <div>
                            <label htmlFor="">Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "text" : "password"} placeholder='Enter Your Password' name="password" onChange={handleOnChange} value={data.password} className='w-full h-full outline-none bg-transparent' />

                                {/* hide show icon functionality for password field */}
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                            </div>

                            {/* Forgot password link */}
                            <Link to={"/forgot-password"} className="block w-fit ml-auto hover:underline hover:text-red-600">
                                Forgot Password ?
                            </Link>

                        </div>


                        <button className='hover:bg-red-700 bg-red-600 text-white w-full px-6 py-2 rounded-full mt-6 max-w-[150px] hover:scale-105 transition-all mx-auto block'>Login</button>

                    </form>
                    {/* ------------Login Form End------------ */}

                    {/* Signup Psge Link */}
                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700  hover:underline'>Sign-up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login
