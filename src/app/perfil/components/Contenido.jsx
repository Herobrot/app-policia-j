import "./Contenido.css"

export default function Contenido({perfil}, {setName}, {setLastName}, {setPassword}) {
    return(
        <div id="contenedorPerfil">
            <ul>
                <li>
                    <label>
                        <b>Nombre</b>
                        <input type="text" name="" value={perfil.name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </li>
                <li>
                    <label>
                        <b>Apellidos</b>
                        <input type="text" name="" value={perfil.lastName} onChange={(e) => setLastName(e.target.value)} />
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
                        <input type="text" name="" value={perfil.password} onChange={(e) => setPassword(e.target.value)} />
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