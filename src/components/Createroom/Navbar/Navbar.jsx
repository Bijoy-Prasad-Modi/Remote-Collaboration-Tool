import React from 'react'
import { MdLogout } from 'react-icons/md'

function Navbar() {
  return (
    <nav className='bg-gray-800 px-4 w-full py-5 flex justify-between'>
      <div className='flex items-center text-xl'>
        <button className='w-12'>
          <img src="https://picsum.photos/600" alt="profile-image" className='rounded-full w-8 mr-2' />
        </button>
        <span className='text-white font-semibold'>User Name</span>
      </div>
      <div className='flex items-center gap-x-5'>

        <button className='btn bg-red-300 py-1 px-4 rounded-full flex items-center'>
          <MdLogout className='mr-1' />  Log Out
        </button>

      </div>
    </nav>
  )
}

export default Navbar
