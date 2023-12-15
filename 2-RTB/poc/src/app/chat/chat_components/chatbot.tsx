"use client"
import {useState,useEffect} from "react";
import ChatBody from "./chatBody";

interface chatMessage{
    id : number,    // 0 == ask / 1 == answer
    text : string
}
function Chatbot (){

    const ask:chatMessage = {id:0,text:"prova ask"};        //DA ELIMINARE (SOLO PER PROVA)
    const answer:chatMessage = {id:1,text:"prova answer"};  //DA ELIMINARE (SOLO PER PROVA)

    const [listElementChat,setListElementChat] = useState<chatMessage[]>([ask,answer,ask,answer,ask,answer,ask,answer,ask,answer,ask,answer])

    const addPointList = (id : number, text : string)=>{
        let element : chatMessage  = {
            id: id,
            text : text
        };
        setListElementChat([...listElementChat,element]);
    }

    const clearChat = () => {
        setListElementChat([]);
    }



    return(
        <div className="flex flex-row h-max ">

            <div className="flex flex-col w-max">

                <div className="relative">
                    <ChatBody list={listElementChat} clearChat={clearChat}></ChatBody>
                </div>


            </div>

        </div>
    );
}

export default Chatbot;
