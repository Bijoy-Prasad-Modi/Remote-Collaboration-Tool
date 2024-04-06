import React from 'react'
import { useState } from 'react';
import { MdOutlineWorkspaces } from "react-icons/md";
import Navbar from './Navbar/Navbar';

function Createroom() {

  const [showForm, setShowForm] = useState(false);
  const roomNames = ['Room 1', "Room 2"];

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {/* SideBar */}
      <Navbar />
      <div className='flex'>

        <div className='w-64 bg-gray-800 h-screen overflow-y-auto px-4 py-2'>
          <div className='your-rooms'>
            <h2 className='text-sm text-white font-bold p-2.5 border-2 border-white rounded-md'>Your Rooms</h2>
          </div>
          {roomNames.length > 0 ? (
            <ul className='mt-3 text-white font-bold grid'>
              {roomNames.map((roomName, index) => (
                <li key={index} className='mt-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                  <a href="#" className='px-3'>
                    <MdOutlineWorkspaces className='inline-block w-6 h-6 mr-2 -mt-2' />
                    {roomName}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-center mt-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <a href="#" className="px-3 text-lg">
                No Rooms Found
              </a>
            </p>
          )}


          <div className='joined-rooms mt-12'>
            <h2 className='text-sm text-white font-bold p-2.5 border-2 border-white rounded-md'>Joined Rooms</h2>
          </div>
          {roomNames.length > 0 ? (
            <ul className='mt-3 text-white font-bold grid'>
              {roomNames.map((roomName, index) => (
                <li key={index} className='mt-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                  <a href="#" className='px-3'>
                    <MdOutlineWorkspaces className='inline-block w-6 h-6 mr-2 -mt-2' />
                    {roomName}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-center mt-2 rounded hover:shadow hover:bg-blue-500 py-2">
              <a href="#" className="px-3 text-lg">
                No Rooms Found
              </a>
            </p>
          )}
        </div>




        {/* Create Room */}
        <div className='flex flex-col h-screen justify-center w-full items-center'>

          <div>

            <div className="flex flex-col">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 w-[21rem] text-white font-bold py-2 px-4 rounded"
                onClick={toggleForm}
              >
                {showForm === true ? (
                  <>
                    Join Room
                  </>
                ) : (
                  <>
                    Create Room
                  </>
                )}
              </button>

              {showForm && (
                <div className="mt-4 flex">
                  <input type="text" className="border-2 border-gray-300 p-2 rounded-lg" placeholder="Enter Room Name.." />
                  {/* Add other form fields for room details here */}
                  <button type="button" className="bg-orange-500 ml-[1rem] w-[7rem] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Submit</button>
                </div>
              )}

              {!showForm && (
                <div className="mt-4 flex">
                  <input type="text" className="border-2 border-gray-300 p-2 rounded-lg" placeholder="Enter Room ID to join" />
                  <button type="button" className="bg-green-500 ml-[1rem] hover:bg-green-700 text-white font-bold py-2 rounded mt-2">
                    Join Room
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Createroom
