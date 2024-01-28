import "./inicio.css"

export default function Inicio() {
    return(
        <main>
            <div id="contenedorLogin">
                <form action="">
                    <h1>COM-POL</h1>
                    <h2>Iniciar Sesión</h2>
                    <input type="text" placeholder="Número de placa" />
                    <input type="password" placeholder="Contraseña" />
                    <button>Ingresar</button>
                    <h2>¿No tiene cuenta registrada?</h2>
                    <button>Registrarse</button>
                </form>
            </div>
        </main>
        
    );
}