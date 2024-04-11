"use client"

import "./perfil.css"
import { useState, useEffect } from "react"
import Footer from "../components/Footer";
import Swal from "sweetalert2";

export default function Perfil() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [badgeNumber, setBadgeNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if(localStorage.getItem("token") == null) {
            window.location.href = "/"
        }

        else{
            if(localStorage.getItem("userId") == null || localStorage.getItem("userProfile") == null) {
                window.location.href = "/"            
            }

            const profile = JSON.parse(localStorage.getItem("userProfile"));
            if(!name || !lastName || !role || !badgeNumber || !password){
                setName(profile.name);
                setLastName(profile.lastName);
                setBadgeNumber(profile.badgeNumber);
                setPassword(profile.password);
                setRole(profile.role);
                
            }
        }
    })

    const saveChanges = async() => {
        const _id = JSON.parse(localStorage.getItem("userProfile"))._id;

        await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/' + _id, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify(
                {
                    name: name,
                    lastName: lastName,
                    badgeNumber: badgeNumber,
                    password: password,
                    role: role
                }
            )
        })
        .then(async (res) => {
            if(res.ok){
                const data = await res.json();
                console.log(data);
                localStorage.setItem("userProfile", JSON.stringify(data));
                Swal.fire({
                    icon: "success",
                    title: "Datos guardados"
                })
            } else if(res.status === 429){
                Swal.fire({
                    icon: 'error',
                    title: '¡Demasiados intentos!',
                    text: 'Se ha superado el límite de intentos. Intente nuevamente en 30 segundos',
                })
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha habido un error. Intente nuevamente',
                })
            }
        })
    }

    return (
        <>
            <main>
                <div id="contenedorPerfil">
                    <ul>
                        <li>
                            <label>
                                <b>Nombre</b>
                                <input type="text" name="" value={name} onChange={(e) => setName(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                <b>Apellidos</b>
                                <input type="text" name="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                <b>Número de placa</b>
                                <input type="text" name="" value={badgeNumber} readOnly={true} />
                            </label>
                        </li>
                        <li>
                            <label>
                                <b>Contraseña</b>
                                <input type="text" name="" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </li>
                        <li>
                            <label>
                                <b>Rol</b>
                                <input type="text" name="" value={role} readOnly={true} />
                            </label>
                        </li>
                    </ul>
                </div>
                <div id="botonesPerfil">
                    <input type="button" value="Guardar cambios" onClick={() => saveChanges()} />    
                    <input type="button" value="Cancelar" />
                </div> 
                <div id="botonSalir">
                    <input type="button" value="Cerrar sesión" />
                </div>
            </main>
            <Footer linksStatus={{chats: false, avisos: false, perfil: true}} />
        </>
    )
}