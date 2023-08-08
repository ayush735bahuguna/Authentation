import { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const SignUp = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [pic, setpic] = useState();
    const [loading, setloading] = useState(false);
    const [show, setshow] = useState(true);
    const navigate = useNavigate();


    const ShowClickHandler = () => {
        show === true ? setshow(false) : setshow(true)
    }

    const submitHandler = async () => {
        setloading(true);
        if (!name || !email || !password || !confirmPassword) {
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

        if (password !== confirmPassword) {
            toast.error('Password not matched', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setloading(false)
            return;
        }

        try {
            const config = { headers: { "Content-type": "application/json" } };

            const { data } = await axios.post("http://localhost:5000/api/user", { name, email, password, pic }, config);

            toast.success('Regestration successfull', {
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
            setloading(false)
            return;
        }

    }

    const postDetails = (pic) => {
        setloading(true)

        if (pic === undefined) {

            toast.warn(' Please select a image !', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            return;
        }

        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dlhnyqtec");
            fetch("https://api.cloudinary.com/v1_1/dlhnyqtec/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setpic(data.url.toString());
                    console.log(data.url.toString());
                    setloading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setloading(false);
                });
        } else {

            toast.error(`Please Select an Image!`, {
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
        <form>
            <input type="text" className="form-control" placeholder="Full Name" required={true}
                onChange={(e) => { setname(e.target.value) }} />

            <div className="mb-3 mt-3">
                <label htmlFor="exampleInputEmail2" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail2" required={true}
                    onChange={(e) => { setemail(e.target.value) }} />
            </div>

            <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
            <div className="input-group mb-3">
                <input type={show ? "password" : "text"} id='exampleInputPassword2' className="form-control" required={true}
                    onChange={(e) => { setpassword(e.target.value) }} />

                <button className="btn btn-outline-secondary" type="button"
                    onClick={ShowClickHandler}>
                    {show ? "Show" : "Hide"}
                </button>
            </div>

            <label htmlFor="exampleInputPassword3" className="form-label">Confirm Password</label>
            <div className="input-group mb-3">
                <input type={show ? "password" : "text"} id='exampleInputPassword3' className="form-control" required={true}
                    onChange={(e) => { setconfirmPassword(e.target.value) }} />

                <button className="btn btn-outline-secondary" type="button"
                    onClick={ShowClickHandler}>
                    {show ? "Show" : "Hide"}
                </button>
            </div>

            <input type="file" className="form-control mb-3" aria-describedby="inputGroupFileAddon04" onChange={(e) => { postDetails(e.target.files[0]) }} />

            {!loading ? <button type="button" className="btn btn-primary" onClick={submitHandler}>
                Submit
            </button> : <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
            </button>}
        </form>
    )
}

export default SignUp;