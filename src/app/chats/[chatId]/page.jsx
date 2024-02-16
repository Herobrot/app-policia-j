import "./chatId.css"
import Header from "./components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export default function ChatId() {
    return(
        <>
            <Header />
            <main>
                <div id="contenedorChatId">
                    
                </div>
                <div id="contenedorEnviar">
                    <div className="contenedorInput">
                        <input 
                            type="text"                             
                            placeholder="Escribe un número..."
                        />
                        <span>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </span>
                    </div>
                </div>
            </main>
        </>
    )
}