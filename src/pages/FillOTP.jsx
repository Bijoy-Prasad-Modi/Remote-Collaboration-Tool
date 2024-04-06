import React, { useState } from "react";

import "../assets/styles/pages/FillOTP.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const FillOTP = () => {
    const navigate = useNavigate();
    
    const { name, email, password } = useParams();

    const [otp, setOtp] = useState("");

    function handleChange(event) {
        setOtp(
            (prevOtp) => {
                return event.target.value;
            }
        );
    }

    async function handleOTPFormSubmit(event) {
        event.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(otp);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/v1/users/signup`, {
                username: name,
                email: email,
                password: password,
                otp: otp,
            });

            if (response.data.success === true) {
                navigate(`/login`);
            }
        } catch (error) {
            console.log(error);
            navigate(`/sign-up`);
        }
    }



    return <>
        <div className="background">
            <div className="shape" />
            <div className="shape" />
        </div>
        <form onSubmit={handleOTPFormSubmit} className="text-white">


            <label htmlFor="otp">Enter OTP here : </label>
            <input type="text" placeholder="Enter OTP" name="otp" id="otp" value={otp} onChange={handleChange} />


            <button className="my-8 p-2 bg-lime-400">Submit OTP</button>


        </form>
    </>;
};

export default FillOTP;