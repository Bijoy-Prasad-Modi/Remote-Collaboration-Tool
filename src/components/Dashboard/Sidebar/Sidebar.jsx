import React from 'react'
import { BiMessageDots, BiMessageRoundedDots } from 'react-icons/bi';
import { IoMdShare } from 'react-icons/io';
import { IoVideocamOutline } from 'react-icons/io5';
import { RiHomeLine } from 'react-icons/ri';

function Sidebar() {


  return (
    <div className='bg-gray-800 h-screen px-1'>

      <div className="divide-y divide-slate-200 py-2">
        <div className='text-4xl text-white py-2 cursor-pointer'>
          <RiHomeLine />
        </div>
        <div className='text-4xl text-white py-2 cursor-pointer'>
          <IoVideocamOutline />
        </div>
        <div className='text-4xl text-white py-2 cursor-pointer'>
          <BiMessageDots />
        </div>
        <div className='text-4xl text-white py-2 cursor-pointer'>
          <IoMdShare />
        </div>
      </div>

    </div>
  );
}

export default Sidebar
