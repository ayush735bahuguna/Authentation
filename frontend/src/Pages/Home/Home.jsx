import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGlobalContext } from "../../Context/Authentation";

export default function Home() {
    const navigate = useNavigate();
    const { user } = useGlobalContext();

    const LogOutHandler = () => {
        localStorage.removeItem("userInfo");
        toast.success('Log out Sucessfull!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigate("/");
    }
    return (

        <div style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            flexDirection: "column",
            padding: "50px",
            textAlign: "center"
        }}>
            <img src={user?.pic} style={{ width: "200px", height: "200px", borderRadius: "50%", margin: 'auto' }} />
            <h4> {user?.name}</h4>
            <h5>{user?.email}</h5>
            <div className="btn btn-primary" style={{ width: "200px", margin: 'auto' }} onClick={LogOutHandler}>Log out</div>
            <span>Login into these website before start- </span>
            <span>
                <span>https://mongodb.com</span> &nbsp; &nbsp;
                <span>https://cloudinary.com</span>
            </span>
        </div>
    )
}
