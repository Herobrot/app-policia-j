import "./Notificacion.css"

export default function Notificacion({notification}) {


    return(
        <div id="cardAviso">
            <div id="cardAvisoCabecera">
                <span>{notification.date}</span>
            </div>
            <div id="cardAvisoCategoria">
                <span>{notification.category}</span>
            </div>
            <div id="cardAvisoCuerpo">{/* Desplegable al clickear */}
                <p>{notification.message}</p>
            </div>
        </div>
    )
}