import React, { useEffect, useState } from "react";
import Notificacion from "./Notificacion.jsx";

export default function Notificaciones() {
    const [notificacionesArreglo, setNotificacionesArreglo] = useState([{}]);

    const fetchData = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'warnings/Policía Tercero', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setNotificacionesArreglo(data.Avisos);
            }                
        } catch (error) {
            console.error("Error al cargar las notificaciones:", error);
        }
    };

    const awaitData = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'warnings/await/Policía Tercero');
            if (response.ok) {
                const data = response.json();
                console.log(data);
                
            }
        } catch (error) {
            console.error("Error al cargar las notificaciones:", error);
        } finally{
            awaitData();
        }
    };

    useEffect(() => {
        fetchData();
        awaitData();
    }, []);
    
    return (
        <div id="contenidoNotificaciones">
            {notificacionesArreglo ? notificacionesArreglo.map((notificacion) => <Notificacion notification={notificacion} />) 
            : <p>No hay notificaciones nuevas</p>}
        </div>
    );
}