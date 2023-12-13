"use client"
import {useState,useEffect} from "react";
import Chat from "./chat"
import {element} from "prop-types";

interface chatMessage{
    id : number,
    text : string
}
function Chatbot (){

    const ask:chatMessage = {id:0,text:"prova ask"};
    const answer:chatMessage = {id:1,text:"prova answer"};

    const [listElementChat,setListElementChat] = useState<chatMessage[]>([ask,answer])

    const addPointList = (id : number, text : string)=>{
        let element : chatMessage  = {
            id: id,
            text : text
        };
        setListElementChat([...listElementChat,element]);
    }



    return(
        <div className="flex flex-row h-max ">

            <div className="flex flex-col w-max">

                <div className="relative">
                    <Chat list={listElementChat}></Chat>
                </div>


            </div>

        </div>
    );
}

export default Chatbot;
