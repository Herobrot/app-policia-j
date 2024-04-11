"use client"

import "./chats.css"
import Footer from "../components/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useState } from "react"
import CardChat from "../chats/components/CardChat"

export default function Menu() {
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([
        {
            _id: 0,
            name: "Sin usuarios",
            lastName: "",
            badgeNumber: "",
            role: "",
            password: ""
        }
    ]);
    const [page, setPage] = useState(1);

    const pagination = (btnValue) => {
        const users = fetch(process.env.NEXT_PUBLIC_API_URL + 'users' + '?page=' + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(page > 1 && btnValue === "prev") {
            setPage(page - 1);
        }

        else if((users !== 0 || users !== undefined || users !== null) && btnValue === "next") {
            setPage(page + 1);
        }

        setUsers(users);
        
    }

    useEffect(() => {
        const fetchData = async () => {
            if(localStorage.getItem("token") == null) {
                window.location.href = "/"
            }
    
            else{
                if(localStorage.getItem("_idUser") == null) {
                    window.location.href = "/"            
                }
                const userId = JSON.parse(localStorage.getItem("_idUser"));
    
                const user = await fetch (process.env.NEXT_PUBLIC_API_URL + 'users/' + userId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': JSON.parse(localStorage.getItem("token"))
                    }
                })

                console.log(user);
    
                fetch(process.env.NEXT_PUBLIC_API_URL + 'users' + user.role + '?page=1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(async (response) => {
                    if(response.ok) {
                        let data = await response.json();
                        console.log(data);
                        if(chats.length == 0) {
                            setChats(data);
                            setUsers(data);
                        }
                    }
                })
            }
        }
        fetchData();
    }, []);
    console.log(users);
    return (        
      <main>
          <div id="buscador">
              <label>                        
                  <input type="text" name="" placeholder="Buscar" id="inputBuscador" />
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
              </label>
          </div>
          <div id="contenedorChats">
              {users ? users.map((user) => 
                <CardChat key={user._id} user={user} />) : <p>No hay chats</p>}
              <div id="paginacion">
                  <button id="btnAnterior" onClick={() => pagination("prev")}>Anterior</button>
                  <button id="btnSiguiente" onClick={() => pagination("next")}>Siguiente</button>
              </div>
          </div>
          <Footer linksStatus={{chats: true}} />
      </main>
    )
}