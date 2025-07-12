import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className='flex items-end justify-between'>
      <h1 className='text-2xl font-medium text-white'>
        Hello <br /> 
        <span className='text-3xl font-semibold text-white'>
          {user?.name}👋
        </span>
      </h1>
      <button 
        onClick={logout} 
        className='bg-red-600 text-lg font-medium text-white px-5 py-2 rounded-sm hover:cursor-pointer hover:bg-red-500'
      >
        Log out
      </button>
    </div>
  );
};

export default Header;

