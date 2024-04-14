"use client"

import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link";

export default function Header() {
    const chat = (sessionStorage.getItem("userFullName"))
    return(
        <header>
            <div className="col1">
                <Link href="/chats">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            </div>
            <div className="col2">
                <b>{chat}</b> <br />
                <span>Policía</span>
            </div>
        </header>
    )
}