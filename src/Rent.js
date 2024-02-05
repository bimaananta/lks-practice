import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom";
import './css/table.css';
import Api from "./api/api";
import RentCars from "./RentCars";

export default function Rent(){
    const [token, setToken] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage["token"];
        if(storedToken){
            setToken(storedToken);
        }else{
            navigate('/auth/login');
        }
    }, []);

    // console.log(token);

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/a1/auth/user', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json"
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setUserData(data.user);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };
    
        if (token) {
            fetchData();
        } else {
            console.error("Token is empty or undefined");
        }
    }, [token]);

    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:8000/api/a1/rent', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json"
                    }
                });

                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setApiData(data.rents);

            }catch(error){
                console.log("Error fetching data: ", error);
            }
        }

        if (token) {
            fetchData();
        } else {
            console.error("Token is empty or undefined");
        }
    }, [token])

    // console.log(apiData);

    let id = 1;

    // 6|hvmANpMISlI2Ocsjbt4WaUfBneZ0tROYcfXJI4xYcd261931
    return (
        <>
            <Navbar role={userData.role_id} active={"rent"}/>
            <div className="container-fluid mt-5 py-5">
                <div className="container py-2">
                    <div className="row w-100 d-flex justify-content-between align-items-center">
                        <div className="col-md-4">
                            <h1 className="mb-0">Rent List</h1>
                            <p>Semua proses rental yang sedang berjalan</p>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                            <button className="btn btn-md btn-dark" onClick={() => navigate("/create-rent")}>Add Rent</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tenant</th>
                                <th>No. Car</th>
                                <th>Date Borrow</th>
                                <th>Date Return</th>
                                <th>Down Payment</th>
                                <th>Discount</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor: "white"}}>
                            {apiData.map((rent) => (
                                <tr>
                                    <td>{id++}</td>
                                    <td>{rent.tenant}</td>
                                    <td>{rent.no_car}</td>
                                    <td>{rent.date_borrow}</td>
                                    <td>{rent.date_return}</td>
                                    <td>{rent.down_payment}</td>
                                    <td>{rent.discount}</td>
                                    <td>{rent.total}</td>
                                    <td className="d-flex flex-row gap-2">
                                        <a href="#" className="btn btn-warning text-white btn-md">Edit</a>
                                        <a href="#" className="btn btn-danger btn-md">Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <RentCars />
        </>
    )
}