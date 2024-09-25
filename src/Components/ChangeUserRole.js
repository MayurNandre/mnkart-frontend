import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from 'react-icons/io'
import SummaryApi from '../common'
import { toast } from 'react-toastify'


const ChangeUserRole = ({
    userId,
    name,
    email,
    role,
    onClose,
    callFunction
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchData = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId : userId,
                role: userRole
            })
        })

        const responseData = await fetchData.json();

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunction()
        }

        console.log("Role Updated : ",responseData)
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-60'>
            <div className='w-full mx-auto bg-white shadow-md p-4 max-w-sm'>
                {/* Close Icon */}
                <button className='block ml-auto cursor-pointer hover:text-red-600 font-bold' onClick={onClose}>
                    < IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name : {name}</p>
                <p>Email : {email}</p>
                <div className='flex items-center justify-around my-4'>
                    <p>Role :</p>
                    <select value={userRole} className='border px-4 py-1' onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map((role) => {
                                return (
                                    <option value={role} key={role}>{role}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className='w-fit block mx-auto py-1 px-3 rounded-full bg-red-600  text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    )
}

export default ChangeUserRole
