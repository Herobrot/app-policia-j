import "./Aviso.css"

export default function Aviso({aviso}) {
    return(
        <div id="cardAviso">
            <div id="cardAvisoCabecera">
                <b>{aviso.title}</b>
                <span>{aviso.date}</span>
            </div>
            <div id="cardAvisoCategoria">
                <span>{aviso.category}</span>
            </div>
            <div id="cardAvisoCuerpo">{/* Desplegable al clickear */}
                <p>{aviso.body}</p>
            </div>
        </div>
    )
}