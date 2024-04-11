import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
//import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Footer({linksStatus}) {
    if(!linksStatus) {
        linksStatus = {
            chats: false,
            avisos: false,
            perfil: false
        }
    }

    return(
        <footer>
            <div id="contenedorLinks">
                <div id="chats">
                    <Link href={"/chats"} className={linksStatus.chats ? "active" : "inactive"}>
                        <FontAwesomeIcon icon={faCommentDots} />
                        <span>Chats</span>
                    </Link>
                </div>
                <div id="avisos">
                    <Link href={"/avisos"} className={linksStatus.avisos ? "active" : "inactive"}>
                        <FontAwesomeIcon icon={faBell} />
                        <span>Avisos</span>
                    </Link>
                </div>
                <div id="perfil">
                    <Link href={"/perfil"} className={linksStatus.perfil ? "active" : "inactive"}>
                        <FontAwesomeIcon icon={faUser} />
                        <span>Perfil</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}