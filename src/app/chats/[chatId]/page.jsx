"use client"
import React, { useState, useEffect, Suspense } from 'react';
import "./chatId.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Mensajes from './components/Mensajes';
import { getAuthData } from '../../../../Token';

export default function Chat() {
    const authData = getAuthData();
    const [socket, setSocket] = useState(null);
    const [socketBool, setSocketBool] = useState(false);
    const [messages, setMessages] = useState([]);
    const [otherMessages, setOtherMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `messages/user/${authData._idUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                const mensajes = data.map((mess) => ({ text: mess.message, 
                    type: 'sent' }));
                setMessages(mensajes);
                console.log(mensajes);
            }
            else{
                console.log("Error");
            }
        });

        fetch(process.env.NEXT_PUBLIC_API_URL + `messages/user/${authData._idChat}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                const mensajes = data.map((mess) => ({ text: mess.message, 
                    type: 'received' }));
                setOtherMessages(mensajes);
                console.log(mensajes);
            }
            else{
                console.log("Error");
            }
        })

        if(messages && otherMessages){
            const sortToDate = [...messages, ...otherMessages];            
            setAllMessages(sortToDate.sort((a, b) => new Date(a.date) - new Date(b.date)));
        }
        const newSocket = new WebSocket(process.env.NEXT_PUBLIC_API_WS);
    
        newSocket.onopen = () => {
            console.log("Conexión WebSocket abierta")
            const connectionMessage = { type: 'connection', clientId: authData._idUser };
            newSocket.send(JSON.stringify(connectionMessage));};
            newSocket.onmessage = (event) => {
                try {
                  
                    const data = JSON.parse(event.data);
                    console.log('Mensaje parseado como JSON:', data);
            
                    setMessages(prev => [...prev, { text: data.text, type: 'received' }]);
                } catch (error) {
                   
                    console.log('Mensaje como texto plano:', event.data);
                    setMessages(prev => [...prev, { text: event.data, type: 'received' }]);
                }
            };
            
        
        newSocket.onerror = (event) => console.error("Error en WebSocket", event);
        newSocket.onclose = (event) => {
            console.log("Conexión WebSocket cerrada", event)
        };
    
        setSocket(newSocket);
        setSocketBool(true);

        return () => newSocket.close();
    }, []);

    const sendMessage = async () => {
        if (socket && inputMessage) {
            const messageToSend = {
                type: 'message',
                text: inputMessage,
                _idUser: authData._idUser,
                message: {
                    message: inputMessage,
                    date: new Date,
                    _idUser: authData._idUser
                }
            };
    
            socket.send(JSON.stringify(messageToSend));
            setMessages(prev => [...prev, { text: inputMessage, type: 'sent' }]);
            setInputMessage('');
        }
        const scroll = document.getElementById('scroll');

        setTimeout(function() {
            scroll.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 200);
    };

    return (
        <main>
            <div className="cabeceraChat">
                <a href="/chats">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </a>
                <h2>Chat.</h2>
            </div>
            <div className="contenedorChat">
                <Suspense fallback={<div id='cargando'><FontAwesomeIcon icon={faSpinner} /></div>}>
                    <Mensajes data={allMessages} />
                </Suspense>
            <span id="scroll" />
            </div>
            <div className="pieChat">
                <div className="contenedorInput">
                    <input 
                        type="text" 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Escribe un número..."
                        disabled={!socketBool}
                    />
                    <span>
                        <FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage} />
                    </span>
                </div>
            </div>
        </main>
    );
}
