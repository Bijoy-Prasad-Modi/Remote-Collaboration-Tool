import React from 'react'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import Loading from '../Loading'

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex">
          <Sidebar />
      </div>
    </>
  )
}

export default Dashboard
