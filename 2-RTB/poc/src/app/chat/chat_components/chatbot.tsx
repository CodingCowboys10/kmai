"use client"
import { useChat } from 'ai/react';
import {FormEvent, useState} from "react";
import ChatBody from "./chatBody";
import TextInputComponent from "@/app/chat/chat_components/textInputComponent";

function Chatbot (){

    const [model_name,setModel_name] = useState("openAi")
    const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        headers: {
            "Content-type": "text/html"
        },
        body: {
            model_name: model_name
        }
    });

    const clearChat = () => {
        setMessages([]);
    }

    async function sendMessage(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (!messages.length) {
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        if (isLoading) {
            return;
        }
        handleSubmit(e);
    }

    return(
        <div className="flex flex-row h-max ">

            <div className="flex flex-col w-max">

                <div className="relative">
                    <ChatBody messages={messages} clearChat={clearChat}/>
                </div>

                <TextInputComponent input={input} handleInputChange={handleInputChange} sendMessage={sendMessage}/>

            </div>

        </div>
    );
}

export default Chatbot;
