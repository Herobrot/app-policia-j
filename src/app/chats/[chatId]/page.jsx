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
        fetch(process.env.NEXT_PUBLIC_API_URL + 'users/messages/user/' + authData._idUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            try{
                const data = await res.json();
                console.log(data);
                const mensajes = data.map((mess) => ({ message: mess.message, 
                    type: 'sent', date : mess.date }));
                setMessages(mensajes);
            } catch (error) {
                console.log(error);
            }
        })
        const otherUser = JSON.parse(sessionStorage.getItem('otherUser'));

        fetch(process.env.NEXT_PUBLIC_API_URL + 'users/messages/user/' + otherUser._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            try{
                const data = await res.json();
                console.log(data);
                const mensajes = data.map((mess) => ({ message: mess.message, 
                    type: 'received', date : mess.date }));
                setOtherMessages(mensajes);
            } catch (error) {
                console.log(error);
            }        
        });

        setAllMessages([...messages, ...otherMessages].sort((a, b) => new Date(a.date) - new Date(b.date)));

        const newSocket = new WebSocket(process.env.NEXT_PUBLIC_API_WS);
    
        newSocket.onopen = () => {
            console.log("Conexión WebSocket abierta");
            const connectionMessage = { type: 'connection', _idUser: authData._idUser };
            newSocket.send(JSON.stringify(connectionMessage));
        };

        newSocket.onmessage = (event) => {
            try {
                
                const data = JSON.parse(Buffer.from(JSON.parse(event.data)).toString('utf-8'));
                console.log(data);
        
                setAllMessages(prev => [...prev, { message: data.message, type: (data._idUser === authData._idUser ? 'sent' : 'received') }]);
            } catch (error) {
               
                console.log('Mensaje como texto plano:', event.data);
                setAllMessages(prev => [...prev, { message: event.data, type: 'received' }]);
            }
        };
        
        
        newSocket.onerror = (event) => console.error("Error en WebSocket", event);
        newSocket.onclose = (event) => {
            console.log("Conexión WebSocket cerrada", event)
        };
    
        setSocket(newSocket);
        setSocketBool(true);

        const scroll = document.getElementById('scroll');

        setTimeout(function() {
            scroll.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 800);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        const messagesToSort = [...messages, ...otherMessages];     
                   
        setAllMessages(messagesToSort.sort((a, b) => b.date - a.date));
    }, [messages])

    useEffect(() => {
        const messagesToSort = [...messages, ...otherMessages];
        setAllMessages(messagesToSort.sort((a, b) => b.date - a.date));
    }, [otherMessages])

    const sendMessage = async () => {
        if (socket && inputMessage) {
            const messageToSend = {
                message: inputMessage,
                date: new Date,
                _idUser: authData._idUser
            };
    
            socket.send(JSON.stringify(messageToSend));
            setAllMessages(prev => [...prev, { message: inputMessage, type: 'sent' }]);
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
