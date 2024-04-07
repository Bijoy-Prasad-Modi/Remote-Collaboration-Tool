import React, { useEffect, useState } from 'react'
import { MdLogout } from 'react-icons/md'
import Modal from 'react-modal';

import axios from "axios";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: "2px solid #867d7d",
    },
};

function Navbar(props) {
    const [user, setUser] = useState({
        name: 'Anonymous',
        email: "abc@example.com",
        role: 1,
    });

    const [room, setRoom] = useState({
        name: "Web Developers",
        code: "3DF6A23",
    });

    async function getRoom() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/v1/rooms/get`, {
                roomId: props.roomID,
            });

            if (response.data.success === true) {
                // console.log(response.data);
                setRoom(response.data.room);
            }
        } catch (error) {
            console.log(error);
            setRoom({
                name: "Web Developers",
                code: "3DF6A23",
            });
        }
    }


    async function getUser() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/v1/users/getUserById`, {
                userId: props.userID,
            });

            if (response.data.success === true) {
                // console.log(response.data);
                setUser(response.data.user);
            }
        } catch (error) {
            console.log(error);
            setUser({
                name: 'Anonymous',
                email: "abc@example.com",
                role: 1,
            });
        }
    }


    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    useEffect(() => {
        getRoom();
        getUser();
    }, [props.userID, props.roomID]);


    return (
        <nav className='bg-gray-800 px-4 w-full flex items-center justify-between'>
            <div className='flex flex-col items-center text-xl'>
                <div className="flex items-center text-lg user-profile-button-container">
                    <button className='w-12'>
                        <img src="https://picsum.photos/600" alt="profile-image" className='rounded-full w-8 mr-2' />
                    </button>
                    <div className='text-white font-semibold'>
                        {user.name || user.email} | {user.role === parseInt(import.meta.env.VITE_ADMIN) ? "Admin" : "User"}
                    </div>
                </div>
                <div className="mt-3 text-lg text-white">

                </div>
            </div>

            {room && (
                <>
                    <div className='flex flex-col items-center text-xl text-white'>
                        <div className="text-2xl">
                            {room.name}
                        </div>
                        <div className="text-md">
                            Code: {room.code}
                        </div>
                    </div>
                </>
            )}

            <div className='flex items-center gap-x-5'>
                <button className='bg-red-300 py-1 px-4 rounded-full flex items-center' onClick={openModal}>
                    <MdLogout className='mr-1' />  Leave Room
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2>Are you sure to exit the room : </h2>
                    <form className="flex gap-x-4 justify-center">
                        <button className='bg-slate-100 border border-current py-1 px-4 rounded-full flex items-center' onClick={closeModal}>Cancel</button>
                        <button className='bg-red-500 border border-current py-1 px-4 rounded-full flex items-center'>Leave</button>
                    </form>
                </Modal>
            </div>
        </nav>
    )
}

export default Navbar
