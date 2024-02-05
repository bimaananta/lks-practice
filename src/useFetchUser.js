import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFetchUser = () => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if(storedToken){
            setToken(storedToken);
        }else{
            navigate('/auth/login');
        }
    }, [navigate]);

    const [apiData, setApiData] = useState({});

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
                setApiData(data.user);
            }catch(error){
                console.log("Error fetching data: ", error);
            }
        }

        if (token) {
            fetchData();
        } else {
            console.error("Token is empty or undefined");
        }
    }, [token]);

    return {apiData, token};
}