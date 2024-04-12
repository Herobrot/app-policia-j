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
    const [userLogin, setUserLogin] = useState({});

    const pagination = async (btnValue) => {
        let newPage = page;
        if(page > 1 && btnValue === "prev") {
            newPage -= 1;
        }
        
        else if((users !== 0 || users !== undefined || users !== null) && btnValue === "next") {
            newPage += 1;
        }
        setPage(newPage);

        await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/roles/' + userLogin.role + '?page=' + newPage
                + '&_id=' + userLogin._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async(response) => {
            const usersTemp = await response.json();
            console.log(usersTemp);
            setUsers(usersTemp);
        });
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

                const user = await fetch (process.env.NEXT_PUBLIC_API_URL + 'users/' + localStorage.getItem("_idUser"), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem("token")
                    }}).then((response) => response.json());
                setUserLogin(user);

                fetch(process.env.NEXT_PUBLIC_API_URL + 'users/roles/' + user.role + '?page=1&_id=' + user._id, {
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
                <CardChat user={user} />) : <p>No hay chats</p>}
              <div id="paginacion">
                  <button id="btnAnterior" onClick={() => pagination("prev")}>Anterior</button>
                  <button id="btnSiguiente" onClick={() => pagination("next")}>Siguiente</button>
              </div>
          </div>
          <Footer linksStatus={{chats: true}} />
      </main>
    )
}