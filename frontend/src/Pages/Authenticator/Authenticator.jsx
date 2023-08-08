import { useEffect } from 'react';
import LogIn from './LogIn';
import Signup from "./SignUp";
import { useNavigate } from 'react-router-dom';
import "./Authenticator.css"
import Lottie from 'react-lottie';
import HomeAnimation from "../../Animations/Login.json";

export default function Home() {

    const navigate = useNavigate()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) { navigate("/Home") }
    }, [navigate])


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: HomeAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <div id='Homecontainer'>
                <div>
                    <h3 style={{ position: "absolute", top: "20px", left: "25px" }}>
                        Authenticator
                    </h3>
                </div>

                <div style={{ marginTop: "50px" }}>

                    <ul className="nav nav-pills " id="pills-tab" role="tablist">
                        <li className="nav-item " role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Log in</button>
                        </li>

                        <li className="nav-item " role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Sign up</button>
                        </li>
                    </ul>
                    <p></p>
                    <div className="tab-content" id="pills-tabContent">

                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0"><LogIn /></div>

                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0"><Signup /></div>

                    </div>
                </div>

            </div>

            <div id='Homeimage'>
                <div style={{ position: "absolute", top: "5%", padding: "20px", zIndex: "10" }}>
                    <h1 style={{ marginBottom: "10px", color: "gray" }}>Welcome to Authenticator!</h1>
                    <h3>
                        Join our vibrant community! <br />
                        Create a new account with just a few steps and start chatting with friends.
                    </h3>

                </div>

                <div style={{ display: "flex", height: "100vh" }}>
                    <Lottie options={defaultOptions}
                        width={"900%"}
                        height={"fit - content"}
                        style={{ marginTop: "auto", maxWidth: "550px", marginRight: "inherit" }}
                    />
                </div>

            </div>
        </div>

    )
}
