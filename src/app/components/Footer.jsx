import "./footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentDots, faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
//import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return(
        <footer>
            <div id="chats">
                <Link href={"/chats"}>
                    <FontAwesomeIcon icon={faCommentDots} />
                    <span>Chats</span>
                </Link>
            </div>
            <div id="avisos">
                <Link href={"/avisos"}>
                    <FontAwesomeIcon icon={faBell} />
                    <span>Avisos</span>
                </Link>
            </div>
            <div id="perfil">
                <Link href={"/perfil"}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Perfil</span>
                </Link>
            </div>
        </footer>
    );
}