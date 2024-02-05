import { useEffect, useState } from "react";
import "./css/overflow.css";

export default function RentCars(){
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const token = localStorage["token"];
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:8000/api/a1/rent-cars', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json"
                    }
                });

                const data = await response.json();
                setApiData(data.rent_cars);
            }catch(error){
                console.log("Error fetching data: ", error);
            }
        }

        fetchData();
    }, []);

    console.log(apiData);
    let id = 1;

    return (
        <div className="container-fluid mt-2">
            <div className="container">
                <div className="row w-100 text-start d-flex justify-content-between">
                    <div className="col-md-6">
                        <h1 className="mb-0">Rent Cars</h1>
                        <p>Pilihan mobil yang tersedia untuk rental</p>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                        <button className="btn btn-md btn-dark">Add Cars</button>
                    </div>
                </div>
                <div className="row mt-3">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>No. Car</th>
                                <th>Location</th>
                                <th>Capacity</th>
                                <th>Rental Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.map((rentCar) => (
                                <tr key={rentCar.id}>
                                    <td>{id++}</td>
                                    <td>{rentCar.name}</td>
                                    <td>{rentCar.no_car}</td>
                                    <td>{rentCar.location}</td>
                                    <td>{rentCar.capacity}</td>
                                    <td>{rentCar.rental_price + "/day"}</td>
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
    )
}