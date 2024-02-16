import "./perfil.css"
import Contenido from "./components/Contenido"

export default function Perfil() {
    return (
        <main>
            <div id="contenedorPerfil">
                <Contenido />
            </div>
            <div id="botonesPerfil">
                <input type="button" value="Guardar cambios" />    
                <input type="button" value="Cancelar" />
            </div> 
            <div id="botonSalir">
                <input type="button" value="Cerrar sesión" />
            </div>
        </main>
    )
}