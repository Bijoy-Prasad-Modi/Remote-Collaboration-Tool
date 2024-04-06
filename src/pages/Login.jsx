import React, { useState } from "react";
import "../assets/styles/pages/Login.css";

const Login = () => {
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

    function handleLoginFormSubmit(event) {
        event.preventDefault();
        console.log(userData);

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