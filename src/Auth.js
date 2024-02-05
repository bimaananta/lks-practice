import { useEffect, useState } from "react";
import api from './api/api'
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";


export default function Auth(){
    const { action } = useParams();

    return (
        <>
            <Navbar role={0} />
            {(action === "register") ? (<Register/>) : (<></>)}
            {(action === "login") ? (<Login/>) : (<></>)}
            {(action === "logout") ? (<Logout/>) : (<></>)}
        </>
    );
}

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(){
        const formData = {
            username: username,
            password: password
        }
        console.log(formData);

        await api
            .post('a1/auth/login', formData)
            .then((response) => {
                console.log("token : ", response.data.token);
                localStorage["token"] = response.data.token;
                navigate('/');
            })
            .catch(() => {
                console.log("Error while login");
            });

    }
    return (
        <div className="container-fluid py-5">
            <div className="container py-5 mt-5">
                <div className="row w-100 d-flex justify-content-center">
                    <div className="col-md-8 col-sm-12 col-lg-4 d-flex flex-column align-items-center rounded px-3 py-5 shadow-sm">
                        <h1 className="mb-3">Masuk</h1>
                        <div className="mb-3 w-100">
                            <label className="form-label">Username</label>
                            <input type="text" name="username" id="username" placeholder="Enter Username" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3 w-100">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-dark btn-md text-white form-control" onClick={() => login()}>Masuk</button>
                        <p className="mt-3">Tidak punya akun ? <a href="/auth/register" className="text-decoration-none">Register</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [noKtp, setNoKtp] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    async function submitRegister(e){
        e.preventDefault();
        const formData = {
            username: username,
            email: email,
            password: password,
            no_ktp: noKtp,
            date_birth: birthDate,
            phone: phoneNumber,
            description: description,
            role_id: role
        }

        console.log(formData);

        await api
            .post('a1/register', formData)
            .then(() => {
                navigate('/auth/login');
            })
            .catch((error) => {
                console.log(`Error while register: ${error}`);
            })

    }


    return (
        <div className="container-fluid py-5">
        <div className="container pt-5">
            <div className="row w-100 d-flex flex-wrap flex-column justify-content-center align-items-center">
                <form className="w-100 d-flex flex-column align-items-start">
                    <div className="row w-100">
                        <div className="col-12">
                            <h1 className="mb-3">Register</h1>
                        </div>
                    </div>
                    <div className="row w-100">
                        <div className="col-md-6 p-2">
                            <div className="mb-2 w-100">
                                <label className="form-label fw-bold">Username</label>
                                <input type="text" name="username" id="username" placeholder="Enter Username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-2 w-100">
                                <label className="form-label fw-bold">Email</label>
                                <input type="text" name="email" id="email" placeholder="Enter email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-2 w-100">
                                <label className="form-label fw-bold">Password</label>
                                <input type="password" name="password" id="password" placeholder="Enter Password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-2 w-100">
                                <label className="form-label fw-bold">No. KTP</label>
                                <input type="text" name="no_ktp" id="no_ktp" placeholder="Enter No. KTP" className="form-control"value={noKtp} onChange={(e) => setNoKtp(e.target.value)} />
                            </div>
                            <div className="mb-2 w-100">
                                <label className="form-label fw-bold">Date Birth</label>
                                <input type="date" name="date-birth" id="date" className="form-control" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-6 p-2">
                            <div className="mb-2 w-100">
                                <label className="form-label fw-bold">Phone Number</label>
                                <input type="text" name="phone" id="phone" placeholder="Enter Phone Number" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="mb-2 w-100">
                                <label className="form-label fw-bold">Description</label>
                                <textarea  className="form-control" placeholder="Enter Description" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} style={{resize: "none"}}></textarea>
                            </div>
                            <div className="mb-2 w-100">
                                <label className="form-label fw-bold">Role</label>
                                <div className="user d-flex gap-2">
                                    <input type="radio" name="role" id="user" className="form-check-input" value={2} onChange={(e) => setRole(e.target.value)} />
                                    <label className="form-label">User</label>
                                </div>
                                <div className="admin d-flex gap-2">
                                    <input type="radio" name="role" id="admin" className="form-check-input" value={1} onChange={(e) => setRole(e.target.value)} />
                                    <label className="form-label">Admin</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="action d-flex gap-2">
                        <button className="btn btn-md btn-dark" onClick={(e) => submitRegister(e)}>Daftar</button>
                        <button className="btn btn-md btn-danger">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

function Logout(){
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage["token"];
        if(storedToken){
            setToken(storedToken)
        }else{
            navigate('/auth/login');
        }
    }, []);

    async function logoutProcess(){
        await api
        .get('a1/auth/logout', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            localStorage.removeItem("token");
            navigate('/auth/login')
        })
        .catch((error) => {
            console.log("Error cannot logout: ", error);
        });
    }

    logoutProcess();

}