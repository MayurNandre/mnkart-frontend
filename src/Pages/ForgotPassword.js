import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className='flex items-center justify-center py-10 bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center'>
        <h2 className='text-3xl font-semibold text-red-600 mb-4'>Service Unavailable</h2>
        <p className='text-gray-700 mb-6'>
          We regret to inform you that the "Forgot Password" feature is currently not available.
        </p>
        <p className='text-gray-600 mb-6'>
          For a better experience, please create a new account to continue shopping with us.
        </p>
        <Link
          to="/sign-up"
          className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200'
        >
          Create New Account
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
