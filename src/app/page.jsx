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
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            showConfirmButton: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        
        fetch('https://api-police-j.onrender.com/users/user', {
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
        .then(async (response) => {
            if(response.ok){
                Swal.close();
                const data = await response.json();
                saveAuthData(data.token, data.userFound._id);
                window.location = '/chats';
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El usuario no existe o la contraseña es incorrecta.',                
                })
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