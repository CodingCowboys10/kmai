import React , {useRef, useEffect} from "react";
import ChatMessage from "@/app/chat/components/chatMessage";

import {Message} from "ai"

interface ChatProps {
    messages: Message[];
    model: string;
}
function ChatBody({ messages, model}: ChatProps) {

    const chatboxRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        chatboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    return (

            <div className={`${messages.length == 0 ? "justify-around" : "" } overflow-scroll h-full  rounded-2xl p-2 mb-5 text-center flex flex-col`}>

                {messages.length ==0 && (<div className="text-[--text] opacity-70 font-medium text-2xl mt-32 transition duration-300 ease-in">Ancora nessun Messaggio</div>)}

                <div className="flex flex-col gap-5 ">
                    {messages.map((value, index) => (
                    <React.Fragment key={index}>
                        <ChatMessage isGenerated={value.role === 'user' ? false : true} text={value.content} model={model}/>
                    </React.Fragment>
                ))}</div>

                <div ref={chatboxRef}></div>
            </div>

    );
}

export default ChatBody;
