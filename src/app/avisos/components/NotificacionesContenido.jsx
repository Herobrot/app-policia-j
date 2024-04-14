import React, { useEffect, useState } from "react";
import Notificacion from "./Notificacion.jsx";
import { getAuthData } from "../../../../Token.js";

export default function Notificaciones() {
    const [notificacionesArreglo, setNotificacionesArreglo] = useState([]);
    const authData = getAuthData();
    const fetchData = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/notifications/user/' + authData._idUser, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setNotificacionesArreglo(data);             
        } catch (error) {
            console.error("Error al cargar las notificaciones:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval)
    }, []);
    
    return (
        <div id="contenidoNotificaciones">
            {notificacionesArreglo ? notificacionesArreglo.map((notificacion) => <Notificacion notification={notificacion} />) 
            : <p>No hay notificaciones nuevas</p>}
        </div>
    );
}