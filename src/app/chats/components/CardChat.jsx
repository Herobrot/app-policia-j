import "./CardChat.css"

export default function CardChat({chat}) {
    return(
        <div className="contenedorCard">
            <div className="col1">
                <b>{chat.nombreCompleto}</b>
                <p>{chat.ultimoTexto}</p>
            </div>
            <div className="col2">
                <span>{chat.ultimaFecha}</span>
                <div className="notificacion">
                    {chat.cantidadNuevosMensajes}
                </div>
            </div>
        </div>
    );
}