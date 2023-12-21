import React , {useRef, useEffect} from "react";
import ChatMessage from "@/app/chat/components/chatMessage";

import {Message} from "ai"

interface ChatProps {
    messages: Message[];
    clearChat : () => void;
}
function ChatBody({ messages, clearChat }: ChatProps) {

    const chatboxRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        chatboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    return (

            <div className={`${messages.length == 0 ? "justify-around" : "" } overflow-scroll h-full  rounded-2xl p-2 mb-5 text-center flex flex-col`}>

                {messages.length ==0 && (<div className="text-[--text] opacity-70 font-medium text-2xl mt-32 transition duration-300 ease-in">Ancora nessun Messaggio</div>)}

                <div className="flex flex-col ">
                    {messages.map((value, index) => (
                    <React.Fragment key={index}>
                        {value.role === 'user' ? (<ChatMessage isGenerated={false} text={value.content}/>) : (<ChatMessage isGenerated={true} text={value.content}/>)}
                    </React.Fragment>
                ))}</div>

                <div ref={chatboxRef}></div>
            </div>

    );
}

export default ChatBody;
