import React , {useRef, useEffect} from "react";
import ChatMessageAsk from "@/app/chat/chat_components/chatMessageAsk";
import ChatMessageAnswer from "@/app/chat/chat_components/chatMessageAnswer";
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

        <div id="chatArea" className="font-sans overflow-y-scroll border-2 rounded-xl border-slate-900 p-2 mb-5" style={{minWidth: '55em',minHeight: '32em',maxWidth: '55em',maxHeight: '32em'}}>
            <div className="mt-16">{messages.map((value, index) => (
                <React.Fragment key={index}>
                    {value.role === 'user' ? (<ChatMessageAsk text={value.content}/>) : (<ChatMessageAnswer text={value.content}/>)}
                </React.Fragment>
            ))}</div>
            <button className="absolute top-4 right-8" onClick={clearChat}>Clear chat</button>
            <div ref={chatboxRef}></div>
        </div>
    );
}

export default ChatBody;
