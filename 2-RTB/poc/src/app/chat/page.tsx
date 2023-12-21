"use client"
import Link from "next/link";
import { useChat } from 'ai/react';
import React, {useState, FormEvent} from "react";
import ChatBody from "@/app/chat/components/chatBody";
import ChatInput from "@/app/chat/components/chatInput";


export default function Page() {

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
  return (
      <main className="w-full">

          <div className="flex flex-row w-full h-full justify-around">

              <div className="w-3/12">
                  <Link className="" href="/documents">
                      <button className="w-fit h-fit bg-[--primary] m-0  font-medium rounded-xl p-3
          hover:scale-105 hover:shadow-2xl animation duration-300 ease-out  text-[--text-button]">
                          Archivio
                      </button>
                  </Link>
              </div>

              <div className="flex flex-col w-6/12">
                  <ChatBody messages={messages} clearChat={clearChat}></ChatBody>
                  <ChatInput input={input} handleInputChange={handleInputChange} sendMessage={sendMessage}/>
              </div>
              <div className=" w-3/12 h-full">
                  {messages.length!=0 && (<button className="text-xl p-2 " onClick={clearChat}>
                      <i className="py-2 rounded-2xl w-10/12 text-center bg-[--background-contrast] fa-solid fa-broom"></i>
                  </button>)}
              </div>
          </div>
      </main>
  )
}