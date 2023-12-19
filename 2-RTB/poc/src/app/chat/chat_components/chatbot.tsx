"use client"
import {useState,useEffect} from "react";
import ChatBody from "./chatBody";
import TextInputComponent from "@/app/chat/chat_components/textInputComponent";

interface chatMessage{
    id : number,    // 0 == ask / 1 == answer
    text : any
}
function Chatbot (){

    const [listElementChat,setListElementChat] = useState<chatMessage[]>([])
    const [Stop, setStop] = useState(false);

    function createQuestion(text : string){
        let element : chatMessage  = {
            id: 0,
            text : text
        };
        return element;
    }

    function createAnswer(text : any){
        let element : chatMessage  = {
            id: 1,
            text : text
        };
        return element;
    }

    const clearChat = () => {
        setListElementChat([]);
    }

    const Request = (text: string) => {
        if(!Stop) {
            setStop(true);

            const question = createQuestion(text);
            setListElementChat([...listElementChat,question]);



            const answer = createAnswer(<div>risposta : {text}</div>)
            setListElementChat([...listElementChat,question,answer]);
            setStop(false);
        }
    }



    return(

            <div className="flex flex-col content-end align-bottom  mx-auto my-auto">

                <div className="relative">
                    <ChatBody list={listElementChat} clearChat={clearChat}></ChatBody>
                </div>

                <TextInputComponent Request={Request}/>

            </div>
    );
}

export default Chatbot;
