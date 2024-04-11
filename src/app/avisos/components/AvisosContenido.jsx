import React, { useEffect, useState } from "react";
import Aviso from "./Aviso.jsx";

export default function Avisos() {
    const [avisosArreglo, setAvisosArreglo] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'warnings/Policía', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setAvisosArreglo(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const interval = setInterval(fetchData, 15000);

        return () => clearInterval(interval);
    }, []);
    
    return (
        <div id="contenidoAvisos">
            {avisosArreglo ? avisosArreglo.map((aviso) => <Aviso key={aviso._id} aviso={aviso} />) : "Cargando..."}
        </div>
    );
}