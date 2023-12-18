import {Properties} from "csstype";
import React , {useState, useEffect} from "react";
import ChatMessageAsk from "@/app/chat/chat_components/chatMessageAsk";
import ChatMessageAnswer from "@/app/chat/chat_components/chatMessageAnswer";

interface chatMessage{
    id : number,    // 0 == ask / 1 == answer
    text : string
}

interface ChatProps {
    list: chatMessage[];
    clearChat : () => void;
}
function ChatBody({list,clearChat}:ChatProps) {


    return (
        <>

            <div id="chatArea" className="font-sans overflow-y-scroll border-2 rounded-xl border-slate-900 p-2" style={{minWidth: '55em',minHeight: '32em',maxWidth: '55em',maxHeight: '32em'}}>
                <div className="mt-16">{list.map((value, index) => (
                    <React.Fragment key={index}>
                        {value.id === 0 && (<ChatMessageAsk text={value.text}/>)}
                        {value.id === 1 && (<ChatMessageAnswer text={value.text}/>)}
                    </React.Fragment>
                ))}</div>
                <button className="absolute top-4 right-8" onClick={clearChat}>Clear chat</button>
            </div>

        </>
    );
}

export default ChatBody;
