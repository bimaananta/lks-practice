import { useEffect, useState } from 'react';
import img from './img/car-pict.png';
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { useFetchUser } from './useFetchUser';

export default function Home(){
    const {apiData, token} = useFetchUser();
    console.log(apiData, token);

    return (
        <>
        <Navbar role={apiData.role_id || 0} active={"home"}/>
        <div className="container-fluid mt-md-5 py-5">
            <div className="container py-5 mt-2">
                <div className="row w-100 d-flex align-items-center">
                    <div className="col-md-6">
                        <h1 className='fs-1 fw-bold'>PO TRANS SEJAHTERA</h1>
                        <p className='lh-sm fs-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt quasi reprehenderit autem, enim odit illum expedita qui blanditiis magni dolorem.</p>
                        <a href="#" className='btn btn-lg btn-md-sm btn-warning text-white'>Start Rental</a>
                    </div>
                    <div className="col-md-6">
                        <img src={img} style={{width: "100%"}} />
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className='position-absolute bottom-0 left-0 w-100 z-n1' style={{left: "0"}} viewBox="0 0 1440 320"><path fill="#f3f4f5" fill-opacity="1" d="M0,32L34.3,74.7C68.6,117,137,203,206,218.7C274.3,235,343,181,411,165.3C480,149,549,171,617,160C685.7,149,754,107,823,90.7C891.4,75,960,85,1029,117.3C1097.1,149,1166,203,1234,208C1302.9,213,1371,171,1406,149.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
        </div>
        </>
    );
}