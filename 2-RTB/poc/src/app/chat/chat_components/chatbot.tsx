"use client"
import { useChat } from 'ai/react';
import { useState } from "react";
import ChatBody from "./chatBody";
import TextInputComponent from "@/app/chat/chat_components/textInputComponent";

// interface chatMessage{
//     id : number,    // 0 == ask / 1 == answer
//     text : any
// }
function Chatbot (){

    //const [listElementChat,setListElementChat] = useState<chatMessage[]>([])
    //const [Stop, setStop] = useState(false);
    const [model_name,setModel_name] = useState("openAi")
    const { messages, setMessages, input, handleInputChange, handleSubmit } = useChat({
        headers: {
            "Content-type": "text/html"
        },
        body: {
            model_name: model_name
        }
    });

    const clearChat1 = () => {
        setMessages([]);
    }

    // function createQuestion(text : string){
    //     let element : chatMessage  = {
    //         id: 0,
    //         text : text
    //     };
    //     return element;
    // }
    //
    // function createAnswer(text : any){
    //     let element : chatMessage  = {
    //         id: 1,
    //         text : text
    //     };
    //     return element;
    // }
    //
    // const clearChat = () => {
    //     setListElementChat([]);
    // }
    // const Request = (text: string) => {
    //     if(!Stop) {
    //         setStop(true);
    //
    //         const question = createQuestion(text);
    //         setListElementChat([...listElementChat,question]);
    //
    //
    //
    //         const answer = createAnswer(<div>risposta : {text}</div>)
    //         setListElementChat([...listElementChat,question,answer]);
    //         setStop(false);
    //     }
    // }

    return(
        <div className="flex flex-row h-max ">

            <div className="flex flex-col w-max">

                {/*<div className="relative">*/}
                {/*    <ChatBody list={listElementChat} clearChat={clearChat}/>*/}
                {/*</div>*/}

                {/*<TextInputComponent Request={Request}/>*/}

                <div className="relative">
                    <ChatBody messages={messages} clearChat={clearChat1}/>
                </div>

                <TextInputComponent input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>

            </div>

        </div>
    );
}

export default Chatbot;
