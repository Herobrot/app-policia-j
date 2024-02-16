import "./Contenido.css"

export default function Contenido({perfil}) {
    return(
        <div id="contenedorPerfil">
            <ul>
                <li>
                    <label>
                        <b>Nombre</b>
                        <input type="text" name="" value={perfil.name} />
                    </label>
                </li>
                <li>
                    <label>
                        <b>Apellidos</b>
                        <input type="text" name="" value={perfil.lastName} />
                    </label>
                </li>
                <li>
                    <label>
                        <b>Número de placa</b>
                        <input type="text" name="" value={perfil.badgeNumber} readOnly={true} />
                    </label>
                </li>
                <li>
                    <label>
                        <b>Contraseña</b>
                        <input type="text" name="" value={perfil.password} />
                    </label>
                </li>
                <li>
                    <label>
                        <b>Rol</b>
                        <input type="text" name="" value={perfil.role} readOnly={true} />
                    </label>
                </li>
            </ul>
        </div>
    )
}