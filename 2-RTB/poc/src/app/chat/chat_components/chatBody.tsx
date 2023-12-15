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
    const chatStyle :Properties = {
        fontFamily: 'Roboto, sans-serif',
        minWidth: '60em',
        minHeight: '38em',
        maxWidth: '60em',
        maxHeight: '38em',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        borderRadius: "10px",
        border : "solid",
        padding : "10px"
    };


    return (
        <>

            <div id="chatArea" style={chatStyle}>
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
