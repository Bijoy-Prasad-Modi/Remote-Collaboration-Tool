import React, { useState } from "react";

import "../assets/styles/pages/FillOTP.css";

const FillOTP = () => {
    const [otp, setOtp] = useState("");

    function handleChange(event) {
        setOtp(
            (prevOtp) => {
                return event.target.value;
            }
        );
    }

    function handleOTPFormSubmit() {
        event.preventDefault();
        console.log(userData);

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