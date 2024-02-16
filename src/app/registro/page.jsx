"use client"

import "./registro.css"
import Swal from "sweetalert2";
import { useState } from "react";
import { saveAuthData } from "../../../Token";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";

export default function Registro() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [badgeNumber, setBadgeNumber] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const Alerta = (titulo, texto) => {
        Swal.fire({
            icon: "error",
            title: String(titulo),
            text: String(texto),
            showFonfirmButton: true,
            confirmButtonColor: "blue",
            confirmButtonText:'<i class="fa-solid fa-check"></i>',
            buttonsStyling: false,
            showConfirmButton: false,
            customClass: {
                title: "swal-title",
                popup: "swal-popup",
                confirmButton: "swal-Check"
            }
        });
    }

    const Salir = () => {
        if(!name || !lastName || !role || !badgeNumber || !password){
            window.location="/"
        }

        else if(name || lastName || role || badgeNumber || password){
            Swal.fire({
                title: "¡Hay datos guardados!",
                text: "Esta apunto de salir. ¿Quiere terminar en llenar el formulario?",
                showDenyButton: true,
                showConfirmButton: true,
                denyButtonText: "No",
                confirmButtonText: "Sí",
                denyButtonColor: "red",
                confirmButtonColor: "blue",
                focusDeny: false,
                focusConfirm: true,
                buttonsStyling: false,
                customClass: {
                    title: "swal-title",
                    popup: "swal-popup",
                    actions: "swal-actions",
                    denyButton: "swal-No",
                    confirmButton: "swal-Si"
                }
            }).then((result) => {
                if(result.isDenied){
                    window.location="/"
                }
            })
        }
    }

    const Continuar = async () => {
        if(!name || !lastName || !role || !badgeNumber || !password){
            Swal.fire({
                title: "¡Faltan datos!",
                text: "Revise que haya ingresado todos los datos",
                showFonfirmButton: true,
                confirmButtonColor: "blue",
                confirmButtonText:'<i class="fa-solid fa-check"></i>',
                buttonsStyling: false,
                showConfirmButton: false,
                customClass: {
                    popup: "swal-popup",
                    confirmButton: "swal-Check"
                }
            })
        }

        else if(/\d/.test(name) || /[^A-Za-z_\sÁÉÍÓÚáéíóúÑñ]/.test(name)){
            Alerta("¡Nombre imposible!", 
            "El nombre tiene carácteres imposibles, asegúrese de escribir un nombre correcto.");
        }

        else if(/\d/.test(lastName) || /[^A-Za-z_\sÁÉÍÓÚáéíóúÑñ]/.test(lastName)){
            Alerta("¡Apellido imposible!",
            "Los apellidos tienen carácteres imposibles, asegúrese de escribir solo letras.")
        }

        else if(!/^\d*$/.test(badgeNumber) && !/\s/.test(badgeNumber)){
            Alerta("¡Número de placa imposible!",
            "El número ingresado tiene letras o carácteres no numericos, escriba un número sin espacios/separadores")
        }

        else if(!/^\d{4}\s+\d{4}$/.test(badgeNumber)){
            Alerta("¡Faltan/Sobran dígitos!", 
            "Asegúrese de haber escrito 8 dígitos en total");
        }
        
        else if(!/\w{8,}/.test(password)){
            Alerta("¡La contraseña es muy débil!", 
            "Es recomendable que la contraseña tenga un mínimo de 8 carácteres");
        }

        else{
            Swal.fire({
                title: "¿Confirmar datos?",
                text: "Si aun no esta seguro, puede modificarlos.",
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonColor: "red",
                denyButtonColor: "blue",
                confirmButtonText: '<i class="fa-solid fa-xmark"></i>',
                denyButtonText:'<i class="fa-solid fa-check"></i>',
                buttonsStyling: false,
                customClass: {
                    htmlContainer: "swal-html",
                    title: "swal-title",
                    popup: "swal-popup",
                    actions: "swal-actions",
                    confirmButton: "swal-X",
                    denyButton: "swal-Check"
                }
            }).then(async (result) => {
                if(result.isDenied){
                    try{                
                        Swal.fire({
                            title: "Cargando...",
                            allowOutsideClick: false,
                            showConfirmButton: false,
                            allowEscapeKey: false,
                            didOpen: async () => {
                                Swal.showLoading()
                                const item = { 
                                    name: name,
                                    lastName: lastName,
                                    badgeNumber: badgeNumber,
                                    password: badgeNumber, 
                                    role: role
                                }
                                try {
                                    const response = await fetch(process.env.NEXT_PUBLIC_API_URL_USERS, {
                                        method: "POST",
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(item)})
                                        .then(async (res) => {                                            
                                            if (res.ok) {
                                                Swal.close();
                                                //EL ERROR ESTA EN EL ENV 
                                                //https://stackoverflow.com/questions/73359274/syntaxerror-unexpected-token-doctype-is-not-valid-json
                                                const result = await res.json();
                                                console.log(result);
                                                console.log(result.result._id);
                                                saveAuthData(result.token,result.result._id)
                                                Swal.fire({
                                                    title: "¡Datos confirmados!",
                                                    text: "¡Listo!, ya tiene una cuenta como " + role,
                                                    showConfirmButton: true,
                                                    confirmButtonColor: "blue",
                                                    confirmButtonText:'<i class="fa-solid fa-check"></i>',
                                                    buttonsStyling: false,                        
                                                    customClass: {
                                                        title: "swal-title",
                                                        popup: "swal-popup",
                                                        confirmButton: "swal-Check"
                                                    } 
                                                }).then((result) => {
                                                    if(result.isConfirmed || result.isDismissed){
                                                        window.location = "/perfil"
                                                    }
                                                })
                                            }
                                            else{
                                                Swal.fire({
                                                    icon: "error",
                                                    title: "Ha sucedido un error al subir los datos",
                                                    showConfirmButton: false
                                                });
                                            }
                                        })
                                } catch (error) {
                                    
                                }
                            
                            }
                        })
                                  

                        } catch(err){
                            Swal.fire({
                                title: "Ha sucedido un error al subir los datos"
                            });
                        }         
                }
            })
        }
    }

    return(
        <main>
            <button onClick={() => Salir()}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div id="contenedorRegistro">
                <div id="registro">
                    <h1>Registrar usuario</h1>
                    <div id="contenedorInputs">
                        <input type="text" 
                               placeholder="Nombre"
                               value={name}
                               autoComplete="no"
                               onChange={(ev) => setName(ev.target.value)}
                               />
                        <input type="text" 
                               placeholder="Apellidos"
                               value={lastName}
                               autoComplete="no"
                               onChange={(ev) => setLastName(ev.target.value)}
                               />
                        <input type="text" 
                               placeholder="Rol"
                               value={role}
                               autoComplete="no"
                               onChange={(ev) => setRole(ev.target.value)}
                               />
                        <input type="text" 
                               placeholder="Número de placa"
                               value={badgeNumber}
                               autoComplete="no"
                               onChange={(ev) => setBadgeNumber(ev.target.value)}
                               />
                        <input type="password" 
                               placeholder="Contraseña"
                               value={password}
                               autoComplete="no"
                               onChange={(ev) => setPassword(ev.target.value)}
                               />
                    </div>
                    <button id="btnRegistrarse" onClick={() => Continuar()}>Registrarse</button>
                </div>
            </div>
        </main>
    )
}