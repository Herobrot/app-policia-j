"use client"
import "./inicio.css"
import { useState } from "react";
import { saveAuthData } from "../../Token";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Inicio() {
    const [credentials, setCredentials] = useState({ badgeNumber: '', password: '' });
    const handleInputChangeBadge = (e) => {
        setCredentials({badgeNumber: e.target.value})
    }
    const handleInputChangePassword = (e) => {
        setCredentials({password: e.target.value})
    }

    const login = () =>{
        fetch(process.env.NEXT_PUBLIC_API_URL_USERS+'/user', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: '',
                    lastName: '',
                    role: '',
                    badgeNumber: credentials.badgeNumber,
                    password: credentials.password
                }
            )
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                clearAuthData();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Inicio de sesión fallido.',
                });
            } else {
                console.log(data);
                saveAuthData(data.token, data.user._id);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Inicio de sesión exitoso.',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "/chats";
                    }

                    if(result.isDismissed){
                        window.location = "/chats";
                    }
                });                
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema con la petición.',
            });
        });
    }
    return(
        <main>
            <Link href="/">
                
            </Link>
            <div id="contenedorLogin">
                <div id="login">
                    <h1>COM-POL</h1>
                    <h2>Iniciar Sesión</h2>
                    <div id="contenidoInputs">
                        <input type="text" placeholder="Número de placa" onChange={handleInputChangeBadge} /><br />
                        <input type="password" placeholder="Contraseña" onChange={handleInputChangePassword} /><br />
                        <button onClick={login}>Ingresar</button>
                    </div>
                    <h3>¿No eres usuario?</h3>
                    <Link href="/registro">Registrarse</Link>
                </div>
            </div>
        </main>
    );
}