import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import { useEffect, useState } from "react";

export default function CreateRent(){
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if(storedToken){
            setToken(storedToken);
        }else{
            navigate('/auth/login');
        }
    }, []);

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

    return (
        <>
            <Navbar role={1}  active={"rent"}/>
            <div className="container-fluid py-5">
                <div className="container mt-5">
                    <div className="row w-100">
                        <div className="col-md-12">
                            <h1 className="mb-0">Create Rent</h1>
                            <p>Tambahkan aktivitas rental terbaru</p>
                        </div>
                    </div>
                    <form className="row w-100 mt-2">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="tenant" className="form-label">Tenant</label>
                                <input type="text" name="tenant" id="tenant" className="form-control" placeholder="Enter Tenant" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="no_car" className="form-label">No. Car</label>
                                <input type="text" name="no_car" id="no_car" className="form-control" placeholder="Enter No. Car" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date_borrow" className="form-label">Date Borrow</label>
                                <input type="date" name="date_borrow" id="date_borrow" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="no_car" className="form-label">Date Return</label>
                                <input type="date" name="date_return" id="tenant" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="down_payment" className="form-label">Down Payment</label>
                                <input type="text" name="down_payment" id="down_payment" className="form-control" placeholder="Enter Down Payment" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="discount" className="form-label">Discount</label>
                                <input type="text" name="discount" id="discount" className="form-control" placeholder="Enter Discount" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="total" className="form-label">Total</label>
                                <input type="text" name="total" id="total" className="form-control" placeholder="Enter Total" />
                            </div>
                            <div className="d-flex flex-row gap-2" style={{marginTop: "5px"}}>
                                <button type="submit" className="btn btn-md text-white btn-success">Submit</button>
                                <button type="Reset" className="btn btn-md text-white btn-danger">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}