import React from "react";

import "../../assets/styles/pages/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return <>
        <div className="main-container">
            <div className="blur-circle1"></div>
            <div className="blur-circle2"></div>
            {/* Start Landing Page */}
            <div className="landing-page">
                <header>
                    <div className="container">
                        <a href="#" className="logo">
                            Team <b>Sync</b>
                        </a>
                        <ul className="links">
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Work</li>
                            <li>Info</li>
                            <li>
                                <Link to={"/login"} >
                                    Login <b>/</b> Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className="content">
                    <div className="container">
                        <div className="info">
                            <h1>Remote Collaboration Tool</h1>
                            <p>
                                Get your team in sync, no matter your location. Streamline processes, create team rituals and watch productivity soar.
                            </p>
                            <button>
                                <Link to={"/signup"} >
                                    Get Started

                                </Link>
                            </button>
                        </div>
                        <div className="image">
                            <img
                                className="main-image"
                                src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-using-vr-tech-3840669-3202986.png?f=webp"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* End Landing Page */}
        </div>

    </>;
};

export default Home;