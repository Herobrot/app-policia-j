import "./Menu.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function Menu() {
    return (
        <header>
            <nav id="buscador">
                <label>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" name="" placeholder="Buscar" id="" />
                </label>
            </nav>
        </header>
    )
}