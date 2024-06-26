import React, { useState } from "react";
import "../assets/styles/pages/SignUp.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    function handleChange(event) {
        setUserData(
            (prevUserData) => {
                return { ...prevUserData, [event.target.name]: event.target.value };
            }
        );
    }
    console.log(import.meta.env.VITE_SERVER_URI);

    async function handleSignUpFormSubmit(event) {
        event.preventDefault();
        console.log(userData);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/v1/users/sendotp`, {
                email: userData.email.toString()
            });

            if (response.data.success === true) {
                // console.log(response.data);
                navigate(`/fill-otp/${userData.name}/${userData.email}/${userData.password}`);
            }
        } catch (error) {
            console.log(error);
            navigate(`/signup`);
        }

    }

    return <>
        <>
            <div className="background">
                <div className="shape" />
                <div className="shape" />
            </div>
            <form onSubmit={handleSignUpFormSubmit} className="text-white">
                <h3>Sign Up Here</h3>

                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Ramesh" name="name" id="name" value={userData.name} onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input type="email" placeholder="ramesh@gmail.com" name="email" id="email" value={userData.email} onChange={handleChange} />


                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" name="password" id="password" value={userData.password} onChange={handleChange} />


                <button className="my-8 p-2 bg-yellow-400">Sign Up</button>

                <p className="text-blue">
                    <Link to={"/login"} className="text-xl">Already Registered ? Login Here</Link>
                </p>

                {/* <div className="social">
                    <div className="go">
                        <i className="fab fa-google" /> Google
                    </div>
                    <div className="fb">
                        <i className="fab fa-facebook" /> Facebook
                    </div>
                </div> */}
            </form>
        </>

    </>;
};

export default SignUp;