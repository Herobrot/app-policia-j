import Footer from "../components/Footer"
import "./avisos.css"
import AvisosContenido from "./components/AvisosContenido"

export default function Avisos() {
    return (
        <>
            <main>
                <div id="contenedorAvisos">
                    <AvisosContenido />
                </div>
                <div id="botonesAvisos">
                    <input type="button" value="Limpiar notificaciones" />
                    <input type="button" value="Limpiar avisos" />
                </div>
            </main>
            <Footer />
        </>
    )
}