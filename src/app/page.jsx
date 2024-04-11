"use client"
import "./inicio.css"
import { useState } from "react";
import { saveAuthData } from "../../Token";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Inicio() {
    const [badgeNumber, setBadgeNumber] = useState('');
    const [password, setPassword] = useState('');
    const handleInputChangeBadge = (e) => {
        setBadgeNumber(e.target.value)
    }
    const handleInputChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const login = async () =>{
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            showConfirmButton: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        
        try{
            await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/user', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    badgeNumber: badgeNumber,
                    password: password
                }
            )
        })
        .then(async (response) => {
            if(response.ok){
                Swal.close();
                const data = await response.json();
                if(data){
                    console.log(data);                    
                    localStorage.setItem('userProfile', JSON.stringify(data));
                    window.location = '/chats';
                }
                else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'El usuario no fue encontrado',
                        text: 'Intente nuevamente',
                    })
                }
            } else if(response.status === 429){
                Swal.fire({
                    icon: 'error',
                    title: '¡Demasiados intentos!',
                    text: 'Se ha superado el límite de intentos. Intente nuevamente en 30 segundos',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El usuario no existe o la contraseña es incorrecta.',                
                })
            }
        })
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <main>
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