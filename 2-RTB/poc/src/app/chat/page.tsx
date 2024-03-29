"use client"
import Link from "next/link";
import { useChat } from 'ai/react';
import React, {useState, FormEvent, useEffect} from "react";
import ChatBody from "@/app/chat/components/chatBody";
import ChatInput from "@/app/chat/components/chatInput";
import LlmBody from "@/app/chat/components/llmBody";
import {Message} from "ai";


export default function Page() {
    const [initialMessages, setInitialMessages] = useState<Message[]>([]);
    const [modelName,setModelName] = useState("openAi")
    const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: initialMessages,
        headers: {
            "Content-type": "text/html"
        },
        body: {
            modelName: modelName
        }
    });

    useEffect(() => {
        async function fetchChatHistory(){
            const response = await fetch('/api/chatHistory', {method: 'GET'});
            const result = await response.json();
            console.log(result.messages);
            return result.messages;
        }

        fetchChatHistory().then((chatHistory) => setInitialMessages(chatHistory));
    }, []);


    const updateModel = (newModelName: string) => {
        setModelName(newModelName);
    }
    const clearChat = async () => {
        setInitialMessages([]);
        setMessages([]);
        try {
            const res = await fetch('/api/chatHistory', {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json"
                },
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (e) {
            console.error(e);
        }
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

    useEffect(() => {
        const inviaMessaggio = async (newMessage:Message) => {
            try {
                const res = await fetch('/api/chatHistory', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        newMessage: newMessage,
                        model: modelName
                    }),
                });
                if (!res.ok) throw new Error(await res.text());
            } catch (e) {
                console.error(e);
            }
        };

        console.log(isLoading);
        if (messages.length && !isLoading){
            let newMessages = messages.slice(-2);
            newMessages.forEach((newMessage) => {
                inviaMessaggio(newMessage).catch((e) => console.error(e.message));
            });
        }
    }, [messages, isLoading]);

    return (
        <main className="flex flex-row w-full h-full justify-around ">

            <div className="flex flex-col justify-end h-full lg:w-3/12 p-2">
                <Link className="" href="../documents">
                    <button className=" w-fit h-fit bg-[--primary]  font-medium rounded-xl p-3
          hover:scale-105 hover:shadow-2xl animation duration-300 ease-out  text-[--text-button]">
                        Archivio
                    </button>
                </Link>
            </div>

            <div className="flex flex-col w-10/12 lg:w-6/12 ">
                <ChatBody messages={messages} model={modelName}></ChatBody>
                <ChatInput input={input} handleInputChange={handleInputChange} sendMessage={sendMessage}/>
            </div>
            <div className="flex flex-row w-3/12 h-full justify-center">
                <LlmBody classProp="flex flex-col shadow-2xl w-1/2 bg-[--background-contrast] p-4 rounded-2xl
                h-fit my-auto justify-evenly gap-4"
                updateModel={updateModel}
                >
                    <button
                        className={`animation duration-300 hover:scale-110 text-xl p-2 ${messages.length != 0 ? "opacity-100" : "opacity-20"}`}
                        onClick={clearChat}
                        disabled={messages.length == 0}>
                        <i className="py-3 rounded-2xl w-10/12 text-center bg-[#6f303c] fa-solid fa-broom"></i>
                    </button>
                </LlmBody>
            </div>
        </main>
    )
}