import "./Menu.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function Menu() {
    return (
        <header>
            <nav id="top">
                <FontAwesomeIcon icon={faBars} />
                <input type="text" placeholder="Buscar..." />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <div id="navbar">
                    <ul>
                        <li>Chats</li>
                        <li>Mensajes</li>
                        <li>Notificaciones</li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}