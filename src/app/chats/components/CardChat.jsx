"use client"

import "./CardChat.css"

export default function CardChat({key, user}) {
    return(
        <div className="contenedorCard" key={key} onClick={() => {
            sessionStorage.setItem("otherUser", JSON.stringify(user));
            window.location.href = "/chats/"+user._id
        }}>
            <div className="col1">
                <b>{user.name+" "+user.lastName}</b>
            </div>
        </div>
    );
}