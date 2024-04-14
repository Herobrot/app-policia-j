import React, { useEffect, useState } from "react";
import Aviso from "./Aviso.jsx";
import { getAuthData } from "../../../../Token";

export default function Avisos() {
    const authData = getAuthData();
    const [avisosArreglo, setAvisosArreglo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            fetch(process.env.NEXT_PUBLIC_API_URL + 'users/' + authData._idUser, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }            
            }).then(async (res) => {
                const user = await res.json();
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'warnings/users/' + user._id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    console.log(data)
                    setAvisosArreglo(data);
                } catch (error) {
                    console.error("Error al tratar de conseguir las advertencias:", error);
                } finally{
                    fetchData();
                }
            }).catch((error) => {
                console.error("Error al obtener el usuario:", error);
            }).finally(() => {
                fetchData();
            })
            
        };

        fetchData();
    }, []);
    
    return (
        <div id="contenidoAvisos">
            {avisosArreglo ? avisosArreglo.map((aviso) => <Aviso key={aviso._id} aviso={aviso} />) : "Cargando..."}
        </div>
    );
}