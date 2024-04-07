import React from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import Loading from '../Loading'

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const { roomID, userID } = useParams();
  const navigate = useNavigate();



  return (
    <>
      <Navbar roomID={roomID} userID={userID} />
      <div className="flex">
        <Sidebar />

        <div class="w-5/6 p-12 grid grid-rows-4 grid-flow-col gap-4">
          <div className='bg-cyan-400 p-4 rounded text-2xl text-white'>Task 1</div>
          <div className='bg-cyan-400 p-4 rounded text-2xl text-white'>Task 2</div>
          <div className='bg-cyan-400 p-4 rounded text-2xl text-white'>Task 3</div>
          <div className='bg-cyan-400 p-4 rounded text-2xl text-white'>Task 4</div>
          <div className='bg-cyan-400 p-4 rounded text-2xl text-white'>Task 5</div>
          <div className='bg-cyan-400 p-4 rounded text-2xl text-white'>Task 6</div>
          <div className='bg-cyan-400 p-4 rounded text-2xl text-white'>Task 7</div>
          <div className='bg-cyan-400 p-4 rounded text-2xl text-white'>Task 8</div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
