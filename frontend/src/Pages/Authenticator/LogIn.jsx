import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const LogIn = () => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [show, setshow] = useState(true);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const ShowClickHandler = () => {
        show === true ? setshow(false) : setshow(true)
    }
    const guestUserDetails = () => {
        setemail("user@example.com")
        setpassword("112233user")
    }

    const submitHandler = async () => {
        setloading(true);
        if (!email || !password) {

            toast.error('Please fill all fields!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setloading(false);
            return;
        }

        try {
            const config = { headers: { "Content-type": "application/json" } };

            const { data } = await axios.post("http://localhost:5000/api/user/login", { email, password }, config);

            toast.success('Login successfull!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));

            setloading(false);
            navigate("/Home");

        } catch (error) {

            toast.error(`${error?.response?.data?.message}`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setloading(false);
            return;
        }

    }

    return (
        <form >
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" required={true}
                    onChange={(e) => { setemail(e.target.value) }} value={email} />
            </div>


            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>

            <div className="input-group mb-3">
                <input id='exampleInputPassword1' type={show ? "password" : "text"} className="form-control" required={true}
                    onChange={(e) => { setpassword(e.target.value) }} value={password} />

                <button className="btn btn-outline-secondary" type="button"
                    onClick={ShowClickHandler}>
                    {show ? "Show" : "Hide"}
                </button>

            </div>


            {!loading ? <button type="button" className="btn btn-outline-primary" onClick={submitHandler}>
                Submit
            </button> : <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                &nbsp;
                <span role="status">Loading</span>
            </button>}
            <button type='button' className="btn btn-secondary ms-3"
                onClick={guestUserDetails}>Get guest user Crenditions </button>
        </form>
    )
}
export default LogIn;