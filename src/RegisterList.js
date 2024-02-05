import Navbar from "./Navbar"
import './css/table.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export default function RegisterList(){
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken)
        }else{
            navigate('/auth/login');
        }
    }, []);

    console.log(token);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:8000/api/a1/auth/user', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json"
                    }
                });
                const data = await response.json();
                setUserData(data.user);
            }catch(error){
                console.log("Error fetching data: ", error.message);
            }
        }

        if (token) {
            fetchData();
        } else {
            console.error("Token is empty or undefined");
        }
    }, [token]);

    // validasi user
    useEffect(() => {
        // Validasi user hanya jika data user sudah ada
        if (userData) {
            if (userData.role_id !== 1) {
                navigate('/');
            }
        }
    }, [userData, navigate]);

    console.log(userData);

    const [registerData, setRegisterData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/a1/register', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        }).then((response) => {
            setRegisterData(response.data.users);
        }).catch((error) => {
            console.log("Error fetching data: ", error.message);
        });
    }, [token]);

    console.log(registerData);
    let id = 1;

    return (
        <>
            <Navbar role={1} active={"register"}/>
            <div className="container-fluid mt-5">
                <div className="container py-5">
                    <div className="row w-100">
                        <div className="col-md-12">
                            <h1 className="mb-0">Register List</h1>
                            <p>List semua pengguna yang terdaftar</p>
                        </div>
                    </div>
                    <div className="row w-100 mt-3">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>No. KTP</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registerData.map((register) => (
                                    <tr key={register.id}>
                                        <td>{id++}</td>
                                        <td>{register.username}</td>
                                        <td>{register.email}</td>
                                        <td>{register.no_ktp}</td>
                                        <td>{register.phone}</td>
                                        <td>{(register.role_id === 1) ? "Admin" : "User"}</td>
                                        <td className="d-flex flex-row gap-2">
                                            <button className="btn btn-warning btn-md text-white">Edit</button>
                                            <button className="btn btn-danger btn-md text-white">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}