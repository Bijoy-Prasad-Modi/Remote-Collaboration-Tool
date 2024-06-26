import React, { useState } from "react";
import "../assets/styles/pages/Login.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
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

    async function handleLoginFormSubmit(event) {
        event.preventDefault();
        console.log(userData);


        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/v1/users/login`, {
                email: userData.email.toString(),
                password: userData.password.toString(),
            });

            if (response.data.success === true) {
                // console.log(response.data);
                navigate(`/create-room/${response.data.user._id}`);
            }
        } catch (error) {
            console.log(error);
            navigate(`/login`);
        }
    }

    return <>
        <>
            <div className="background">
                <div className="shape" />
                <div className="shape" />
            </div>
            <form onSubmit={handleLoginFormSubmit} className="text-white">
                <h3>Login Here</h3>


                <label htmlFor="email">Email</label>
                <input type="email" placeholder="ramesh@gmail.com" name="email" id="email" value={userData.email} onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" name="password" id="password" value={userData.password} onChange={handleChange} />


                <button className="my-8 p-2 bg-cyan-400">Log In</button>

                <p className="text-blue">
                    <Link to={"/signup"} className="text-xl">Not Registered ? Sign Up Here</Link>
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

export default Login;