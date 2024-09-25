import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../Components/ChangeUserRole';

const AllUsers = () => {
  /* Users info */
  const [allUsers, setAllUsers] = useState([])

  /* For Updating user */
  const [openUpdateRole, setOpenUpdateRole] = useState(false)

  const [updateUserDetail, setUpdateUserDetail] = useState({
    _id: "",
    email: "",
    name: "",
    role: ""
  })

  /* -----Fetching all users------ */
  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    // console.log()

    /* seting data in the allUser */
    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

  }


  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className='bg-white pb-4 pt-4'>
      <table className='w-full user-table '>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{user?.createdAt.substr(0, 10)}</td>
                  <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      onClick={() => {
                        setUpdateUserDetail(user)
                        setOpenUpdateRole(true)
                      }}>
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole
            userId={updateUserDetail._id}
            name={updateUserDetail.name}
            email={updateUserDetail.email}
            role={(updateUserDetail.role)}
            callFunction={fetchAllUsers}
            onClose={() => setOpenUpdateRole(false)} />
        )
      }
    </div>
  )
}

export default AllUsers
