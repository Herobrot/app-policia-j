"use client"

import Footer from "../components/Footer"
import "./avisos.css"
import AvisosContenido from "./components/AvisosContenido"
import Notificaciones from "./components/NotificacionesContenido"
import { Suspense } from "react"

export default function Avisos() {
    const lineSeparatorStyle = {
        borderBottom: "2px solid black",
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px"
    }

    return (
        <>
            <main>
                <div id="contenedorAvisos">
                    <h5>Avisos</h5>
                    <Suspense>
                        <AvisosContenido  />
                    </Suspense>
                </div>
                <div id="lineSeparator" style={lineSeparatorStyle}></div>
                <div id="contenedorNotificaciones">
                    <h5>Notificaciones</h5>
                    <Suspense>
                        <Notificaciones />
                    </Suspense>
                </div>
                <div id="botonesAvisos">
                    <input type="button" value="Limpiar notificaciones" />
                    <input type="button" value="Limpiar avisos" />
                </div>
            </main>
            <Footer linksStatus={{chats: false, avisos: true, perfil: false}} />
        </>
    )
}